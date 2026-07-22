import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResilientImage } from "./ResilientImage";

afterEach(() => cleanup());

describe("ResilientImage", () => {
  it("tenta a próxima imagem quando a primeira quebra", () => {
    render(
      <ResilientImage
        sources={["/primeira.jpg", "/segunda.jpg"]}
        alt="Imagem histórica"
        fallback={<div>Imagem indisponível</div>}
      />
    );

    const imagem = screen.getByAltText("Imagem histórica") as HTMLImageElement;
    expect(imagem.src).toContain("/primeira.jpg");

    fireEvent.error(imagem);

    expect((screen.getByAltText("Imagem histórica") as HTMLImageElement).src).toContain("/segunda.jpg");
  });

  it("mostra fallback quando todas as imagens quebram", () => {
    render(
      <ResilientImage sources={["/unica.jpg"]} alt="Imagem histórica" fallback={<div>Imagem indisponível</div>} />
    );

    fireEvent.error(screen.getByAltText("Imagem histórica"));

    expect(screen.getByText("Imagem indisponível")).toBeInTheDocument();
  });
});
