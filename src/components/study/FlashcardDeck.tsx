import { useState } from "react";
import { flashcards } from "../../data/studyTools";

export function FlashcardDeck() {
  const [flashcardAtual, setFlashcardAtual] = useState(0);
  const [flashcardVirado, setFlashcardVirado] = useState(false);
  const flashcard = flashcards[flashcardAtual % flashcards.length];

  const avancar = () => {
    setFlashcardAtual((atual) => (atual + 1) % flashcards.length);
    setFlashcardVirado(false);
  };

  return (
    <article className={`flashcard ${flashcardVirado ? "flipped" : ""}`}>
      <span>{flashcard.categoria}</span>
      <h3>{flashcardVirado ? flashcard.verso : flashcard.frente}</h3>
      <div className="review-actions">
        <button className="button primary" onClick={() => setFlashcardVirado((valor) => !valor)}>
          {flashcardVirado ? "Ver frente" : "Mostrar verso"}
        </button>
        <button className="button secondary" onClick={avancar}>
          Próximo cartão
        </button>
      </div>
      <small>
        {flashcardAtual + 1} de {flashcards.length}
      </small>
    </article>
  );
}
