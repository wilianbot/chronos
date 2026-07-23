import { CheckCircle2, Copy, Heart, Share2, X } from "lucide-react";
import { eventosOrdenados, fontesEvento, fontesHistoricas, imagem } from "../../services/historyCatalog";
import { References } from "../common/Ui";
import { ResilientImage } from "../ResilientImage";
import type { Acontecimento } from "../../types";

export function EventModal({
  evento,
  favorito,
  estudado,
  onFechar,
  onFavorito,
  onEstudado,
  onCompartilhar,
  onCopiar
}: {
  evento: Acontecimento;
  favorito: boolean;
  estudado: boolean;
  onFechar: () => void;
  onFavorito: () => void;
  onEstudado: () => void;
  onCompartilhar: () => void;
  onCopiar: () => void;
}) {
  const index = eventosOrdenados.findIndex((item) => item.id === evento.id);
  const anterior = eventosOrdenados[index - 1];
  const posterior = eventosOrdenados[index + 1];

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={onFechar}
    >
      <article className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onFechar} aria-label="Fechar detalhes">
          <X size={20} />
        </button>
        <ResilientImage
          className="modal-image"
          sources={fontesEvento(evento).map((source) => imagem(source))}
          alt={evento.alt || evento.titulo}
          loading="eager"
          fallback={
            <div
              className="modal-image modal-image-fallback"
              role="img"
              aria-label={`Imagem indisponível para ${evento.titulo}`}
            >
              <strong>{evento.ano}</strong>
              <span>{evento.titulo}</span>
            </div>
          }
        />
        <div className="modal-content">
          <div className="event-meta">
            <span>{evento.ano}</span>
            <span>{evento.periodo}</span>
            <span>{evento.civilizacao}</span>
            <span>{evento.tipoFonte}</span>
          </div>
          <h2 id="modal-title">{evento.titulo}</h2>
          <p className="lead">{evento.descricao}</p>
          <div className="modal-actions">
            <button className={`button secondary ${favorito ? "active" : ""}`} onClick={onFavorito}>
              <Heart size={18} /> Favorito
            </button>
            <button className={`button secondary ${estudado ? "active" : ""}`} onClick={onEstudado}>
              <CheckCircle2 size={18} /> Estudado
            </button>
            <button className="button secondary" onClick={onCompartilhar}>
              <Share2 size={18} /> Compartilhar
            </button>
            <button className="button secondary" onClick={onCopiar}>
              <Copy size={18} /> Copiar resumo
            </button>
          </div>
          <div className="detail-grid">
            <Info title="Contexto" text={evento.contexto} />
            <List title="Causas" items={evento.causas} />
            <List title="Consequências e legado" items={[...evento.consequencias, evento.legado]} />
            <List
              title="Curiosidades"
              items={
                evento.curiosidades.length
                  ? evento.curiosidades
                  : ["Observe o tipo de fonte para distinguir história documentada, tradição, lenda e mito."]
              }
            />
            <Info
              title="Personagens envolvidos"
              text={evento.personagens.length ? evento.personagens.join(", ") : "Sem personagem individual destacado."}
            />
            <References title="Fontes de estudo" sources={fontesHistoricas(evento)} />
            <ImageCredit evento={evento} />
          </div>
          <div className="relation">
            {anterior && (
              <span>
                <strong>Antes:</strong> {anterior.ano} - {anterior.titulo}
              </span>
            )}
            {posterior && (
              <span>
                <strong>Depois:</strong> {posterior.ano} - {posterior.titulo}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h3>{title}</h3>
      <p>{text}</p>
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ImageCredit({ evento }: { evento: Acontecimento }) {
  const isRemote = evento.imagem.startsWith("http");
  return (
    <section>
      <h3>Imagem</h3>
      <p>{evento.creditoImagem}</p>
      {isRemote && (
        <p>
          <a href={evento.imagem} target="_blank" rel="noreferrer">
            Abrir fonte da imagem
          </a>
        </p>
      )}
    </section>
  );
}
