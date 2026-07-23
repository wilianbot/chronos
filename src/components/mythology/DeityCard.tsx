import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { getEquivalentDeities } from "../../services/mythologyService";
import type { Deity } from "../../types/mythology";
import { DeityImage } from "./DeityImage";
import { DeityCategoryBadge, MythologyNameBadge, MythologyBadge } from "./MythologyBadge";

export function DeityCard({
  deity,
  favorite,
  onFavorite
}: {
  deity: Deity;
  favorite: boolean;
  onFavorite: () => void;
}) {
  const equivalents = getEquivalentDeities(deity);
  return (
    <article className="deity-card">
      <div className="deity-card-image">
        <DeityImage deity={deity} />
      </div>
      <div className="deity-card-body">
        <div className="deity-badges">
          <MythologyNameBadge mythology={deity.mythology} />
          <DeityCategoryBadge category={deity.category} />
          {deity.domains.slice(0, 1).map((domain) => (
            <MythologyBadge key={domain}>{domain}</MythologyBadge>
          ))}
        </div>
        <h3>{deity.name}</h3>
        <p className="deity-title">{deity.title}</p>
        <p>{deity.shortDescription}</p>
        <dl className="deity-card-facts">
          <div>
            <dt>Domínios</dt>
            <dd>{deity.domains.slice(0, 3).join(", ")}</dd>
          </div>
          <div>
            <dt>Símbolos</dt>
            <dd>{deity.symbols.slice(0, 3).join(", ")}</dd>
          </div>
          {equivalents.length > 0 && (
            <div>
              <dt>Correspondência aproximada</dt>
              <dd>{equivalents.map((item) => item.name).join(", ")}</dd>
            </div>
          )}
        </dl>
        <div className="card-actions">
          <Link className="button primary compact" to={`/deuses/${deity.id}`}>
            Conhecer história
          </Link>
          <button className={`button secondary compact ${favorite ? "active" : ""}`} onClick={onFavorite}>
            <Heart size={16} /> Favoritar
          </button>
        </div>
      </div>
    </article>
  );
}
