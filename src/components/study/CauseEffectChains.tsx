import { cadeiasHistoricas } from "../../data/studyTools";
import { useAppContext } from "../../hooks/useAppContext";
import { eventosPorId } from "../../services/historyCatalog";

export function CauseEffectChains() {
  const { abrirEvento } = useAppContext();

  return (
    <div className="cause-grid">
      {cadeiasHistoricas.map((cadeia) => (
        <article className="cause-card" key={cadeia.id}>
          <h3>{cadeia.titulo}</h3>
          <p>{cadeia.explicacao}</p>
          <div className="cause-flow">
            {cadeia.eventos.map((id) => {
              const evento = eventosPorId.get(id);
              if (!evento) return null;
              return (
                <button key={id} onClick={() => abrirEvento(evento)}>
                  <span>{evento.ano}</span>
                  <strong>{evento.titulo}</strong>
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
