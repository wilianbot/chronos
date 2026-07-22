import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const legacyRoot = path.resolve(root, "..", "jornada-historia");

const readLegacy = (file) => fs.readFileSync(path.join(legacyRoot, file), "utf8");
const context = { console };
vm.createContext(context);

function carregarDadosExistentes() {
  const generatedPath = path.join(root, "src", "data", "generated.ts");
  let source = fs.readFileSync(generatedPath, "utf8");
  source = source
    .replace(/^import type .*;\r?\n\r?\n/, "")
    .replaceAll("export const ", "const ")
    .replace(/ satisfies [^;]+;/g, ";");
  vm.runInContext(
    `${source}\nthis.__DATA__ = { acontecimentos, deusesGregos, personagens, comparacoesDivinas, comparadores, mapas, perguntasRevisao, periodosFiltro, civilizacoesFiltro, categoriasFiltro };`,
    context
  );
  return context.__DATA__;
}

function carregarDadosLegado() {
  const imagensPath = path.join(legacyRoot, "js", "personagem-imagens.js");
  const dataPath = path.join(legacyRoot, "js", "data.js");
  if (!fs.existsSync(imagensPath) || !fs.existsSync(dataPath)) return carregarDadosExistentes();

  vm.runInContext(`${readLegacy("js/personagem-imagens.js")}\nthis.imagensPersonagens = imagensPersonagens;`, context);
  vm.runInContext(
    `${readLegacy("js/data.js")}\nthis.__DATA__ = { acontecimentos, deusesGregos, personagens, comparacoesDivinas, comparadores, mapas, perguntasRevisao, periodosFiltro, civilizacoesFiltro, categoriasFiltro };`,
    context
  );
  return context.__DATA__;
}

const data = carregarDadosLegado();
if (!data?.acontecimentos?.length) {
  throw new Error("Não foi possível extrair acontecimentos.");
}

const cp1252 = {
  0x20ac: 0x80,
  0x201a: 0x82,
  0x0192: 0x83,
  0x201e: 0x84,
  0x2026: 0x85,
  0x2020: 0x86,
  0x2021: 0x87,
  0x02c6: 0x88,
  0x2030: 0x89,
  0x0160: 0x8a,
  0x2039: 0x8b,
  0x0152: 0x8c,
  0x017d: 0x8e,
  0x2018: 0x91,
  0x2019: 0x92,
  0x201c: 0x93,
  0x201d: 0x94,
  0x2022: 0x95,
  0x2013: 0x96,
  0x2014: 0x97,
  0x02dc: 0x98,
  0x2122: 0x99,
  0x0161: 0x9a,
  0x203a: 0x9b,
  0x0153: 0x9c,
  0x017e: 0x9e,
  0x0178: 0x9f
};

function corrigirMojibake(texto) {
  if (typeof texto !== "string" || !/[ÃÂâ]/.test(texto)) return texto;
  try {
    const bytes = Uint8Array.from(
      [...texto].map((char) => {
        const code = char.codePointAt(0);
        return cp1252[code] ?? (code <= 0xff ? code : 0x3f);
      })
    );
    const corrigido = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    return corrigido.includes("�") ? texto : corrigido;
  } catch {
    return texto;
  }
}

function corrigirObjeto(valor) {
  if (typeof valor === "string") return corrigirMojibake(valor);
  if (Array.isArray(valor)) return valor.map(corrigirObjeto);
  if (valor && typeof valor === "object") {
    return Object.fromEntries(Object.entries(valor).map(([chave, item]) => [chave, corrigirObjeto(item)]));
  }
  return valor;
}

const slug = (value) =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const imageOverrides = {
  "idade-trevas-grega": "https://commons.wikimedia.org/wiki/Special:FilePath/Dipylon%20vase%20NAMA%20804.jpg",
  "homero-epicos":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Homer_At_the_British_Museum_2024_%283x4_cropped%29.jpg/960px-Homer_At_the_British_Museum_2024_%283x4_cropped%29.jpg",
  "surgimento-polis": "https://commons.wikimedia.org/wiki/Special:FilePath/Agora%20of%20Athens%20view.jpg",
  "colonizacao-grega":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Greek%20colonization%20archaic%20period.svg",
  "jogos-olimpicos": "https://commons.wikimedia.org/wiki/Special:FilePath/Olympia%20Stadium%20track.jpg",
  "origem-deuses-gregos":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Zeus%20Otricoli%20Pio-Clementino%20Inv257.jpg",
  "titanomaquia-gigantomaquia":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Pergamonmuseum%20-%20Antikensammlung%20-%20Pergamonaltar%2006.jpg",
  "prometeu-pandora":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Prometheus%20brings%20fire%20to%20mankind.jpg",
  "herois-gregos":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Farnese%20Hercules%20MAN%20Napoli%20Inv6001%20n01.jpg",
  "mundo-dos-mortos-grego":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Hades%20abducting%20Persephone%20fresco%20Vergina.jpg",
  "pre-socraticos": "https://commons.wikimedia.org/wiki/Special:FilePath/Sanzio%2001.jpg",
  maratona: "https://commons.wikimedia.org/wiki/Special:FilePath/Plain%20of%20Marathon.jpg",
  "salamina-plateia":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Wilhelm%20von%20Kaulbach%20-%20Die%20Seeschlacht%20bei%20Salamis.jpg",
  peloponeso: "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20Peloponnesian%20War%20431%20BC-en.svg",
  socrates: "https://commons.wikimedia.org/wiki/Special:FilePath/Socrates%20Louvre.jpg",
  "platao-academia":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Plato%20Silanion%20Musei%20Capitolini%20MC1377.png",
  "aristoteles-liceu": "https://commons.wikimedia.org/wiki/Special:FilePath/Aristotle%20Altemps%20Inv8575.jpg",
  "monarquia-romana": "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum%20%28Foro%20Romano%29.jpg",
  "republica-romana": "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum%20%28Foro%20Romano%29.jpg",
  "doze-tabuas": "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Twelve%20Tables.jpg",
  "expansao-italia": "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20conquest%20of%20Italy.png",
  "guerras-punicas": "https://commons.wikimedia.org/wiki/Special:FilePath/Hannibal%20route%20of%20invasion-en.svg",
  "cesar-rubicao": "https://commons.wikimedia.org/wiki/Special:FilePath/Bust%20of%20Julius%20Caesar.jpg",
  "accio-otaviano": "https://commons.wikimedia.org/wiki/Special:FilePath/Actium%20battle%20map-en.svg",
  "augusto-pax":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Augustus%20of%20Prima%20Porta%20%28inv.%202290%29.jpg",
  "alto-imperio": "https://commons.wikimedia.org/wiki/Special:FilePath/Trajans-Column-lower-animated.jpeg",
  "crise-seculo-iii": "https://commons.wikimedia.org/wiki/Special:FilePath/Aurelian%20Wall%20Rome%202006.jpg",
  "mitologia-romana": "https://commons.wikimedia.org/wiki/Special:FilePath/Jupiter%20Smyrna%20Louvre%20Ma13.jpg",
  "crise-republica":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Spartacus%20by%20Denis%20Foyatier%20Louvre%20MR1745.jpg",
  "diocleciano-constantino": "https://commons.wikimedia.org/wiki/Special:FilePath/Constantino-capitolino.jpg",
  "queda-roma-ocidente":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Sack%20of%20Rome%20by%20the%20Visigoths%20on%2024%20August%20410%20by%20J-N%20Sylvestre%201890.jpg",
  "reinos-germanicos": "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%20476.svg",
  justiniano: "https://commons.wikimedia.org/wiki/Special:FilePath/Justinian%20mosaik%20ravenna.jpg",
  "islamismo-expansao":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Great%20Mosque%20of%20Kairouan%20Panorama.jpg",
  "carlos-magno": "https://commons.wikimedia.org/wiki/Special:FilePath/Charlemagne-by-Durer.jpg",
  "feudalismo-igreja":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cit%C3%A9%20m%C3%A9di%C3%A9vale%20de%20Carcassonne.jpg",
  vikings: "https://commons.wikimedia.org/wiki/Special:FilePath/Osebergskipet.jpg",
  cruzadas: "https://commons.wikimedia.org/wiki/Special:FilePath/1099jerusalem.jpg",
  "imperio-mongol": "https://commons.wikimedia.org/wiki/Special:FilePath/Mongol%20Empire%20map.gif",
  "peste-negra":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Tournai%20-%20Doornik%20-%20Manuscript%20black%20death.jpg",
  "cem-anos-joana": "https://commons.wikimedia.org/wiki/Special:FilePath/Joan%20of%20Arc%20miniature%20graded.jpg",
  "queda-constantinopla": "https://commons.wikimedia.org/wiki/Special:FilePath/Siege%20of%20Constantinople%201453.jpg",
  gutenberg:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Gutenberg%20Bible%2C%20Lenox%20Copy%2C%20New%20York%20Public%20Library%2C%202009.%20Pic%2001.jpg",
  "grandes-navegacoes": "https://commons.wikimedia.org/wiki/Special:FilePath/Cantino%20planisphere%20%281502%29.jpg",
  reforma: "https://commons.wikimedia.org/wiki/Special:FilePath/Cranach%20Martin%20Luther.JPG",
  "estados-modernos": "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%201700.jpg",
  "absolutismo-luis-xiv":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Fa%C3%A7ade%20of%20the%20Palace%20of%20Versailles.jpg",
  "revolucao-cientifica":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Galileo%20Galilei%20by%20Justus%20Sustermans.jpg",
  iluminismo: "https://commons.wikimedia.org/wiki/Special:FilePath/Salon%20de%20Madame%20Geoffrin.jpg",
  "revolucao-inglesa":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cromwell%20at%20Dunbar%20Andrew%20Carrick%20Gow.jpg",
  "independencia-eua":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Declaration%20of%20Independence%20%281819%29%2C%20by%20John%20Trumbull.jpg",
  "revolucao-francesa": "assets/images/bastilha.jpg",
  "terror-napoleao": "https://commons.wikimedia.org/wiki/Special:FilePath/Robespierre%2C%20Mus%C3%A9e%20Carnavalet.jpg",
  "napoleao-imperador":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/960px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
  "codigo-napoleonico": "https://commons.wikimedia.org/wiki/Special:FilePath/Code%20civil%201804.png",
  "austerlitz-bloqueio":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Fran%C3%A7ois%20G%C3%A9rard%20-%20Battle%20of%20Austerlitz.jpg",
  "russia-waterloo":
    "https://commons.wikimedia.org/wiki/Special:FilePath/William%20Sadler%20II%20-%20The%20Battle%20of%20Waterloo.jpg",
  "socialismo-marx":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png/960px-Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png",
  "segunda-industrial":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Edison%20light%20bulb%20Museum%20of%20Science%20and%20Industry%20Chicago%202005.jpg",
  unificacoes: "https://commons.wikimedia.org/wiki/Special:FilePath/Wernerprokla.jpg",
  imperialismo: "https://commons.wikimedia.org/wiki/Special:FilePath/Africa%20colonial%201913%20map.svg",
  "causas-ww1":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Franz%20Ferdinand%20d%27Este%2C%20Sophie%20Chotek%20leaving%20Sarajevo%20City%20Hall%20on%2028%20June%201914.jpg",
  "eua-russia-ww1": "https://commons.wikimedia.org/wiki/Special:FilePath/Lenin%20in%201920%20%28cropped%29.jpg",
  versailles: "https://commons.wikimedia.org/wiki/Special:FilePath/Treaty%20of%20Versailles%2C%20English%20version.jpg",
  "weimar-versailles":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv%20Bild%20102-00604%2C%20Inflation%2C%20Tapezieren%20mit%20Geldscheinen.jpg",
  "fascismo-nazismo-stalinismo":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv%20Bild%20183-R99542%2C%20Berlin%2C%20Reichstagssitzung%2C%20Rede%20Adolf%20Hitler.jpg",
  "guerra-civil-espanhola":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Spanish%20Civil%20War%20-%20Mass%20grave%20-%20Est%C3%A9par%20%28Burgos%29.jpg",
  "japao-apaziguamento": "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden%20Incident%20railway.jpg",
  "polonia-1939": "https://commons.wikimedia.org/wiki/Special:FilePath/Polish%20Infantry%20marching%20-%201939.jpg",
  "queda-franca-inglaterra":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Heinkel%20He%20111%20during%20the%20Battle%20of%20Britain.jpg",
  "barbarossa-pearl":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Pearl%20Harbor%20looking%20southwest-Oct41.jpg",
  "stalingrado-pacifico": "https://commons.wikimedia.org/wiki/Special:FilePath/Stalingrad%20after%20liberation.jpg",
  holocausto: "https://commons.wikimedia.org/wiki/Special:FilePath/Auschwitz-Birkenau%20railway%20tracks.jpg",
  "queda-berlim":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Raising%20a%20flag%20over%20the%20Reichstag%202.jpg",
  "hiroshima-nagasaki": "https://commons.wikimedia.org/wiki/Special:FilePath/Atomic%20bombing%20of%20Japan.jpg",
  "onu-pos-guerra":
    "https://commons.wikimedia.org/wiki/Special:FilePath/United%20Nations%20Conference%20on%20International%20Organization%20UNCIO%20delegates.jpg"
};

const acontecimentos = data.acontecimentos.map((acontecimento) => ({
  ...acontecimento,
  imagem: imageOverrides[acontecimento.id] || acontecimento.imagem
}));

const personagens = data.personagens.map((personagem) => ({
  id: personagem.id || slug(personagem.nome),
  ...personagem
}));

const perguntasRevisao = data.perguntasRevisao.map((item) => {
  if (Array.isArray(item)) {
    return { tipo: item[0] || "conceito", pergunta: item[1], resposta: item[2] };
  }
  if (item?.resposta?.trim?.().endsWith("?")) {
    return { tipo: item.pergunta || "conceito", pergunta: item.resposta, resposta: item.tipo };
  }
  return item;
});

const dadosCorrigidos = corrigirObjeto({
  acontecimentos,
  deusesGregos: data.deusesGregos,
  personagens,
  comparacoesDivinas: data.comparacoesDivinas,
  comparadores: data.comparadores,
  mapas: data.mapas,
  perguntasRevisao,
  periodosFiltro: data.periodosFiltro,
  civilizacoesFiltro: data.civilizacoesFiltro,
  categoriasFiltro: data.categoriasFiltro
});

const generated = `import type { Acontecimento, ComparadorCivilizacao, DeusGrego, MapaHistorico, PerguntaRevisao, Personagem } from "../types";

export const acontecimentos = ${JSON.stringify(dadosCorrigidos.acontecimentos, null, 2)} satisfies Acontecimento[];

export const deusesGregos = ${JSON.stringify(dadosCorrigidos.deusesGregos, null, 2)} satisfies DeusGrego[];

export const personagens = ${JSON.stringify(dadosCorrigidos.personagens, null, 2)} satisfies Personagem[];

export const comparacoesDivinas = ${JSON.stringify(dadosCorrigidos.comparacoesDivinas, null, 2)} satisfies Array<[string, string]>;

export const comparadores = ${JSON.stringify(dadosCorrigidos.comparadores, null, 2)} satisfies Record<string, ComparadorCivilizacao>;

export const mapas = ${JSON.stringify(dadosCorrigidos.mapas, null, 2)} satisfies MapaHistorico[];

export const perguntasRevisao = ${JSON.stringify(dadosCorrigidos.perguntasRevisao, null, 2)} satisfies PerguntaRevisao[];

export const periodosFiltro = ${JSON.stringify(dadosCorrigidos.periodosFiltro, null, 2)} satisfies string[];

export const civilizacoesFiltro = ${JSON.stringify(dadosCorrigidos.civilizacoesFiltro, null, 2)} satisfies string[];

export const categoriasFiltro = ${JSON.stringify(dadosCorrigidos.categoriasFiltro, null, 2)} satisfies string[];
`;

fs.mkdirSync(path.join(root, "src", "data"), { recursive: true });
fs.writeFileSync(path.join(root, "src", "data", "generated.ts"), generated, "utf8");
console.log(
  `Dados gerados: ${dadosCorrigidos.acontecimentos.length} acontecimentos, ${dadosCorrigidos.personagens.length} personagens.`
);
