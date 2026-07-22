import { personagens } from "../data/generated";
import { useAppContext } from "../hooks/useAppContext";
import { CharacterCard } from "../components/characters/CharacterCard";

export function CharactersPage() {
  const { favoritos, alternarFavorito } = useAppContext();

  return (
    <section className="section route-section">
      <div className="section-title">
        <span className="eyebrow">Galeria</span>
        <h2>Grandes personagens</h2>
      </div>
      <div className="people-grid">
        {personagens.map((personagem) => (
          <CharacterCard
            key={personagem.id}
            personagem={personagem}
            favorito={favoritos.has(personagem.id)}
            onFavorito={() => alternarFavorito(personagem.id)}
          />
        ))}
      </div>
    </section>
  );
}
