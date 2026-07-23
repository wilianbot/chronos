import type { Deity } from "../../types/mythology";
import { EmptyState } from "../common/StateViews";
import { DeityCard } from "./DeityCard";

export function DeityGrid({
  deities,
  favorites,
  onFavorite
}: {
  deities: Deity[];
  favorites: Set<string>;
  onFavorite: (id: string) => void;
}) {
  if (!deities.length) {
    return <EmptyState title="Nenhuma divindade encontrada" text="Ajuste a busca ou combine filtros diferentes." />;
  }

  return (
    <div className="deity-catalog-grid">
      {deities.map((deity) => (
        <DeityCard
          key={deity.id}
          deity={deity}
          favorite={favorites.has(deity.id)}
          onFavorite={() => onFavorite(deity.id)}
        />
      ))}
    </div>
  );
}
