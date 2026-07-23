import { Search } from "lucide-react";
import {
  deityCategories,
  deityCategoryLabels,
  deityDomains,
  type MythologyFilterState
} from "../../services/mythologyService";
import { MythologySelector } from "./MythologySelector";

export function MythologyFilters({
  filters,
  onChange,
  onReset
}: {
  filters: MythologyFilterState;
  onChange: (key: keyof MythologyFilterState, value: string) => void;
  onReset: () => void;
}) {
  return (
    <section className="mythology-filters" aria-label="Filtros de divindades">
      <MythologySelector value={filters.mythology} onChange={(value) => onChange("mythology", value)} />
      <label className="search-field">
        <Search size={18} />
        <span className="sr-only">Buscar divindades</span>
        <input
          value={filters.query || ""}
          onChange={(event) => onChange("query", event.target.value)}
          placeholder="Buscar por nome, domínio, símbolo, mito..."
        />
      </label>
      <div className="mythology-filter-grid">
        <label className="select-field">
          <span>Categoria</span>
          <select value={filters.category || "todas"} onChange={(event) => onChange("category", event.target.value)}>
            <option value="todas">Todas</option>
            {deityCategories.map((category) => (
              <option key={category} value={category}>
                {deityCategoryLabels[category]}
              </option>
            ))}
          </select>
        </label>
        <label className="select-field">
          <span>Domínio</span>
          <select value={filters.domain || ""} onChange={(event) => onChange("domain", event.target.value)}>
            <option value="">Todos</option>
            {deityDomains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </label>
        <label className="select-field">
          <span>Gênero</span>
          <select value={filters.gender || "todos"} onChange={(event) => onChange("gender", event.target.value)}>
            <option value="todos">Todos</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro/coletivo</option>
            <option value="nao-definido">Não definido</option>
          </select>
        </label>
        <button className="button secondary compact" onClick={onReset}>
          Limpar filtros
        </button>
      </div>
    </section>
  );
}
