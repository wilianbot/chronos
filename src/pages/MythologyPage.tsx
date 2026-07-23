import { DeityComparison } from "../components/mythology/DeityComparison";
import { DeityGrid } from "../components/mythology/DeityGrid";
import { MythologyFamilyTree } from "../components/mythology/MythologyFamilyTree";
import { MythologyFilters } from "../components/mythology/MythologyFilters";
import { availableDeityMythologies } from "../services/mythologyService";
import { useAppContext } from "../hooks/useAppContext";
import { useMythologyFilters } from "../hooks/useMythologyFilters";
import type { MythologyId } from "../types/mythology";

export function MythologyPage() {
  const { favoritos, alternarFavorito } = useAppContext();
  const { filters, deities, updateFilter, resetFilters } = useMythologyFilters();
  const selectedTree =
    filters.mythology && filters.mythology !== "todas"
      ? filters.mythology
      : availableDeityMythologies[0]?.id || "grega";

  return (
    <>
      <section className="section route-section mythology-hero-section">
        <div className="section-title mythology-title">
          <span className="eyebrow">Mitologia e religião antiga</span>
          <h2>Catálogo de divindades</h2>
          <p>
            Explore divindades gregas e romanas como tradições religiosas e culturais antigas. As correspondências entre
            mitologias são aproximações históricas, não equivalências absolutas.
          </p>
        </div>
        <MythologyFilters filters={filters} onChange={updateFilter} onReset={resetFilters} />
        <div className="result-count" aria-live="polite">
          {deities.length} divindade{deities.length === 1 ? "" : "s"} encontrada{deities.length === 1 ? "" : "s"}
        </div>
        <DeityGrid deities={deities} favorites={favoritos} onFavorite={alternarFavorito} />
      </section>

      <section className="section deity-tree-section">
        <div className="section-title">
          <span className="eyebrow">Genealogias míticas</span>
          <h2>Árvore por mitologia</h2>
          <p>
            Use a árvore como mapa didático. Tradições antigas não preservam uma genealogia única e universal para todos
            os autores.
          </p>
        </div>
        <MythologyFamilyTree
          mythology={selectedTree as MythologyId}
          onMythologyChange={(value) => updateFilter("mythology", value)}
        />
      </section>

      <section className="section">
        <div className="section-title">
          <span className="eyebrow">Comparação cultural</span>
          <h2>Gregos e romanos lado a lado</h2>
          <p>
            As comparações mostram semelhanças, diferenças de culto e adaptações romanas. Elas evitam reduzir a religião
            romana a uma simples troca de nomes.
          </p>
        </div>
        <DeityComparison />
      </section>
    </>
  );
}
