import { Link } from "react-router-dom";
import { allDeities, availableDeityMythologies, getRelatedDeities } from "../../services/mythologyService";
import type { MythologyId } from "../../types/mythology";

export function MythologyFamilyTree({
  mythology = "grega",
  onMythologyChange
}: {
  mythology?: MythologyId;
  onMythologyChange?: (value: string) => void;
}) {
  const deities = allDeities.filter((deity) => deity.mythology === mythology);
  const roots = deities
    .filter((deity) => !deity.parents?.some((id) => deities.some((item) => item.id === id)))
    .slice(0, 6);

  return (
    <div className="mythology-tree-panel">
      <label className="select-field compact-select">
        <span>Árvore</span>
        <select value={mythology} onChange={(event) => onMythologyChange?.(event.target.value)}>
          {availableDeityMythologies.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <div className="mythology-tree" aria-label={`Árvore genealógica - ${mythology}`}>
        {(roots.length ? roots : deities.slice(0, 6)).map((deity) => {
          const children = getRelatedDeities(deity.children).filter((child) => child.mythology === deity.mythology);
          return (
            <section key={deity.id} className="tree-family">
              <Link className="tree-node root" to={`/deuses/${deity.id}`}>
                {deity.name}
              </Link>
              {children.length > 0 && (
                <div className="tree-children">
                  {children.map((child) => (
                    <Link className="tree-node" key={child.id} to={`/deuses/${child.id}`}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
      <p className="tree-note">
        Árvore simplificada: genealogias antigas variam por autor, região e época. As árvores grega e romana são
        filtradas separadamente.
      </p>
    </div>
  );
}
