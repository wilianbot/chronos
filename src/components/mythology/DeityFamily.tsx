import { Link } from "react-router-dom";
import { getRelatedDeities } from "../../services/mythologyService";
import type { Deity } from "../../types/mythology";

function RelationList({ title, ids }: { title: string; ids?: string[] }) {
  const related = getRelatedDeities(ids);
  if (!ids?.length) return null;
  return (
    <section>
      <h4>{title}</h4>
      <div className="deity-link-list">
        {ids.map((id) => {
          const deity = related.find((item) => item.id === id);
          return deity ? (
            <Link key={id} to={`/deuses/${id}`}>
              {deity.name}
            </Link>
          ) : (
            <span key={id}>{id}</span>
          );
        })}
      </div>
    </section>
  );
}

export function DeityFamily({ deity }: { deity: Deity }) {
  return (
    <div className="deity-family-grid">
      <RelationList title="Pais" ids={deity.parents} />
      <RelationList title="Irmãos" ids={deity.siblings} />
      <RelationList title="Parceiros" ids={deity.partners} />
      <RelationList title="Filhos" ids={deity.children} />
    </div>
  );
}
