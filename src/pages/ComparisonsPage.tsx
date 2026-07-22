import { useState } from "react";
import { comparadoresMap } from "../services/historyCatalog";
import { FilterSelect } from "../components/common/Ui";
import type { ComparadorCivilizacao } from "../types";

export function ComparisonsPage() {
  const [comparacaoA, setComparacaoA] = useState("Atenas");
  const [comparacaoB, setComparacaoB] = useState("Esparta");
  const opcoesComparacao = Object.keys(comparadoresMap);

  return (
    <section className="section compare-section route-section">
      <div className="section-title">
        <span className="eyebrow">Comparador</span>
        <h2>Civilizações lado a lado</h2>
      </div>
      <div className="compare-controls">
        <FilterSelect
          label="Primeira civilização"
          value={comparacaoA}
          onChange={setComparacaoA}
          options={opcoesComparacao}
        />
        <FilterSelect
          label="Segunda civilização"
          value={comparacaoB}
          onChange={setComparacaoB}
          options={opcoesComparacao}
        />
      </div>
      <div className="compare-grid">
        <ComparisonCard nome={comparacaoA} dados={comparadoresMap[comparacaoA]} />
        <ComparisonCard nome={comparacaoB} dados={comparadoresMap[comparacaoB]} />
      </div>
    </section>
  );
}

function ComparisonCard({ nome, dados }: { nome: string; dados: ComparadorCivilizacao }) {
  return (
    <article className="compare-card">
      <h3>{nome}</h3>
      {Object.entries(dados).map(([chave, valor]) => (
        <p key={chave}>
          <strong>{chave}:</strong> {valor}
        </p>
      ))}
    </article>
  );
}
