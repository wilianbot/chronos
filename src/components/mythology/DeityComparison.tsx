import { Link } from "react-router-dom";
import { deityComparisons } from "../../data/mythology";
import { getDeityById } from "../../services/mythologyService";

export function DeityComparison() {
  return (
    <div className="deity-comparison">
      {deityComparisons.map((comparison) => {
        const greek = getDeityById(comparison.greekId);
        const roman = getDeityById(comparison.romanId);
        if (!greek || !roman) return null;
        return (
          <article key={`${comparison.greekId}-${comparison.romanId}`}>
            <header>
              <h3>
                <Link to={`/deuses/${greek.id}`}>{greek.name}</Link> e{" "}
                <Link to={`/deuses/${roman.id}`}>{roman.name}</Link>
              </h3>
              <p>Correspondência cultural aproximada, não identidade absoluta.</p>
            </header>
            <dl>
              <div>
                <dt>Origem</dt>
                <dd>{comparison.origin}</dd>
              </div>
              <div>
                <dt>Domínio</dt>
                <dd>{comparison.domains}</dd>
              </div>
              <div>
                <dt>Culto</dt>
                <dd>{comparison.worship}</dd>
              </div>
              <div>
                <dt>Diferenças</dt>
                <dd>{comparison.differences}</dd>
              </div>
            </dl>
          </article>
        );
      })}
    </div>
  );
}
