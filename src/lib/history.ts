import type { Acontecimento } from "../types";

export type FiltrosEventos = {
  busca?: string;
  periodo?: string;
  civilizacao?: string;
  categoria?: string;
};

export function normalizar(valor: string) {
  return valor
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function ordenarEventos(eventos: Acontecimento[]) {
  return [...eventos].sort((a, b) => a.anoOrdenacao - b.anoOrdenacao);
}

export function textoEvento(evento: Acontecimento) {
  return normalizar(
    [
      evento.titulo,
      evento.resumo,
      evento.descricao,
      evento.periodo,
      evento.civilizacao,
      evento.categoria,
      evento.ano,
      ...evento.personagens
    ].join(" ")
  );
}

export function filtrarEventos(eventos: Acontecimento[], filtros: FiltrosEventos) {
  const termo = normalizar(filtros.busca?.trim() || "");

  return eventos.filter((evento) => {
    const passaBusca = !termo || textoEvento(evento).includes(termo);
    const passaPeriodo = !filtros.periodo || evento.periodo === filtros.periodo;
    const passaCivilizacao = !filtros.civilizacao || evento.civilizacao === filtros.civilizacao;
    const passaCategoria = !filtros.categoria || normalizar(evento.categoria) === normalizar(filtros.categoria);

    return passaBusca && passaPeriodo && passaCivilizacao && passaCategoria;
  });
}

export function validarEventosDuplicados(eventos: Acontecimento[]) {
  const vistos = new Set<string>();
  const duplicados = new Set<string>();

  eventos.forEach((evento) => {
    if (vistos.has(evento.id)) {
      duplicados.add(evento.id);
      return;
    }
    vistos.add(evento.id);
  });

  return [...duplicados].sort();
}

export function calcularProgressoPorPeriodo(periodos: string[], eventos: Acontecimento[], estudados: Set<string>) {
  return Object.fromEntries(
    periodos.map((nome) => {
      const eventosDoPeriodo = eventos.filter((item) => item.periodo === nome);
      const feitos = eventosDoPeriodo.filter((item) => estudados.has(item.id)).length;
      const percentual = eventosDoPeriodo.length ? Math.round((feitos / eventosDoPeriodo.length) * 100) : 0;
      return [nome, { total: eventosDoPeriodo.length, feitos, percentual }];
    })
  ) as Record<string, { total: number; feitos: number; percentual: number }>;
}
