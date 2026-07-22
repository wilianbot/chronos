import type { DeusGrego } from "../../types";

export function GodCard({ deus }: { deus: DeusGrego }) {
  return (
    <article className="mini-card">
      <span className="symbol">{deus.simbolo}</span>
      <h3>{deus.nome}</h3>
      <p>
        <strong>Domínio:</strong> {deus.dominio}
      </p>
      <p>
        <strong>Parentesco:</strong> {deus.parentesco}
      </p>
      <p>{deus.historia}</p>
      <small className="roman-equivalent">
        <span>Equivalente romano:</span>
        <strong>{deus.romano}</strong>
      </small>
    </article>
  );
}
