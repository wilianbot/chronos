import { describe, expect, it } from "vitest";
import type { Acontecimento } from "../types";
import { calcularProgressoPorPeriodo, filtrarEventos, ordenarEventos, validarEventosDuplicados } from "./history";

function evento(parcial: Partial<Acontecimento>): Acontecimento {
  return {
    id: parcial.id || "evento",
    ano: parcial.ano || "1 d.C.",
    anoOrdenacao: parcial.anoOrdenacao ?? 1,
    titulo: parcial.titulo || "Evento",
    periodo: parcial.periodo || "Roma Antiga",
    civilizacao: parcial.civilizacao || "Roma",
    categoria: parcial.categoria || "politica",
    resumo: parcial.resumo || "Resumo",
    descricao: parcial.descricao || "Descrição",
    contexto: parcial.contexto || "Contexto",
    personagens: parcial.personagens || [],
    causas: parcial.causas || [],
    consequencias: parcial.consequencias || [],
    curiosidades: parcial.curiosidades || [],
    legado: parcial.legado || "Legado",
    imagem: parcial.imagem || "assets/images/mapa-placeholder.svg",
    alt: parcial.alt || "Imagem",
    creditoImagem: parcial.creditoImagem || "Crédito",
    tipoFonte: parcial.tipoFonte || "História documentada"
  };
}

describe("lógica histórica", () => {
  it("ordena datas a.C. antes de d.C. usando anoOrdenacao", () => {
    const eventos = [
      evento({ id: "augusto", ano: "27 d.C.", anoOrdenacao: 27 }),
      evento({ id: "maratona", ano: "490 a.C.", anoOrdenacao: -490 }),
      evento({ id: "cesar", ano: "44 a.C.", anoOrdenacao: -44 })
    ];

    expect(ordenarEventos(eventos).map((item) => item.id)).toEqual(["maratona", "cesar", "augusto"]);
  });

  it("filtra combinando busca, período, civilização e categoria", () => {
    const eventos = [
      evento({
        id: "maratona",
        titulo: "Batalha de Maratona",
        periodo: "Grécia Antiga",
        civilizacao: "Atenas",
        categoria: "guerra",
        personagens: ["Milcíades"]
      }),
      evento({
        id: "socrates",
        titulo: "Sócrates",
        periodo: "Grécia Antiga",
        civilizacao: "Atenas",
        categoria: "filosofia",
        personagens: ["Sócrates"]
      }),
      evento({
        id: "augusto",
        titulo: "Augusto",
        periodo: "Roma Antiga",
        civilizacao: "Roma",
        categoria: "política",
        personagens: ["Augusto"]
      })
    ];

    expect(
      filtrarEventos(eventos, {
        busca: "milciades",
        periodo: "Grécia Antiga",
        civilizacao: "Atenas",
        categoria: "guerra"
      }).map((item) => item.id)
    ).toEqual(["maratona"]);
  });

  it("detecta eventos duplicados pelo id", () => {
    const eventos = [evento({ id: "roma" }), evento({ id: "grecia" }), evento({ id: "roma" })];

    expect(validarEventosDuplicados(eventos)).toEqual(["roma"]);
  });

  it("calcula porcentagem estudada por período", () => {
    const eventos = [
      evento({ id: "a", periodo: "Grécia Antiga" }),
      evento({ id: "b", periodo: "Grécia Antiga" }),
      evento({ id: "c", periodo: "Roma Antiga" })
    ];

    const progresso = calcularProgressoPorPeriodo(["Grécia Antiga", "Roma Antiga"], eventos, new Set(["a"]));

    expect(progresso["Grécia Antiga"]).toEqual({ total: 2, feitos: 1, percentual: 50 });
    expect(progresso["Roma Antiga"]).toEqual({ total: 1, feitos: 0, percentual: 0 });
  });
});
