import { Link, useParams } from "react-router-dom";
import { deusesGregos, personagens } from "../data/generated";
import { CauseEffectChains } from "../components/study/CauseEffectChains";
import { FlashcardDeck } from "../components/study/FlashcardDeck";
import { Glossary } from "../components/study/Glossary";
import { GuidedJourneys } from "../components/study/GuidedJourneys";
import { QuickReview } from "../components/study/QuickReview";
import { CharacterCard } from "../components/characters/CharacterCard";
import { GodCard } from "../components/mythology/GodCard";
import { TimelineEventCard } from "../components/timeline/TimelineEventCard";
import { EmptyState } from "../components/common/StateViews";
import { useAppContext } from "../hooks/useAppContext";
import { eventosPorId } from "../services/historyCatalog";

export function JourneysPage() {
  return (
    <>
      <section className="section route-section">
        <div className="section-title">
          <span className="eyebrow">Percursos prontos</span>
          <h2>Jornadas guiadas</h2>
        </div>
        <GuidedJourneys />
      </section>
      <section className="section cause-section">
        <div className="section-title">
          <span className="eyebrow">Causas e consequências</span>
          <h2>Como os acontecimentos se conectam</h2>
        </div>
        <CauseEffectChains />
      </section>
    </>
  );
}

export function ReviewPage() {
  return (
    <section className="section review-section route-section">
      <div className="section-title">
        <span className="eyebrow">Revisão rápida</span>
        <h2>Uma pergunta por vez</h2>
      </div>
      <QuickReview />
    </section>
  );
}

export function FlashcardsPage() {
  return (
    <section className="section study-section route-section">
      <div className="section-title">
        <span className="eyebrow">Memorização</span>
        <h2>Flashcards</h2>
      </div>
      <div className="study-grid single-study">
        <FlashcardDeck />
      </div>
    </section>
  );
}

export function GlossaryPage() {
  return (
    <section className="section study-section route-section">
      <div className="section-title">
        <span className="eyebrow">Conceitos</span>
        <h2>Glossário histórico</h2>
      </div>
      <Glossary />
    </section>
  );
}

export function FavoritesPage() {
  const { favoritos, estudados, abrirEvento, alternarFavorito, alternarEstudado } = useAppContext();
  const eventosFavoritos = [...favoritos].map((id) => eventosPorId.get(id)).filter(Boolean);
  const personagensFavoritos = personagens.filter((personagem) => favoritos.has(personagem.id));

  return (
    <section className="section route-section">
      <div className="section-title">
        <span className="eyebrow">Favoritos</span>
        <h2>Eventos e personagens favoritos</h2>
      </div>
      {eventosFavoritos.length || personagensFavoritos.length ? (
        <>
          <div className="timeline-list">
            {eventosFavoritos.map((evento) => (
              <TimelineEventCard
                key={evento!.id}
                evento={evento!}
                favorito
                estudado={estudados.has(evento!.id)}
                onAbrir={() => abrirEvento(evento!)}
                onFavorito={() => alternarFavorito(evento!.id)}
                onEstudado={() => alternarEstudado(evento!.id)}
              />
            ))}
          </div>
          <div className="people-grid">
            {personagensFavoritos.map((personagem) => (
              <CharacterCard
                key={personagem.id}
                personagem={personagem}
                favorito
                onFavorito={() => alternarFavorito(personagem.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState title="Nenhum favorito" text="Favorite eventos ou personagens para encontrá-los aqui." />
      )}
    </section>
  );
}

export function ProgressPage() {
  const { progressoPorPeriodo, estudados, revisaoStats, temasRevisao } = useAppContext();
  return (
    <section className="section route-section">
      <div className="section-title">
        <span className="eyebrow">Progresso</span>
        <h2>Estudo salvo neste navegador</h2>
      </div>
      <div className="stats-grid">
        <article className="stat">
          <strong>{estudados.size}</strong>
          <span>acontecimentos estudados</span>
        </article>
        <article className="stat">
          <strong>{revisaoStats.acertos}</strong>
          <span>acertos na revisão</span>
        </article>
        <article className="stat">
          <strong>{revisaoStats.dificil}</strong>
          <span>itens difíceis</span>
        </article>
        <article className="stat">
          <strong>{revisaoStats.erros}</strong>
          <span>erros</span>
        </article>
      </div>
      <div className="period-grid">
        {Object.entries(progressoPorPeriodo).map(([nome, dados]) => (
          <article className="mini-card" key={nome}>
            <h3>{nome}</h3>
            <p>
              {dados.percentual}% estudado ({dados.feitos}/{dados.total})
            </p>
            <div className="progress-line">
              <i style={{ width: `${dados.percentual}%` }} />
            </div>
          </article>
        ))}
      </div>
      <div className="review-topic-grid">
        {temasRevisao.map((tema) => (
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
        ))}
      </div>
    </section>
  );
}

export function EventDetailPage() {
  const { id } = useParams();
  const { abrirEvento } = useAppContext();
  const evento = id ? eventosPorId.get(id) : undefined;

  if (!evento) return <NotFoundInline />;
  return (
    <section className="section route-section">
      <div className="section-title">
        <span className="eyebrow">{evento.ano}</span>
        <h2>{evento.titulo}</h2>
        <p>{evento.descricao}</p>
      </div>
      <button className="button primary" onClick={() => abrirEvento(evento)}>
        Abrir detalhes completos
      </button>
    </section>
  );
}

export function CharacterDetailPage() {
  const { id } = useParams();
  const { favoritos, alternarFavorito } = useAppContext();
  const personagem = personagens.find((item) => item.id === id);
  if (!personagem) return <NotFoundInline />;
  return (
    <section className="section route-section">
      <CharacterCard
        personagem={personagem}
        favorito={favoritos.has(personagem.id)}
        onFavorito={() => alternarFavorito(personagem.id)}
      />
    </section>
  );
}

export function GodDetailPage() {
  const { id } = useParams();
  const deus = deusesGregos.find((item) => item.nome.toLowerCase() === id?.toLowerCase());
  if (!deus) return <NotFoundInline />;
  return (
    <section className="section route-section">
      <GodCard deus={deus} />
    </section>
  );
}

export function NotFoundPage() {
  return <NotFoundInline />;
}

function NotFoundInline() {
  return (
    <section className="section route-section">
      <EmptyState title="Página não encontrada" text="O conteúdo solicitado não existe ou foi movido." />
      <Link className="button primary" to="/">
        Voltar ao início
      </Link>
    </section>
  );
}
