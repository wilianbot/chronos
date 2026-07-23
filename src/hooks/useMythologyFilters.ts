import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { filterDeities, type MythologyFilterState } from "../services/mythologyService";
import type { DeityCategory, MythologyId } from "../types/mythology";

export function useMythologyFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const mythology = (searchParams.get("mitologia") as MythologyId | "todas" | null) || "todas";
  const category = (searchParams.get("categoria") as DeityCategory | "todas" | null) || "todas";
  const domain = searchParams.get("dominio") || "";
  const gender = searchParams.get("genero") || "todos";
  const query = searchParams.get("busca") || "";

  const filters: MythologyFilterState = { mythology, category, domain, gender, query };

  const deities = useMemo(
    () => filterDeities({ mythology, category, domain, gender, query }),
    [mythology, category, domain, gender, query]
  );

  const updateFilter = (key: keyof MythologyFilterState, value: string) => {
    const next = new URLSearchParams(searchParams);
    const param =
      key === "mythology"
        ? "mitologia"
        : key === "category"
          ? "categoria"
          : key === "query"
            ? "busca"
            : key === "domain"
              ? "dominio"
              : key === "gender"
                ? "genero"
                : key;
    const isEmpty = !value || value === "todas" || value === "todos";
    if (isEmpty) next.delete(param);
    else next.set(param, value);
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => setSearchParams({}, { replace: true });

  return { filters, deities, updateFilter, resetFilters };
}
