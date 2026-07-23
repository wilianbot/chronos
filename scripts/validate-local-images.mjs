import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadGenerated() {
  let source = fs.readFileSync(path.join(root, "src", "data", "generated.ts"), "utf8");
  source = source
    .replace(/^import type[\s\S]*?;\r?\n\r?\n/, "")
    .replaceAll("export const ", "const ")
    .replace(/ satisfies [^;]+;/g, ";");

  const context = {};
  vm.createContext(context);
  vm.runInContext(`${source}\nthis.__DATA__ = { acontecimentos, personagens };`, context);
  return context.__DATA__;
}

function loadPersonagemImages() {
  const source = fs
    .readFileSync(path.join(root, "src", "data", "personagemImages.ts"), "utf8")
    .replace("export const personagemImages =", "this.__IMAGES__ =")
    .replace(/ satisfies [^;]+;/g, ";");
  const context = {};
  vm.createContext(context);
  vm.runInContext(source, context);
  return context.__IMAGES__ || {};
}

function normalizeLocal(src) {
  if (!src || /^https?:\/\//i.test(src)) return "";
  const normalized = src
    .trim()
    .replace(/^public[\\/]/i, "")
    .replace(/\\/g, "/");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function publicPath(src) {
  const normalized = normalizeLocal(src);
  if (!normalized.startsWith("/assets/")) return "";
  return path.join(root, "public", normalized);
}

const { acontecimentos, personagens } = loadGenerated();
const personagemImages = loadPersonagemImages();
const periodoImages = {
  "Primeiras Civilizações": "assets/images/ziggurat-ur.jpg",
  "Grécia Antiga": "assets/images/acropole-atenas.jpg",
  "Macedônia e Helenismo": "assets/images/alexander-mosaic.jpg",
  "Roma Antiga": "assets/images/coliseu.jpg",
  "Idade Média": "assets/images/hagia-sophia.jpg",
  Renascimento: "assets/images/leonardo.jpg",
  "Reforma e Grandes Navegações": "assets/images/leonardo.jpg",
  "Absolutismo e Iluminismo": "assets/images/leonardo.jpg",
  Revoluções: "assets/images/bastilha.jpg",
  "Era Napoleônica": "assets/images/bastilha.jpg",
  "Revolução Industrial": "assets/images/cottonopolis.jpg",
  Imperialismo: "assets/images/cottonopolis.jpg",
  "Primeira Guerra Mundial": "assets/images/trincheira-somme.jpg",
  "Período Entre Guerras": "assets/images/bolsa-nyse-1929.jpg",
  "Segunda Guerra Mundial": "assets/images/dia-d.jpg"
};

const checked = new Set();
for (const evento of acontecimentos) {
  if (!/^https?:\/\//i.test(evento.imagem)) checked.add(normalizeLocal(evento.imagem));
  checked.add(normalizeLocal(periodoImages[evento.periodo]));
}
for (const personagem of personagens) {
  checked.add(normalizeLocal(personagemImages[personagem.id]));
  checked.add(normalizeLocal(personagem.imagem));
  checked.add(normalizeLocal(periodoImages[personagem.periodo]));
}
checked.add("/assets/images/mapa-placeholder.svg");

const missing = [...checked].filter(Boolean).filter((src) => {
  const file = publicPath(src);
  return file && !fs.existsSync(file);
});

if (missing.length) {
  console.error(`Imagens locais ausentes:\n${missing.join("\n")}`);
  process.exit(1);
}

console.log(`${checked.size} imagens locais de runtime validadas.`);
