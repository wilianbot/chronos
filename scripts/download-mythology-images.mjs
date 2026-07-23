import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceFile = path.join(root, "src", "data", "mythology", "deitySources.ts");
const manifestFile = path.join(root, "public", "assets", "images", "mitologia", "image-credits.json");

const wikipediaTitles = {
  zeus: "Zeus",
  hera: "Hera",
  poseidon: "Poseidon",
  hades: "Hades",
  atena: "Athena",
  ares: "Ares",
  "apolo-grego": "Apollo",
  artemis: "Artemis",
  afrodite: "Aphrodite",
  hermes: "Hermes",
  hefesto: "Hephaestus",
  dionisio: "Dionysus",
  demeter: "Demeter",
  persefone: "Persephone",
  hestia: "Hestia",
  cronos: "Cronus",
  reia: "Rhea (mythology)",
  gaia: "Gaia",
  urano: "Uranus (mythology)",
  prometeu: "Prometheus",
  hecate: "Hecate",
  nemesis: "Nemesis",
  nike: "Nike (mythology)",
  eros: "Eros",
  hipnos: "Hypnos",
  tanatos: "Thanatos",
  asclepio: "Asclepius",
  pan: "Pan (god)",
  jupiter: "Jupiter (mythology)",
  juno: "Juno (mythology)",
  netuno: "Neptune (mythology)",
  plutao: "Pluto (mythology)",
  minerva: "Minerva",
  marte: "Mars (mythology)",
  "apolo-romano": "Apollo",
  diana: "Diana (mythology)",
  venus: "Venus (mythology)",
  mercurio: "Mercury (mythology)",
  vulcano: "Vulcan (mythology)",
  baco: "Dionysus",
  ceres: "Ceres (mythology)",
  proserpina: "Proserpina",
  vesta: "Vesta (mythology)",
  saturno: "Saturn (mythology)",
  ops: "Ops",
  cupido: "Cupid",
  vitoria: "Victoria (mythology)",
  fortuna: "Fortuna",
  jano: "Janus",
  quirino: "Quirinus",
  bellona: "Bellona (goddess)",
  fauno: "Faunus",
  lares: "Lares",
  penates: "Di Penates"
};

function parseCredits(source) {
  const pattern = /\[\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\s*\]/g;
  return [...source.matchAll(pattern)].map((match) => {
    const [, deityId, mythology, fileName, alt] = match;
    const remoteUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
    return {
      deityId,
      mythology,
      fileName,
      remoteUrl,
      searchTerm: `${alt} ${fileName.replace(/\.[a-z0-9]+$/i, "")}`,
      file: `/assets/images/mitologia/${mythology}/${deityId}.jpg`,
      alt,
      author: "Autor antigo ou artista histórico, conforme acervo",
      institution: "Wikimedia Commons / acervo indicado na página original",
      license: "Domínio público ou licença livre indicada na página original",
      sourceUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName).replace(/%20/g, "_")}`
    };
  });
}

const wait = (ms) => new Promise((resolve) => globalThis.setTimeout(resolve, ms));

async function hasValidImage(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size > 512;
  } catch {
    return false;
  }
}

async function findCommonsImage(credit) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "5");
  url.searchParams.set("gsrsearch", credit.searchTerm);
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime");

  const response = await fetch(url, {
    headers: {
      "user-agent": "Jornada pela Historia educational image validator/1.0"
    }
  });
  if (!response.ok) return "";
  const data = await response.json();
  const pages = Object.values(data.query?.pages || {});
  const image = pages
    .map((page) => page.imageinfo?.[0])
    .find((info) => info?.url && typeof info.mime === "string" && info.mime.startsWith("image/"));
  return image?.url || "";
}

async function findWikipediaLeadImage(credit) {
  const title = wikipediaTitles[credit.deityId];
  if (!title) return "";
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const response = await fetch(url, {
    headers: {
      "user-agent": "Jornada pela Historia educational image validator/1.0"
    }
  });
  if (!response.ok) return "";
  const data = await response.json();
  return data.originalimage?.source || data.thumbnail?.source || "";
}

async function requestImage(url) {
  const controller = new globalThis.AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "Jornada pela Historia educational image validator/1.0"
      }
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok) return { error: `HTTP ${response.status}` };
    if (!contentType.toLowerCase().startsWith("image/")) {
      return { error: `Content-Type inválido: ${contentType || "ausente"}` };
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length <= 512) return { error: `arquivo vazio ou pequeno demais (${buffer.length} bytes)` };
    return { contentType, buffer };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

async function downloadImage(credit) {
  const output = path.join(root, "public", credit.file);
  await fs.mkdir(path.dirname(output), { recursive: true });

  if (await hasValidImage(output)) {
    return { status: "skipped", credit, reason: "arquivo local válido já existe" };
  }

  let result = await requestImage(credit.remoteUrl);
  let sourceUrl = credit.remoteUrl;

  if (result.error) {
    await wait(700);
    const fallbackUrl = await findCommonsImage(credit);
    if (fallbackUrl) {
      sourceUrl = fallbackUrl;
      await wait(700);
      result = await requestImage(fallbackUrl);
    }
  }

  if (result.error) {
    await wait(700);
    const wikipediaImage = await findWikipediaLeadImage(credit);
    if (wikipediaImage) {
      sourceUrl = wikipediaImage;
      await wait(700);
      result = await requestImage(wikipediaImage);
    }
  }

  if (result.error) {
    return { status: "failed", credit, reason: result.error };
  }

  await fs.writeFile(output, result.buffer);
  return {
    status: "ok",
    credit: { ...credit, resolvedUrl: sourceUrl },
    reason: `${result.contentType}; ${result.buffer.length} bytes`
  };
}

const source = await fs.readFile(sourceFile, "utf8");
const credits = parseCredits(source);
const results = [];

for (const credit of credits) {
  await wait(850);
  results.push(await downloadImage(credit));
}

const validCredits = results
  .filter((result) => result.status === "ok" || result.status === "skipped")
  .map((result) => ({
    deityId: result.credit.deityId,
    file: result.credit.file,
    author: result.credit.author,
    institution: result.credit.institution,
    license: result.credit.license,
    sourceUrl: result.credit.sourceUrl,
    downloadedFrom: result.credit.resolvedUrl || result.credit.remoteUrl
  }));

await fs.mkdir(path.dirname(manifestFile), { recursive: true });
await fs.writeFile(manifestFile, `${JSON.stringify(validCredits, null, 2)}\n`);

const summary = {
  total: results.length,
  ok: results.filter((result) => result.status === "ok").length,
  skipped: results.filter((result) => result.status === "skipped").length,
  failed: results.filter((result) => result.status === "failed").length,
  failures: results
    .filter((result) => result.status === "failed")
    .map((result) => ({ deityId: result.credit.deityId, url: result.credit.remoteUrl, reason: result.reason }))
};

console.log(JSON.stringify(summary, null, 2));
