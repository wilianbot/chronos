import { useMemo } from "react";
import {
  buildMythologyTreeGraph,
  getMythologicalEntity,
  searchMythologicalEntities
} from "../services/mythologyTreeService";
import type { MythologyTreeFilters } from "../types/mythologyTree";

export function useMythologyTree({
  filters,
  favorites,
  studied
}: {
  filters: MythologyTreeFilters;
  favorites: Set<string>;
  studied: Set<string>;
}) {
  const graph = useMemo(() => buildMythologyTreeGraph(filters, { favorites, studied }), [filters, favorites, studied]);
  const selectedEntity = useMemo(() => getMythologicalEntity(graph.focusId), [graph.focusId]);
  const searchResults = useMemo(
    () =>
      searchMythologicalEntities(
        filters.query || "",
        filters.mode === "correspondences" ? undefined : filters.mythology
      ),
    [filters.mode, filters.mythology, filters.query]
  );

  return {
    graph,
    selectedEntity,
    searchResults
  };
}
