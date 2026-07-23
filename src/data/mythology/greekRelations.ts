import type { MythologicalRelation, MythologicalRelationType } from "../../types/mythologyTree";
import { relationSources } from "./mythologySources";

let relationIndex = 0;

function rel(
  sourceId: string,
  targetId: string,
  type: MythologicalRelationType,
  options: Omit<MythologicalRelation, "id" | "sourceId" | "targetId" | "type" | "mythology"> = {}
): MythologicalRelation {
  relationIndex += 1;
  return {
    id: `grega-rel-${relationIndex}`,
    sourceId,
    targetId,
    type,
    mythology: "grega",
    ...options
  };
}

function parents(parentIds: string[], childIds: string[], options: Parameters<typeof rel>[3] = {}) {
  return parentIds.flatMap((parentId) => childIds.map((childId) => rel(parentId, childId, "parent", options)));
}

function partner(sourceId: string, targetId: string, options: Parameters<typeof rel>[3] = {}) {
  return rel(sourceId, targetId, "partner", options);
}

const hesiod = {
  tradition: "hesiodo-teogonia",
  sourceAuthor: "Hesíodo",
  sources: relationSources("hesiodTheogony")
};

const apollodorus = {
  tradition: "apolodoro-biblioteca",
  sourceAuthor: "Pseudo-Apolodoro",
  sources: relationSources("apollodorusLibrary")
};

export const greekRelations: MythologicalRelation[] = [
  ...parents(["caos"], ["erebo", "nix"], hesiod),
  ...parents(["nix", "erebo"], ["hemera", "eter"], hesiod),
  ...parents(["gaia"], ["urano", "ponto"], hesiod),
  ...parents(["gaia", "urano"], ["oceano", "ceos", "crio", "hiperion", "japeto", "cronos"], hesiod),
  ...parents(["gaia", "urano"], ["teia", "reia", "temis", "mnemosine", "febe", "tetis-titanide"], hesiod),
  ...parents(["gaia", "urano"], ["ciclopes", "hecatonquiros"], hesiod),
  ...parents(["gaia", "tartaro"], ["tifao"], {
    ...hesiod,
    description: "Relação cosmogônica tradicional, usada para situar Tifão entre criaturas primordiais."
  }),
  ...parents(["nix"], ["hipnos", "tanatos", "nemesis"], {
    ...hesiod,
    description: "Personificações associadas à Noite na tradição hesiódica."
  }),
  ...parents(["cronos", "reia"], ["hestia", "demeter", "hera", "hades", "poseidon", "zeus"], {
    ...hesiod,
    label: "filhos de Cronos e Reia"
  }),
  partner("cronos", "reia", hesiod),
  partner("zeus", "hera", hesiod),
  partner("zeus", "metis", hesiod),
  partner("zeus", "leto", hesiod),
  partner("zeus", "maia", hesiod),
  partner("zeus", "demeter", hesiod),
  partner("zeus", "semele", apollodorus),
  partner("zeus", "alcmena", apollodorus),
  partner("zeus", "danae", apollodorus),
  partner("zeus", "europa", apollodorus),
  partner("zeus", "leda", {
    ...apollodorus,
    alternative: true,
    description: "A tradição sobre os filhos de Leda combina versões diferentes sobre Zeus e Tíndaro."
  }),
  partner("zeus", "temis", hesiod),
  partner("zeus", "mnemosine", hesiod),
  ...parents(["zeus", "metis"], ["atena"], {
    ...hesiod,
    description: "Atena nasce de Zeus após a incorporação de Métis; o grafo representa a filiação didática."
  }),
  ...parents(["zeus", "hera"], ["ares", "hebe", "ilitia"], hesiod),
  ...parents(["hera"], ["hefesto"], {
    ...hesiod,
    alternative: true,
    description: "Algumas tradições apresentam Hefesto como filho de Hera sem pai."
  }),
  ...parents(["zeus"], ["hefesto"], {
    ...apollodorus,
    alternative: true,
    disputed: true,
    description: "Outras versões incluem Zeus como pai de Hefesto."
  }),
  ...parents(["zeus", "leto"], ["apolo-grego", "artemis"], hesiod),
  ...parents(["zeus", "maia"], ["hermes"], hesiod),
  ...parents(["zeus", "demeter"], ["persefone"], hesiod),
  ...parents(["zeus", "semele"], ["dionisio"], apollodorus),
  ...parents(["zeus", "alcmena"], ["heracles"], apollodorus),
  ...parents(["anfitriao"], ["heracles"], {
    ...apollodorus,
    alternative: true,
    description: "Anfitrião é pai humano/social em tradições do nascimento de Héracles."
  }),
  ...parents(["acrisio"], ["danae"], apollodorus),
  ...parents(["zeus", "danae"], ["perseu"], apollodorus),
  ...parents(["zeus", "europa"], ["minos", "radamanto", "sarpedon"], apollodorus),
  ...parents(["leda"], ["helena", "castor", "polux"], {
    ...apollodorus,
    alternative: true,
    description: "A maternidade de Leda é recorrente; a paternidade dos filhos varia por tradição."
  }),
  ...parents(["zeus"], ["helena", "polux"], {
    ...apollodorus,
    alternative: true,
    description: "Relação apresentada em versões em que Zeus é pai de Helena e Pólux."
  }),
  ...parents(["zeus", "temis"], ["horas", "moiras"], hesiod),
  ...parents(["zeus", "mnemosine"], ["musas"], hesiod),
  ...parents(["apolo-grego", "coronis"], ["asclepio"], apollodorus),
  ...parents(["peleu", "tetis-nereida"], ["aquiles"], {
    tradition: "homero-iliada",
    sourceAuthor: "Homero",
    sources: relationSources("homerIliad")
  }),
  ...parents(["egeu", "etra"], ["teseu"], apollodorus),
  ...parents(["poseidon", "etra"], ["teseu"], {
    ...apollodorus,
    alternative: true,
    disputed: true,
    description: "Tradições alternativas associam Teseu a Poseidon."
  }),
  ...parents(["afrodite", "anquises-grego"], ["eneias-grego"], {
    tradition: "homero-iliada",
    sourceAuthor: "Homero",
    sources: relationSources("homerIliad")
  }),
  ...parents(["cadmo", "harmonia"], ["semele"], apollodorus),
  ...parents(["laio", "jocasta"], ["edipo"], {
    tradition: "apolodoro-biblioteca",
    sourceAuthor: "Pseudo-Apolodoro",
    sources: relationSources("apollodorusLibrary")
  }),
  ...parents(["ares", "afrodite"], ["eros", "harmonia"], {
    ...apollodorus,
    alternative: true,
    description: "A genealogia de Eros varia; esta relação é do Eros jovem, não do Eros primordial."
  }),
  ...parents(["tifao", "equidna"], ["cerbero", "hidra-lerna", "quimera"], {
    ...apollodorus,
    description: "Relação monstruosa usada para genealogia; encontros heroicos ficam fora do parentesco."
  }),
  ...parents(["medusa"], ["pegaso"], {
    ...apollodorus,
    description: "Pégaso nasce do ciclo de Medusa em tradições sobre Perseu."
  }),
  rel("heracles", "hidra-lerna", "rival", {
    label: "enfrentou",
    description: "Relação narrativa, não genealógica.",
    sources: relationSources("apollodorusLibrary")
  }),
  rel("heracles", "leao-nemeia", "rival", {
    label: "enfrentou",
    description: "Relação narrativa, não genealógica.",
    sources: relationSources("apollodorusLibrary")
  }),
  rel("teseu", "minotauro", "rival", {
    label: "enfrentou",
    description: "Relação narrativa, não genealógica.",
    sources: relationSources("apollodorusLibrary")
  }),
  rel("belerofonte", "quimera", "rival", {
    label: "enfrentou",
    description: "Relação narrativa, não genealógica.",
    sources: relationSources("apollodorusLibrary")
  }),
  rel("belerofonte", "pegaso", "companion", {
    label: "associado a",
    description: "Relação narrativa de tradição heroica.",
    sources: relationSources("apollodorusLibrary")
  }),
  rel("odisseu", "cila", "rival", {
    label: "encontrou",
    description: "Relação narrativa da viagem de retorno, não parentesco.",
    tradition: "homero-odisseia",
    sourceAuthor: "Homero",
    sources: relationSources("homerOdyssey")
  }),
  rel("odisseu", "caribdis", "rival", {
    label: "encontrou",
    description: "Relação narrativa da viagem de retorno, não parentesco.",
    tradition: "homero-odisseia",
    sourceAuthor: "Homero",
    sources: relationSources("homerOdyssey")
  })
];
