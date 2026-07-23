import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  defaultTreeFilters,
  treeModeLabels,
  treeCategoryLabels,
  entityTypeLabels
} from "../services/mythologyTreeService";
import type { MythologyId } from "../types/mythology";
import type {
  MythologicalCategory,
  MythologicalEntityType,
  MythologyTreeDepth,
  MythologyTreeFilters,
  MythologyTreeMode
} from "../types/mythologyTree";

const mythologies: MythologyId[] = ["grega", "romana"];
const modes = Object.keys(treeModeLabels) as MythologyTreeMode[];
const entityTypes = Object.keys(entityTypeLabels) as MythologicalEntityType[];
const categories = Object.keys(treeCategoryLabels) as MythologicalCategory[];
const depths: MythologyTreeDepth[] = ["1", "2", "3", "all"];
const entityTypeAliases: Record<string, MythologicalEntityType> = {
  primordial: "primordial",
  tita: "titan",
  titan: "titan",
  deus: "deity",
  divindade: "deity",
  semideus: "demigod",
  heroi: "hero",
  mortal: "mortal",
  criatura: "creature",
  personificacao: "personification",
  coletivo: "collective"
};
const entityTypeParams: Partial<Record<MythologicalEntityType, string>> = {
  titan: "tita",
  deity: "deus",
  demigod: "semideus",
  hero: "heroi",
  creature: "criatura",
  personification: "personificacao",
  collective: "coletivo"
};

function booleanParam(value: string | null, fallback: boolean) {
  if (value === "1" || value === "true") return true;
  if (value === "0" || value === "false") return false;
  return fallback;
}

export function useMythologyTreeFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<MythologyTreeFilters>(() => {
    const mythology = searchParams.get("mitologia");
    const mode = searchParams.get("modo") || searchParams.get("mode");
    const depth = searchParams.get("profundidade") || searchParams.get("depth");
    const entityType = searchParams.get("tipo");
    const category = searchParams.get("categoria");
    const group = searchParams.get("grupo");
    const groupMatch = group?.match(/^descendentes-de-(.+)$/);
    const parsedEntityType = entityTypeAliases[entityType || ""] || (entityType as MythologicalEntityType);

    return {
      ...defaultTreeFilters,
      mythology: mythologies.includes(mythology as MythologyId)
        ? (mythology as MythologyId)
        : defaultTreeFilters.mythology,
      mode: groupMatch
        ? "descendants"
        : modes.includes(mode as MythologyTreeMode)
          ? (mode as MythologyTreeMode)
          : defaultTreeFilters.mode,
      depth: depths.includes(depth as MythologyTreeDepth) ? (depth as MythologyTreeDepth) : defaultTreeFilters.depth,
      entityType: entityTypes.includes(parsedEntityType) ? parsedEntityType : "todos",
      category: categories.includes(category as MythologicalCategory) ? (category as MythologicalCategory) : "todas",
      tradition: searchParams.get("tradicao") || "todas",
      query: searchParams.get("busca") || "",
      focusId: searchParams.get("foco") || groupMatch?.[1] || undefined,
      partnerId: searchParams.get("parceiro") || undefined,
      onlyWithPages: booleanParam(searchParams.get("comPagina"), false),
      onlyFavorites: booleanParam(searchParams.get("favoritos"), false),
      onlyStudied: booleanParam(searchParams.get("estudados"), false),
      includeAlternative: booleanParam(searchParams.get("alternativas"), true),
      includeCorrespondences: booleanParam(searchParams.get("correspondencias"), false),
      includeNarrative: booleanParam(searchParams.get("narrativas"), false),
      showMinimap: booleanParam(searchParams.get("minimapa"), false)
    };
  }, [searchParams]);

  const updateFilter = useCallback(
    <K extends keyof MythologyTreeFilters>(key: K, value: MythologyTreeFilters[K]) => {
      const next = new URLSearchParams(searchParams);
      const stringValue = String(value ?? "");
      const map: Record<keyof MythologyTreeFilters, string> = {
        mythology: "mitologia",
        entityType: "tipo",
        category: "categoria",
        tradition: "tradicao",
        query: "busca",
        focusId: "foco",
        partnerId: "parceiro",
        mode: "modo",
        depth: "profundidade",
        onlyWithPages: "comPagina",
        onlyFavorites: "favoritos",
        onlyStudied: "estudados",
        includeAlternative: "alternativas",
        includeCorrespondences: "correspondencias",
        includeNarrative: "narrativas",
        showMinimap: "minimapa"
      };
      const param = map[key];

      const encodedValue =
        key === "entityType" && entityTypeParams[stringValue as MythologicalEntityType]
          ? entityTypeParams[stringValue as MythologicalEntityType]!
          : stringValue;

      if (
        !stringValue ||
        stringValue === "todos" ||
        stringValue === "todas" ||
        (key === "mythology" && stringValue === defaultTreeFilters.mythology) ||
        (key === "mode" && stringValue === defaultTreeFilters.mode) ||
        (key === "depth" && stringValue === defaultTreeFilters.depth)
      ) {
        next.delete(param);
      } else {
        next.set(param, encodedValue);
      }

      setSearchParams(next, { replace: false });
    },
    [searchParams, setSearchParams]
  );

  const resetFilters = useCallback(() => setSearchParams({}, { replace: false }), [setSearchParams]);

  return { filters, updateFilter, resetFilters };
}
