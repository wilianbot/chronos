import { personagens } from "../data/generated";
import { eventosPorId } from "../services/historyCatalog";
import { getDeityById } from "../services/mythologyService";

type ViteImportMeta = ImportMeta & {
  env?: {
    VITE_SITE_URL?: string;
  };
};

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
};

export const siteName = "Chronos";
export const siteUrl = ((import.meta as ViteImportMeta).env?.VITE_SITE_URL || "").replace(/\/$/, "");
export const defaultDescription =
  "Chronos é uma plataforma educacional para estudar História através de linhas do tempo, mapas, personagens históricos, filosofia, mitologia, flashcards e jornadas de estudo.";

export const seoRoutes: SeoRoute[] = [
  { path: "/", title: "Chronos | Uma jornada pela História", description: defaultDescription },
  {
    path: "/linha-do-tempo",
    title: "Linha do Tempo | Chronos",
    description: "Explore acontecimentos históricos no Chronos, organizados por períodos, causas e consequências."
  },
  {
    path: "/periodos",
    title: "Períodos Históricos | Chronos",
    description: "Estude civilizações, eras e processos históricos no Chronos com cards e progresso local."
  },
  {
    path: "/personagens",
    title: "Personagens Históricos | Chronos",
    description: "Conheça personagens históricos importantes da Antiguidade ao século XX no Chronos."
  },
  {
    path: "/mitologia",
    title: "Mitologia Grega e Romana | Chronos",
    description: "Explore mitologia grega e romana no Chronos com fontes, imagens, relações e filtros."
  },
  {
    path: "/mitologia/arvore",
    title: "Árvore Genealógica Mitológica | Chronos",
    description: "Grafo genealógico de tradições mitológicas gregas e romanas no Chronos, com modo textual acessível."
  },
  {
    path: "/mapas",
    title: "Mapas Históricos | Chronos",
    description: "Use mapas históricos no Chronos para localizar acontecimentos, cidades, batalhas e regiões."
  },
  {
    path: "/comparacoes",
    title: "Comparador de Civilizações | Chronos",
    description: "Compare civilizações, períodos, sociedades e transformações históricas no Chronos."
  },
  {
    path: "/jornadas",
    title: "Jornadas Guiadas | Chronos",
    description: "Percursos de estudo do Chronos para revisar temas históricos relacionados."
  },
  {
    path: "/revisao",
    title: "Revisão | Chronos",
    description: "Perguntas rápidas do Chronos para revisar acontecimentos, conceitos e mitologia."
  },
  {
    path: "/flashcards",
    title: "Flashcards | Chronos",
    description: "Flashcards de História e mitologia no Chronos, com filtros de estudo."
  },
  {
    path: "/glossario",
    title: "Glossário Histórico | Chronos",
    description: "Conceitos essenciais para estudar História de forma contextualizada no Chronos."
  },
  {
    path: "/favoritos",
    title: "Favoritos | Chronos",
    description: "Itens favoritos do Chronos salvos localmente neste navegador."
  },
  {
    path: "/progresso",
    title: "Progresso | Chronos",
    description: "Acompanhe no Chronos eventos, divindades e revisões estudados neste navegador."
  },
  {
    path: "/sobre",
    title: "Sobre | Chronos",
    description: "Saiba como o Chronos organiza conteúdos históricos, mitológicos e educacionais."
  },
  {
    path: "/privacidade",
    title: "Privacidade | Chronos",
    description: "Entenda quais dados do Chronos ficam salvos localmente no navegador."
  },
  {
    path: "/termos",
    title: "Termos de Uso | Chronos",
    description: "Condições gerais para uso educacional do Chronos."
  },
  {
    path: "/contato",
    title: "Contato | Chronos",
    description: "Informações de contato da WR Labs para correções e sugestões sobre o Chronos."
  }
];

function itemId(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return decodeURIComponent(segments[segments.length - 1] || "");
}

export function getSeoForPath(pathname: string): SeoRoute {
  const exact = seoRoutes.find((route) => route.path === pathname);
  if (exact) return exact;

  if (pathname.startsWith("/deuses/")) {
    const deity = getDeityById(itemId(pathname));
    return {
      path: pathname,
      title: `${deity?.name || "Divindade"} | Chronos`,
      description: deity
        ? `Estude ${deity.name} no Chronos, com história, símbolos, relações e fontes.`
        : "Página individual de divindade no Chronos, com história, símbolos, relações e fontes."
    };
  }

  if (pathname.startsWith("/eventos/")) {
    const evento = eventosPorId.get(itemId(pathname));
    return {
      path: pathname,
      title: `${evento?.titulo || "Acontecimento histórico"} | Chronos`,
      description: evento
        ? `${evento.resumo} Estude contexto, impacto e relações no Chronos.`
        : "Detalhes de acontecimento histórico no Chronos, com contexto, impacto e relações."
    };
  }

  if (pathname.startsWith("/personagens/")) {
    const personagem = personagens.find((item) => item.id === itemId(pathname));
    return {
      path: pathname,
      title: `${personagem?.nome || "Personagem histórico"} | Chronos`,
      description: personagem
        ? `Estude ${personagem.nome} no Chronos, com contexto histórico e relações.`
        : "Detalhes de personagem histórico no Chronos, com contexto e relações."
    };
  }

  return {
    path: pathname,
    title: "Página não encontrada | Chronos",
    description: defaultDescription
  };
}
