import { useAppContext } from "../../hooks/useAppContext";
import { useGuidedJourneys } from "../../hooks/useGuidedJourneys";

export function GuidedJourneys() {
  const { abrirEvento } = useAppContext();
  const {
    jornadasGuiadas,
    jornadaAtiva,
    eventosDaJornada,
    capituloAtual,
    capituloJornada,
    setCapituloJornada,
    selecionarJornada
  } = useGuidedJourneys();

  return (
    <div className="guided-layout">
      <div className="journey-list" role="tablist" aria-label="Jornadas de estudo">
        {jornadasGuiadas.map((jornada) => (
          <button
            key={jornada.id}
            className={jornada.id === jornadaAtiva.id ? "selected" : ""}
            onClick={() => selecionarJornada(jornada.id)}
            role="tab"
            aria-selected={jornada.id === jornadaAtiva.id}
          >
            <strong>{jornada.titulo}</strong>
            <span>{jornada.resumo}</span>
            <small>{jornada.eventos.length} capítulos</small>
          </button>
        ))}
      </div>
      <article className="journey-panel">
        <span className="eyebrow">Jornada ativa</span>
        <h3>{jornadaAtiva.titulo}</h3>
        <p>{jornadaAtiva.objetivo}</p>
        {capituloAtual && (
          <div className="journey-current">
            <small>
              Capítulo {Math.min(capituloJornada + 1, eventosDaJornada.length)} de {eventosDaJornada.length}
            </small>
            <strong>
              {capituloAtual.ano} - {capituloAtual.titulo}
            </strong>
            <p>{capituloAtual.resumo}</p>
            <div className="review-actions">
              <button className="button primary" onClick={() => abrirEvento(capituloAtual)}>
                Abrir capítulo
              </button>
              <button className="button secondary" onClick={() => setCapituloJornada(Math.max(0, capituloJornada - 1))}>
                Anterior
              </button>
              <button
                className="button secondary"
                onClick={() => setCapituloJornada(Math.min(eventosDaJornada.length - 1, capituloJornada + 1))}
              >
                Próximo capítulo
              </button>
            </div>
          </div>
        )}
        <ol className="journey-steps">
          {eventosDaJornada.map((evento, index) => (
            <li key={evento.id} className={index === capituloJornada ? "active" : ""}>
              <button onClick={() => setCapituloJornada(index)}>
                <span>{evento.ano}</span>
                <strong>{evento.titulo}</strong>
              </button>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
