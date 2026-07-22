import type { CSSProperties } from "react";
import { CheckCircle2, Heart } from "lucide-react";
import { ResilientImage } from "../ResilientImage";
import { categoriaCores, deveUsarImagemNoCard, imagem } from "../../services/historyCatalog";
import { normalizar } from "../../lib/history";
import type { Acontecimento } from "../../types";

export function TimelineEventCard({
  evento,
  favorito,
  estudado,
  onAbrir,
  onFavorito,
  onEstudado
}: {
  evento: Acontecimento;
  favorito: boolean;
  estudado: boolean;
  onAbrir: () => void;
  onFavorito: () => void;
  onEstudado: () => void;
}) {
  const cor = categoriaCores[normalizar(evento.categoria)] || "#8a6a2f";
  return (
    <article className="event-card" style={{ "--accent": cor } as CSSProperties}>
      <div className="event-year">{evento.ano}</div>
      <EventImage evento={evento} />
      <div className="event-body">
        <div className="event-meta">
          <span>{evento.periodo}</span>
          <span>{evento.categoria}</span>
          <span>{evento.tipoFonte}</span>
        </div>
        <h3>{evento.titulo}</h3>
        <p>{evento.resumo}</p>
        <div className="card-actions">
          <button className="button primary compact" onClick={onAbrir}>
            Ver detalhes
          </button>
          <button className={`icon-button ${favorito ? "active" : ""}`} onClick={onFavorito} aria-label="Favoritar">
            <Heart size={18} />
          </button>
          <button className={`icon-button ${estudado ? "active" : ""}`} onClick={onEstudado} aria-label="Estudado">
            <CheckCircle2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

function EventImage({ evento }: { evento: Acontecimento }) {
  return (
    <ResilientImage
      sources={deveUsarImagemNoCard(evento) ? [imagem(evento.imagem)] : []}
      alt={evento.alt || evento.titulo}
      fallback={<EventPlaceholder evento={evento} />}
    />
  );
}

function EventPlaceholder({ evento }: { evento: Acontecimento }) {
  const etiqueta = evento.tipoFonte.toLowerCase().includes("mito") ? "Mito e tradição" : evento.categoria;
  return (
    <div className="event-placeholder" role="img" aria-label={`Representação textual de ${evento.titulo}`}>
      <span>{evento.ano}</span>
      <strong>{etiqueta}</strong>
      <small>{evento.civilizacao}</small>
    </div>
  );
}
