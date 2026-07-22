import { Heart } from "lucide-react";
import { ResilientImage } from "../ResilientImage";
import { fontesPersonagem, imagem } from "../../services/historyCatalog";
import type { Personagem } from "../../types";

export function CharacterCard({
  personagem,
  favorito,
  onFavorito
}: {
  personagem: Personagem;
  favorito: boolean;
  onFavorito: () => void;
}) {
  return (
    <article className="person-card">
      <CharacterImage personagem={personagem} />
      <div className="person-content">
        <div>
          <h3>{personagem.nome}</h3>
          <p>
            {personagem.periodo} - {personagem.origem}
          </p>
        </div>
        <p>
          <strong>Ocupação:</strong> {personagem.ocupacao}
        </p>
        <p>
          <strong>Feitos:</strong> {personagem.feitos}
        </p>
        <p>
          <strong>Impacto:</strong> {personagem.impacto}
        </p>
        <p>
          <strong>Curiosidade:</strong> {personagem.curiosidade}
        </p>
        <button className={`button secondary compact ${favorito ? "active" : ""}`} onClick={onFavorito}>
          <Heart size={16} /> Favoritar
        </button>
      </div>
    </article>
  );
}

function CharacterImage({ personagem }: { personagem: Personagem }) {
  const fontes = fontesPersonagem(personagem).map((source) => imagem(source));
  const iniciais = personagem.nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");

  return (
    <ResilientImage
      sources={fontes}
      alt={`Imagem de ${personagem.nome}`}
      fallback={
        <div className="person-placeholder" role="img" aria-label={`Imagem indisponível para ${personagem.nome}`}>
          <span>{iniciais}</span>
          <strong>{personagem.nome}</strong>
          <small>Imagem específica indisponível</small>
        </div>
      }
    />
  );
}
