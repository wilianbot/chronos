import { describe, expect, it } from "vitest";
import { FALLBACK_IMAGE_SRC, isLocalAssetImageSrc, isRemoteImageSrc, normalizeImageSrc } from "./images";

describe("normalização de imagens", () => {
  it("usa fallback quando o caminho está vazio", () => {
    expect(normalizeImageSrc()).toBe(FALLBACK_IMAGE_SRC);
    expect(normalizeImageSrc("  ")).toBe(FALLBACK_IMAGE_SRC);
  });

  it("preserva URLs remotas", () => {
    expect(normalizeImageSrc("https://example.com/imagem.jpg")).toBe("https://example.com/imagem.jpg");
    expect(isRemoteImageSrc("http://example.com/imagem.jpg")).toBe(true);
  });

  it("converte public/assets para caminho público do Vite", () => {
    expect(normalizeImageSrc("public/assets/images/partenon.jpg")).toBe("/assets/images/partenon.jpg");
  });

  it("adiciona barra inicial em assets locais e normaliza barras duplicadas", () => {
    expect(normalizeImageSrc("assets//images\\partenon.jpg")).toBe("/assets/images/partenon.jpg");
    expect(isLocalAssetImageSrc("assets/images/partenon.jpg")).toBe(true);
  });
});
