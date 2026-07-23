import type { Deity, DeityCategory } from "../../types/mythology";
import type { MythologicalCategory, MythologicalEntity, MythologicalEntityType } from "../../types/mythologyTree";
import { greekDeities } from "./greekDeities";
import { greekCreatures } from "./greekCreatures";
import { greekHeroes } from "./greekHeroes";
import { greekMortals } from "./greekMortals";
import { defaultGreekTreeSources, defaultRomanTreeSources } from "./mythologySources";
import { romanCreatures } from "./romanCreatures";
import { romanHeroes } from "./romanHeroes";
import { romanMortals } from "./romanMortals";
import { romanDeities } from "./romanDeities";

const deities = [...greekDeities, ...romanDeities];

const categoryMap: Record<DeityCategory, MythologicalCategory> = {
  olimpico: "olympian",
  primordial: "primordial",
  tita: "titan",
  ctonico: "chthonic",
  personificacao: "other",
  "heroi-divinizado": "heroic",
  domestico: "domestic",
  agricola: "nature",
  guerra: "war",
  natureza: "nature",
  amor: "love",
  morte: "death",
  sabedoria: "wisdom",
  cura: "healing",
  liminar: "other"
};

const entityTypeOverrides: Record<string, MythologicalEntityType> = {
  gaia: "primordial",
  urano: "primordial",
  cronos: "titan",
  reia: "titan",
  prometeu: "titan",
  nemesis: "personification",
  nike: "personification",
  hipnos: "personification",
  tanatos: "personification",
  asclepio: "demigod",
  lares: "collective",
  penates: "collective"
};

function deityEntityType(deity: Deity): MythologicalEntityType {
  if (entityTypeOverrides[deity.id]) return entityTypeOverrides[deity.id];
  if (deity.category === "primordial") return "primordial";
  if (deity.category === "tita") return "titan";
  if (deity.category === "personificacao") return "personification";
  if (deity.category === "heroi-divinizado") return "demigod";
  if (deity.category === "domestico") return "deity";
  return "deity";
}

function deityToEntity(deity: Deity): MythologicalEntity {
  const categories = Array.from(
    new Set([deity.category, ...(deity.tags || [])].map((category) => categoryMap[category]))
  );
  return {
    id: deity.id,
    name: deity.name,
    alternativeNames: deity.alternativeNames,
    mythology: deity.mythology,
    culture: deity.culture,
    entityType: deityEntityType(deity),
    categories,
    title: deity.title,
    shortDescription: deity.shortDescription,
    fullDescription: deity.fullHistory,
    domains: deity.domains,
    symbols: deity.symbols,
    attributes: deity.attributes,
    image: deity.image,
    pageRoute: `/deuses/${deity.id}`,
    hasDedicatedPage: true,
    sources: deity.mythology === "grega" ? defaultGreekTreeSources : defaultRomanTreeSources
  };
}

function greekEntity(input: Omit<MythologicalEntity, "mythology" | "culture" | "sources">): MythologicalEntity {
  return {
    mythology: "grega",
    culture: "Tradições gregas antigas",
    sources: defaultGreekTreeSources,
    ...input
  };
}

export const greekAdditionalEntities: MythologicalEntity[] = [
  greekEntity({
    id: "caos",
    name: "Caos",
    entityType: "primordial",
    categories: ["primordial"],
    title: "Abertura primordial",
    shortDescription: "Entidade primordial no início da sucessão teogônica em Hesíodo."
  }),
  greekEntity({
    id: "tartaro",
    name: "Tártaro",
    entityType: "primordial",
    categories: ["primordial", "chthonic"],
    title: "Abismo subterrâneo primordial",
    shortDescription: "Entidade e região profunda associada à ordem cósmica antiga."
  }),
  greekEntity({
    id: "eros-primordial",
    name: "Eros primordial",
    entityType: "primordial",
    categories: ["primordial", "love"],
    title: "Força primordial de atração",
    shortDescription: "Figura cosmogônica distinta do Eros/Cupido posterior em muitas leituras didáticas."
  }),
  greekEntity({
    id: "erebo",
    name: "Érebo",
    entityType: "primordial",
    categories: ["primordial", "chthonic"],
    title: "Trevas primordiais",
    shortDescription: "Descendente de Caos em tradições teogônicas."
  }),
  greekEntity({
    id: "nix",
    name: "Nix",
    entityType: "primordial",
    categories: ["primordial"],
    title: "Noite primordial",
    shortDescription: "Entidade primordial ligada a personificações como Hipnos e Tânatos."
  }),
  greekEntity({
    id: "hemera",
    name: "Hemera",
    entityType: "personification",
    categories: ["other"],
    title: "Personificação do dia",
    shortDescription: "Filha de Nix e Érebo na sucessão teogônica."
  }),
  greekEntity({
    id: "eter",
    name: "Éter",
    entityType: "personification",
    categories: ["other"],
    title: "Personificação do brilho superior",
    shortDescription: "Filho de Nix e Érebo em tradições cosmogônicas."
  }),
  greekEntity({
    id: "ponto",
    name: "Ponto",
    entityType: "primordial",
    categories: ["primordial", "sea"],
    title: "Mar primordial",
    shortDescription: "Gerado por Gaia em tradições teogônicas."
  }),
  ...[
    ["oceano", "Oceano", "Titã do rio cósmico que circunda o mundo."],
    ["ceos", "Céos", "Titã ligado a linhagens de Leto e Apolo em genealogias antigas."],
    ["crio", "Crio", "Titã da geração de Gaia e Urano."],
    ["hiperion", "Hipérion", "Titã associado à linhagem solar."],
    ["japeto", "Jápeto", "Titã associado à linhagem de Prometeu e Atlas."],
    ["teia", "Teia", "Titânide ligada à linhagem de Hélio, Selene e Eos."],
    ["temis", "Têmis", "Titânide da ordem e mãe das Horas e Moiras em Hesíodo."],
    ["mnemosine", "Mnemósine", "Titânide da memória e mãe das Musas em Hesíodo."],
    ["febe", "Febe", "Titânide da geração de Gaia e Urano."],
    ["tetis-titanide", "Tétis Titânide", "Titânide distinta da nereida Tétis, mãe de Aquiles."]
  ].map(([id, name, shortDescription]) =>
    greekEntity({
      id,
      name,
      entityType: "titan",
      categories: ["titan"],
      title: "Titã da geração de Gaia e Urano",
      shortDescription
    })
  ),
  greekEntity({
    id: "ciclopes",
    name: "Ciclopes",
    entityType: "collective",
    categories: ["other"],
    title: "Grupo coletivo nascido de Gaia e Urano",
    shortDescription:
      "Grupo primordial de artesãos monstruosos; aparece como coletivo para evitar multiplicação inicial."
  }),
  greekEntity({
    id: "hecatonquiros",
    name: "Hecatônquiros",
    entityType: "collective",
    categories: ["other"],
    title: "Grupo coletivo dos cem braços",
    shortDescription: "Grupo primordial nascido de Gaia e Urano em tradições teogônicas."
  }),
  greekEntity({
    id: "hebe",
    name: "Hebe",
    entityType: "deity",
    categories: ["olympian"],
    title: "Deusa da juventude",
    shortDescription: "Filha de Zeus e Hera em tradições olímpicas."
  }),
  greekEntity({
    id: "ilitia",
    name: "Ilítia",
    entityType: "deity",
    categories: ["olympian"],
    title: "Deusa associada ao parto",
    shortDescription: "Filha de Zeus e Hera em tradições recorrentes."
  }),
  greekEntity({
    id: "horas",
    name: "Horas",
    entityType: "collective",
    categories: ["other"],
    title: "Deusas coletivas da ordem temporal",
    shortDescription: "Filhas de Zeus e Têmis em Hesíodo."
  }),
  greekEntity({
    id: "moiras",
    name: "Moiras",
    entityType: "collective",
    categories: ["death"],
    title: "Personificações coletivas do destino",
    shortDescription: "Associadas a Zeus e Têmis em uma tradição; a genealogia varia."
  }),
  greekEntity({
    id: "musas",
    name: "Musas",
    entityType: "collective",
    categories: ["other"],
    title: "Deusas coletivas da inspiração",
    shortDescription: "Filhas de Zeus e Mnemósine em Hesíodo."
  })
];

export const mythologicalEntities: MythologicalEntity[] = [
  ...deities.map(deityToEntity),
  ...greekAdditionalEntities,
  ...greekMortals,
  ...greekHeroes,
  ...greekCreatures,
  ...romanMortals,
  ...romanHeroes,
  ...romanCreatures
];

export const mythologicalEntitiesById = new Map(mythologicalEntities.map((entity) => [entity.id, entity]));
