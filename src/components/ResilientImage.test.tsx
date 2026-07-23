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

  it("normaliza caminho public/assets e aplica atributos de imagem", () => {
    render(
      <ResilientImage
        sources={["public/assets/images/partenon.jpg"]}
        alt="Partenon"
        objectFit="contain"
        objectPosition="center top"
        fallback={<div>Imagem indisponível</div>}
      />
    );

    const imagem = screen.getByAltText("Partenon") as HTMLImageElement;
    expect(imagem.getAttribute("src")).toBe("/assets/images/partenon.jpg");
    expect(imagem.getAttribute("decoding")).toBe("async");
    expect(imagem.style.objectFit).toBe("contain");
    expect(imagem.style.objectPosition).toBe("center top");
  });

  it("não entra em loop quando a última fonte falha", () => {
    render(<ResilientImage sources={["/quebrada.jpg"]} alt="Imagem" fallback={<div>Fallback final</div>} />);

    fireEvent.error(screen.getByAltText("Imagem"));
    expect(screen.getByText("Fallback final")).toBeInTheDocument();
    expect(screen.queryByAltText("Imagem")).not.toBeInTheDocument();
  });
});
