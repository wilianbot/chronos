import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, MapPinned } from "lucide-react";
import { acontecimentos, personagens } from "../data/generated";
import { jornadasGuiadas } from "../data/studyTools";
import { useAppContext } from "../hooks/useAppContext";
import { eventosOrdenados } from "../services/historyCatalog";
import { Logo } from "../components/brand/Logo";
import { Stat } from "../components/common/Ui";

export function HomePage() {
  const { continuarUltimoEvento, ultimoEventoId, progressoPorPeriodo, favoritos, abrirEvento } = useAppContext();
  const [eventoAleatorio] = useState(
    () => eventosOrdenados[Math.floor((Date.now() / 86400000) % eventosOrdenados.length)]
  );
  const favoritosRecentes = [...favoritos].slice(-4).reverse();
  const progressoGeral = Math.round(
    (Object.values(progressoPorPeriodo).reduce((acc, item) => acc + item.feitos, 0) / acontecimentos.length) * 100
  );

  return (
    <>
      <section className="hero dashboard-hero">
        <div className="hero-copy">
          <span className="eyebrow">Plataforma educacional de História</span>
          <h1>
            <Logo />
          </h1>
          <p>
            Explore o passado. Entenda o presente. Estude Antiguidade, Grécia, Roma, Idade Média, modernidade e
            guerras mundiais em módulos visuais, com favoritos, progresso local e revisão.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/linha-do-tempo">
              <BookOpen size={18} /> Começar a jornada
            </Link>
            <button className="button secondary" onClick={continuarUltimoEvento} disabled={!ultimoEventoId}>
              <MapPinned size={18} /> Continuar de onde parei
            </button>
          </div>
          <p className="legacy-line">
            Civilizações surgem, crescem, entram em conflito e deixam rastros que ainda estudamos.
          </p>
        </div>
        <figure className="hero-art dashboard-hero-art">
          <img
            src="/assets/images/acropole-atenas.jpg"
            alt="Vista da Acrópole de Atenas, com ruínas clássicas gregas"
            loading="eager"
          />
          <figcaption className="hero-art-card">
            <span>Imagem histórica</span>
            Acrópole de Atenas como ponto visual de partida para explorar civilizações, conflitos e legados.
          </figcaption>
        </figure>
      </section>

      <section className="stats-grid" aria-label="Indicadores do acervo">
        <Stat label="Acontecimentos" value={acontecimentos.length} />
        <Stat label="Personagens" value={personagens.length} />
        <Stat label="Progresso geral" value={`${progressoGeral}%`} />
        <Stat
          label="Período coberto"
          value={`${eventosOrdenados[0].ano} até ${eventosOrdenados[eventosOrdenados.length - 1]?.ano}`}
          small
        />
      </section>

      <section className="section dashboard-grid">
        <article className="mini-card">
          <span className="eyebrow">Jornada recomendada</span>
          <h2>{jornadasGuiadas[0].titulo}</h2>
          <p>{jornadasGuiadas[0].objetivo}</p>
          <Link className="button primary compact" to="/jornadas">
            Abrir jornadas
          </Link>
        </article>
        <article className="mini-card">
          <span className="eyebrow">Evento do dia</span>
          <h2>{eventoAleatorio.titulo}</h2>
          <p>
            {eventoAleatorio.ano} - {eventoAleatorio.resumo}
          </p>
          <button className="button secondary compact" onClick={() => abrirEvento(eventoAleatorio)}>
            Ver detalhes
          </button>
        </article>
        <article className="mini-card">
          <span className="eyebrow">Acessos rápidos</span>
          <div className="quick-links">
            <Link to="/linha-do-tempo">Linha do tempo</Link>
            <Link to="/personagens">Personagens</Link>
            <Link to="/mitologia">Mitologia</Link>
            <Link to="/mapas">Mapas</Link>
            <Link to="/revisao">Revisão</Link>
          </div>
        </article>
        <article className="mini-card">
          <span className="eyebrow">Últimos favoritos</span>
          {favoritosRecentes.length ? (
            <ul>
              {favoritosRecentes.map((id) => (
                <li key={id}>{id}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhum favorito salvo ainda.</p>
          )}
          <Link className="button secondary compact" to="/favoritos">
            Ver favoritos
          </Link>
        </article>
      </section>
    </>
  );
}
