import { availableDeityMythologies } from "../../services/mythologyService";
import type { MythologyId } from "../../types/mythology";

export function MythologySelector({
  value,
  onChange
}: {
  value: MythologyId | "todas" | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mythology-selector" role="group" aria-label="Selecionar mitologia">
      <button className={!value || value === "todas" ? "active" : ""} onClick={() => onChange("todas")}>
        Todas
      </button>
      {availableDeityMythologies.map((mythology) => (
        <button
          key={mythology.id}
          className={value === mythology.id ? "active" : ""}
          onClick={() => onChange(mythology.id)}
        >
          <span>{mythology.icon}</span>
          {mythology.name.replace("Mitologia ", "")}
        </button>
      ))}
    </div>
  );
}
