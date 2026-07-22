import { Sparkles } from "lucide-react";
import { useAppContext } from "../../hooks/useAppContext";

export function QuickReview() {
  const {
    revisao,
    mostrarResposta,
    setMostrarResposta,
    percentualGeralRevisao,
    revisaoStats,
    responderRevisao,
    proximaRevisao,
    temasRevisao,
    revisados
  } = useAppContext();

  return (
    <article className="review-card">
      <span>
        {revisao.tipo} - {revisao.tema}
      </span>
      <h3>{revisao.pergunta}</h3>
      {mostrarResposta && <p>{revisao.resposta}</p>}
      <div className="review-score">
        <div>
          <strong>{percentualGeralRevisao}%</strong>
          <span>acerto geral</span>
        </div>
        <div>
          <strong>{revisaoStats.acertos}</strong>
          <span>acertos</span>
        </div>
        <div>
          <strong>{revisaoStats.dificil}</strong>
          <span>difíceis</span>
        </div>
        <div>
          <strong>{revisaoStats.erros}</strong>
          <span>erros</span>
        </div>
      </div>
      <div className="review-actions">
        <button className="button secondary" onClick={() => setMostrarResposta((valor) => !valor)}>
          <Sparkles size={18} /> {mostrarResposta ? "Ocultar resposta" : "Mostrar resposta"}
        </button>
        <button className="button secondary" onClick={() => responderRevisao("erro")}>
          Errei
        </button>
        <button className="button secondary" onClick={() => responderRevisao("dificil")}>
          Difícil
        </button>
        <button className="button primary" onClick={() => responderRevisao("acerto")}>
          Acertei
        </button>
        <button className="button secondary" onClick={proximaRevisao}>
          Próxima pergunta
        </button>
      </div>
      <div className="review-topic-grid" aria-label="Porcentagem por tema dentro da revisão">
        {temasRevisao.length ? (
          temasRevisao.slice(0, 8).map((tema) => (
            <div key={tema.tema}>
              <span>{tema.tema}</span>
              <strong>{tema.percentual}%</strong>
              <small>
                {tema.acertos}/{tema.total} acertos
              </small>
              <i>
                <b style={{ width: `${tema.percentual}%` }} />
              </i>
            </div>
          ))
        ) : (
          <p>Responda uma pergunta para gerar porcentagem por tema.</p>
        )}
      </div>
      <small>{revisados.size} itens revisados salvos neste navegador.</small>
    </article>
  );
}
