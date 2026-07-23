import { Link } from "react-router-dom";
import { getEquivalentDeities, getRelatedDeities } from "../../services/mythologyService";
import type { Deity } from "../../types/mythology";

export function DeityRelations({ deity }: { deity: Deity }) {
  const equivalents = getEquivalentDeities(deity);
  const related = getRelatedDeities(deity.relatedDeityIds);
  return (
    <div className="deity-relations">
      {equivalents.length > 0 && (
        <section>
          <h4>Correspondência cultural aproximada</h4>
          <p>
            Frequentemente associado a{" "}
            {equivalents.map((item, index) => (
              <span key={item.id}>
                {index > 0 ? ", " : ""}
                <Link to={`/deuses/${item.id}`}>{item.name}</Link>
              </span>
            ))}
            . Essa relação não significa identidade exata entre cultos, funções e narrativas.
          </p>
        </section>
      )}
      {related.length > 0 && (
        <section>
          <h4>Deuses relacionados</h4>
          <div className="deity-link-list">
            {related.map((item) => (
              <Link key={item.id} to={`/deuses/${item.id}`}>
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      )}
      {deity.relatedEventIds?.length ? (
        <section>
          <h4>Acontecimentos relacionados</h4>
          <div className="deity-link-list">
            {deity.relatedEventIds.map((id) => (
              <Link key={id} to={`/eventos/${id}`}>
                {id}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
