import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const generatedPath = path.join(root, "src", "data", "generated.ts");
const outputDir = path.join(root, "public", "assets", "images", "personagens");
const manifestPath = path.join(root, "src", "data", "personagemImages.ts");

function carregarPersonagens() {
  let source = fs.readFileSync(generatedPath, "utf8");
  source = source
    .replace(/^import type .*;\r?\n\r?\n/, "")
    .replaceAll("export const ", "const ")
    .replace(/ satisfies [^;]+;/g, ";");

  const context = {};
  vm.createContext(context);
  vm.runInContext(`${source}\nthis.__DATA__ = { personagens };`, context);
  return context.__DATA__.personagens;
}

function extFromContentType(contentType = "") {
  if (!contentType.startsWith("image/")) return "";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("svg")) return ".svg";
  return ".jpg";
}

fs.mkdirSync(outputDir, { recursive: true });

const manifest = {};
const report = {
  ok: [],
  skipped: [],
  failed: []
};
for (const personagem of carregarPersonagens()) {
  const fonte = personagem.fotoRemota?.startsWith("http")
    ? personagem.fotoRemota
    : personagem.foto?.startsWith("http")
      ? personagem.foto
      : "";

  if (!fonte) {
    if (personagem.foto?.startsWith("assets/")) {
      manifest[personagem.id] = `/${personagem.foto}`;
      report.skipped.push(`${personagem.nome}: usando caminho local cadastrado`);
    }
    continue;
  }

  try {
    const response = await fetch(fonte, {
      redirect: "follow",
      headers: {
        "User-Agent": "JornadaHistoria/1.0 educational image fetch"
      }
    });

    if (!response.ok) {
      const message = `Falhou ${personagem.nome}: ${response.status} ${fonte}`;
      report.failed.push(message);
      console.warn(message);
      continue;
    }

    const contentType = response.headers.get("content-type") || "";
    const ext = extFromContentType(contentType);
    if (!ext) {
      const message = `Falhou ${personagem.nome}: tipo inválido ${contentType || "sem content-type"} em ${fonte}`;
      report.failed.push(message);
      console.warn(message);
      continue;
    }

    const fileName = `${personagem.id}${ext}`;
    const filePath = path.join(outputDir, fileName);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length === 0) {
      const message = `Falhou ${personagem.nome}: arquivo vazio em ${fonte}`;
      report.failed.push(message);
      console.warn(message);
      continue;
    }

    fs.writeFileSync(filePath, buffer);
    manifest[personagem.id] = `/assets/images/personagens/${fileName}`;
    report.ok.push(`${personagem.nome} -> ${fileName}`);
    console.log(`OK ${personagem.nome} -> ${fileName}`);
  } catch (error) {
    const message = `Falhou ${personagem.nome}: ${error.message}`;
    report.failed.push(message);
    console.warn(message);
  }
}

const generated = `export const personagemImages = ${JSON.stringify(manifest, null, 2)} satisfies Record<string, string>;\n`;
fs.writeFileSync(manifestPath, generated, "utf8");
console.log(`Manifesto gerado: ${Object.keys(manifest).length} imagens.`);
console.log(
  `Relatório: ${report.ok.length} baixadas, ${report.skipped.length} locais preservadas, ${report.failed.length} falhas.`
);
