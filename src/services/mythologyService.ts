import { deities, deitiesById, mythologies } from "../data/mythology";
import { normalizar } from "../lib/history";
import type { Deity, DeityCategory, MythologyId } from "../types/mythology";

export type MythologyFilterState = {
  mythology?: MythologyId | "todas";
  category?: DeityCategory | "todas";
  domain?: string;
  gender?: string;
  query?: string;
};

export const deityCategoryLabels: Record<DeityCategory, string> = {
  olimpico: "Olímpico",
  primordial: "Primordial",
  tita: "Titã",
  ctonico: "Ctônico",
  personificacao: "Personificação",
  "heroi-divinizado": "Herói divinizado",
  domestico: "Doméstico",
  agricola: "Agrícola",
  guerra: "Guerra",
  natureza: "Natureza",
  amor: "Amor",
  morte: "Morte",
  sabedoria: "Sabedoria",
  cura: "Cura",
  liminar: "Limiar"
};

export const allDeities = deities;
export const deityMap = deitiesById;
export const availableDeityMythologies = mythologies.filter((mythology) =>
  deities.some((deity) => deity.mythology === mythology.id)
);

export const deityCategories = Array.from(
  new Set(deities.flatMap((deity) => [deity.category, ...(deity.tags || [])]))
).sort((a, b) => deityCategoryLabels[a].localeCompare(deityCategoryLabels[b]));

export const deityDomains = Array.from(new Set(deities.flatMap((deity) => deity.domains))).sort((a, b) =>
  a.localeCompare(b)
);

export function getDeityById(id?: string) {
  return id ? deityMap.get(id) : undefined;
}

export function getMythologyName(id: MythologyId) {
  return mythologies.find((mythology) => mythology.id === id)?.name || id;
}

export function getRelatedDeities(ids?: string[]) {
  return (ids || []).map((id) => deityMap.get(id)).filter(Boolean) as Deity[];
}

export function getEquivalentDeities(deity: Deity) {
  return getRelatedDeities(deity.equivalentDeityIds);
}

export function searchDeityText(deity: Deity) {
  return [
    deity.name,
    ...(deity.alternativeNames || []),
    deity.title,
    deity.culture,
    deity.shortDescription,
    deity.fullHistory,
    ...deity.domains,
    ...deity.symbols,
    ...(deity.sacredAnimals || []),
    ...(deity.sacredPlants || []),
    ...(deity.attributes || []),
    ...(deity.parents || []),
    ...(deity.siblings || []),
    ...(deity.partners || []),
    ...(deity.children || []),
    ...deity.mainMyths
  ]
    .filter(Boolean)
    .join(" ");
}

export function filterDeities(filters: MythologyFilterState) {
  const query = normalizar(filters.query || "");
  const domain = normalizar(filters.domain || "");
  return deities.filter((deity) => {
    if (filters.mythology && filters.mythology !== "todas" && deity.mythology !== filters.mythology) return false;
    if (
      filters.category &&
      filters.category !== "todas" &&
      deity.category !== filters.category &&
      !(deity.tags || []).includes(filters.category)
    ) {
      return false;
    }
    if (filters.gender && filters.gender !== "todos" && deity.gender !== filters.gender) return false;
    if (domain && !deity.domains.some((item) => normalizar(item).includes(domain))) return false;
    if (query && !normalizar(searchDeityText(deity)).includes(query)) return false;
    return true;
  });
}

export function progressByMythology(studied: Set<string>) {
  return availableDeityMythologies.map((mythology) => {
    const items = deities.filter((deity) => deity.mythology === mythology.id);
    const done = items.filter((deity) => studied.has(deity.id)).length;
    return {
      mythology,
      total: items.length,
      done,
      percent: items.length ? Math.round((done / items.length) * 100) : 0
    };
  });
}

export function mythologyReviewItems() {
  return deities.flatMap((deity) => [
    {
      id: `deity-domain:${deity.id}`,
      tipo: "Pergunta" as const,
      tema: getMythologyName(deity.mythology),
      pergunta: `Qual era o domínio de ${deity.name}?`,
      resposta: deity.domains.join(", ")
    },
    {
      id: `deity-symbol:${deity.id}`,
      tipo: "Pergunta" as const,
      tema: getMythologyName(deity.mythology),
      pergunta: `Quais eram os símbolos de ${deity.name}?`,
      resposta: deity.symbols.join(", ")
    },
    ...(deity.equivalentDeityIds?.length
      ? [
          {
            id: `deity-equivalent:${deity.id}`,
            tipo: "Pergunta" as const,
            tema: getMythologyName(deity.mythology),
            pergunta: `Qual divindade era frequentemente associada a ${deity.name}?`,
            resposta: getEquivalentDeities(deity)
              .map((item) => item.name)
              .join(", ")
          }
        ]
      : [])
  ]);
}
