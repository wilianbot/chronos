import { traditionsForMythology } from "../../../services/mythologyTreeService";
import type { MythologyTreeFilters } from "../../../types/mythologyTree";

export function MythologyTraditionSelector({
  filters,
  onChange
}: {
  filters: MythologyTreeFilters;
  onChange: <K extends keyof MythologyTreeFilters>(key: K, value: MythologyTreeFilters[K]) => void;
}) {
  const traditions = traditionsForMythology(filters.mythology);
  return (
    <label className="select-field compact-select">
      <span>Tradição usada</span>
      <select value={filters.tradition || "todas"} onChange={(event) => onChange("tradition", event.target.value)}>
        <option value="todas">Todas as tradições cadastradas</option>
        {traditions.map((tradition) => (
          <option key={tradition.id} value={tradition.id}>
            {tradition.name}
          </option>
        ))}
      </select>
    </label>
  );
}
