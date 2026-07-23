import { Copy, Heart, CheckCircle2 } from "lucide-react";
import type { Deity } from "../../types/mythology";
import { DeityImage } from "./DeityImage";
import { DeityCategoryBadge, MythologyNameBadge } from "./MythologyBadge";

export function DeityHeader({
  deity,
  favorite,
  studied,
  onFavorite,
  onStudied,
  onCopyLink
}: {
  deity: Deity;
  favorite: boolean;
  studied: boolean;
  onFavorite: () => void;
  onStudied: () => void;
  onCopyLink: () => void;
}) {
  return (
    <header className="deity-detail-header">
      <div className="deity-detail-media">
        <DeityImage deity={deity} className="deity-detail-image" />
      </div>
      <div className="deity-detail-copy">
        <div className="deity-badges">
          <MythologyNameBadge mythology={deity.mythology} />
          <DeityCategoryBadge category={deity.category} />
        </div>
        <h2>{deity.name}</h2>
        {deity.alternativeNames?.length ? (
          <p className="deity-alt">Também: {deity.alternativeNames.join(", ")}</p>
        ) : null}
        <p className="deity-title">{deity.title}</p>
        <p>{deity.shortDescription}</p>
        <div className="deity-chip-list" aria-label="Domínios e símbolos principais">
          {[...deity.domains.slice(0, 4), ...deity.symbols.slice(0, 3)].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
        <div className="card-actions">
          <button className={`button secondary compact ${favorite ? "active" : ""}`} onClick={onFavorite}>
            <Heart size={16} /> Favoritar
          </button>
          <button className={`button secondary compact ${studied ? "active" : ""}`} onClick={onStudied}>
            <CheckCircle2 size={16} /> {studied ? "Lida" : "Marcar como lida"}
          </button>
          <button className="button secondary compact" onClick={onCopyLink}>
            <Copy size={16} /> Copiar link
          </button>
        </div>
      </div>
    </header>
  );
}
