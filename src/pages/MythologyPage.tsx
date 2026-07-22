import { deusesGregos } from "../data/generated";
import { GodCard } from "../components/mythology/GodCard";
import { GodsFamilyTree } from "../components/mythology/GodsFamilyTree";

export function MythologyPage() {
  return (
    <>
      <section className="section route-section">
        <div className="section-title">
          <span className="eyebrow">Mitologia e religião</span>
          <h2>Deuses gregos e equivalentes romanos</h2>
        </div>
        <div className="deity-grid">
          {deusesGregos.map((deus) => (
            <GodCard deus={deus} key={deus.nome} />
          ))}
        </div>
      </section>
      <section className="section deity-tree-section">
        <div className="section-title">
          <span className="eyebrow">Mitologia organizada</span>
          <h2>Árvore genealógica dos deuses</h2>
          <p>Diagrama simplificado para memorizar parentescos centrais da tradição grega.</p>
        </div>
        <GodsFamilyTree />
      </section>
    </>
  );
}
