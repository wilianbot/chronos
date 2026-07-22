import { useNavigate } from "react-router-dom";
import { periodosFiltro } from "../data/generated";
import { useAppContext } from "../hooks/useAppContext";

export function PeriodsPage() {
  const navigate = useNavigate();
  const { progressoPorPeriodo } = useAppContext();

  return (
    <section className="section route-section">
      <div className="section-title">
        <span className="eyebrow">Organização cronológica</span>
        <h2>Períodos históricos</h2>
      </div>
      <div className="period-grid">
        {periodosFiltro.map((nome) => (
          <button key={nome} onClick={() => navigate(`/linha-do-tempo?periodo=${encodeURIComponent(nome)}`)}>
            <strong>{progressoPorPeriodo[nome]?.total || 0}</strong>
            <span>{nome}</span>
            <small>
              {progressoPorPeriodo[nome]?.percentual || 0}% estudado
              {progressoPorPeriodo[nome]?.total
                ? ` (${progressoPorPeriodo[nome].feitos}/${progressoPorPeriodo[nome].total})`
                : ""}
            </small>
          </button>
        ))}
      </div>
    </section>
  );
}
