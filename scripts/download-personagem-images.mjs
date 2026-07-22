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
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("svg")) return ".svg";
  return ".jpg";
}

fs.mkdirSync(outputDir, { recursive: true });

const manifest = {};
for (const personagem of carregarPersonagens()) {
  const fonte = personagem.fotoRemota?.startsWith("http")
    ? personagem.fotoRemota
    : personagem.foto?.startsWith("http")
      ? personagem.foto
      : "";

  if (!fonte) {
    if (personagem.foto?.startsWith("assets/")) {
      manifest[personagem.id] = `/${personagem.foto}`;
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
      console.warn(`Falhou ${personagem.nome}: ${response.status} ${fonte}`);
      continue;
    }

    const ext = extFromContentType(response.headers.get("content-type") || "");
    const fileName = `${personagem.id}${ext}`;
    const filePath = path.join(outputDir, fileName);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    manifest[personagem.id] = `/assets/images/personagens/${fileName}`;
    console.log(`OK ${personagem.nome} -> ${fileName}`);
  } catch (error) {
    console.warn(`Falhou ${personagem.nome}: ${error.message}`);
  }
}

const generated = `export const personagemImages = ${JSON.stringify(manifest, null, 2)} satisfies Record<string, string>;\n`;
fs.writeFileSync(manifestPath, generated, "utf8");
console.log(`Manifesto gerado: ${Object.keys(manifest).length} imagens.`);
