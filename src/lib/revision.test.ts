import { describe, expect, it } from "vitest";
import { percentualAcerto, registrarRespostaRevisao, revisaoStatsInicial, temasOrdenadosPorRevisao } from "./revision";

describe("pontuação de revisão", () => {
  it("registra acertos, erros e dificuldade no total e por tema", () => {
    const depoisDoAcerto = registrarRespostaRevisao(revisaoStatsInicial, "Grécia Antiga", "acerto");
    const depoisDoErro = registrarRespostaRevisao(depoisDoAcerto, "Grécia Antiga", "erro");
    const final = registrarRespostaRevisao(depoisDoErro, "Roma Antiga", "dificil");

    expect(final.total).toBe(3);
    expect(final.acertos).toBe(1);
    expect(final.erros).toBe(1);
    expect(final.dificil).toBe(1);
    expect(final.porTema["Grécia Antiga"]).toEqual({ total: 2, acertos: 1, erros: 1, dificil: 0 });
    expect(final.porTema["Roma Antiga"]).toEqual({ total: 1, acertos: 0, erros: 0, dificil: 1 });
  });

  it("calcula porcentagem de acerto por tema", () => {
    const stats = registrarRespostaRevisao(
      registrarRespostaRevisao(revisaoStatsInicial, "Segunda Guerra Mundial", "acerto"),
      "Segunda Guerra Mundial",
      "erro"
    );

    expect(percentualAcerto(stats.porTema["Segunda Guerra Mundial"])).toBe(50);
  });

  it("ordena temas mais revisados primeiro", () => {
    const stats = registrarRespostaRevisao(
      registrarRespostaRevisao(
        registrarRespostaRevisao(revisaoStatsInicial, "Roma Antiga", "acerto"),
        "Grécia Antiga",
        "erro"
      ),
      "Grécia Antiga",
      "acerto"
    );

    expect(temasOrdenadosPorRevisao(stats).map((item) => item.tema)).toEqual(["Grécia Antiga", "Roma Antiga"]);
  });
});
