import { acontecimentos, comparadores, perguntasRevisao, personagens } from "../data/generated";
import { personagemImages } from "../data/personagemImages";
import { FALLBACK_IMAGE_SRC, isLocalAssetImageSrc, normalizeImageSrc } from "../lib/images";
import { normalizar, ordenarEventos } from "../lib/history";
import { mythologyReviewItems } from "./mythologyService";
import { mythologyTreeReviewItems } from "./mythologyTreeService";
import type { Acontecimento, ComparadorCivilizacao, Personagem, PerguntaRevisao } from "../types";

export type Tema = "claro" | "escuro";

export type ItemRevisao =
  | { id: string; tipo: "Acontecimento"; tema: string; pergunta: string; resposta: string }
  | { id: string; tipo: "Personagem"; tema: string; pergunta: string; resposta: string }
  | { id: string; tipo: "Pergunta"; tema: string; pergunta: string; resposta: string };

export type FonteReferencia = {
  nome: string;
  url: string;
};

export const categoriaCores: Record<string, string> = {
  guerra: "#b74545",
  filosofia: "#5966b6",
  politica: "#8a6a2f",
  política: "#8a6a2f",
  religião: "#7f5aa7",
  religiao: "#7f5aa7",
  mitologia: "#9b4d83",
  ciência: "#2e7e86",
  ciencia: "#2e7e86",
  arte: "#b57931",
  expansão: "#4d7c4f",
  expansao: "#4d7c4f",
  revolução: "#a34f39",
  revolucao: "#a34f39",
  império: "#51617d",
  imperio: "#51617d",
  tratados: "#6d7059",
  personagens: "#8f5f4a"
};

export const eventosOrdenados = ordenarEventos(acontecimentos);
export const eventosPorId = new Map(eventosOrdenados.map((evento) => [evento.id, evento]));
export const comparadoresMap = comparadores as Record<string, ComparadorCivilizacao>;

export const imagemPadraoPeriodo: Record<string, string> = {
  "Primeiras Civilizações": "assets/images/ziggurat-ur.jpg",
  "Grécia Antiga": "assets/images/acropole-atenas.jpg",
  "Macedônia e Helenismo": "assets/images/alexander-mosaic.jpg",
  "Roma Antiga": "assets/images/coliseu.jpg",
  "Idade Média": "assets/images/hagia-sophia.jpg",
  Renascimento: "assets/images/leonardo.jpg",
  "Reforma e Grandes Navegações": "assets/images/leonardo.jpg",
  "Absolutismo e Iluminismo": "assets/images/leonardo.jpg",
  Revoluções: "assets/images/bastilha.jpg",
  "Era Napoleônica": "assets/images/bastilha.jpg",
  "Revolução Industrial": "assets/images/cottonopolis.jpg",
  Imperialismo: "assets/images/cottonopolis.jpg",
  "Primeira Guerra Mundial": "assets/images/trincheira-somme.jpg",
  "Período Entre Guerras": "assets/images/bolsa-nyse-1929.jpg",
  "Segunda Guerra Mundial": "assets/images/dia-d.jpg"
};

export const imagensMapasHistoricos = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20ancient%20Greece-en.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Achaemenid%20Empire%20500%20BCE.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/MacedonEmpire.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20conquest%20of%20Italy.png",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Empire%20117.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Western%20and%20Eastern%20Roman%20Empires%20476AD%282%29.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%20814.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%201812%20map%20en.png",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20Europe%20alliances%201914-en.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/World%20War%20II%20alliances%20animated%20map.gif"
];

const fontesGerais: FonteReferencia[] = [
  { nome: "Encyclopaedia Britannica", url: "https://www.britannica.com/" },
  { nome: "World History Encyclopedia", url: "https://www.worldhistory.org/" },
  { nome: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org/toah/" },
  { nome: "British Museum", url: "https://www.britishmuseum.org/" }
];

const fontesPorPeriodo: Record<string, FonteReferencia[]> = {
  "Grécia Antiga": [
    { nome: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/" },
    { nome: "Theoi Greek Mythology", url: "https://www.theoi.com/" }
  ],
  "Macedônia e Helenismo": [
    { nome: "World History Encyclopedia - Alexander", url: "https://www.worldhistory.org/Alexander_the_Great/" }
  ],
  "Roma Antiga": [
    { nome: "Livius - Roman History", url: "https://www.livius.org/" },
    { nome: "Fordham Ancient History Sourcebook", url: "https://sourcebooks.fordham.edu/ancient/asbook.asp" }
  ],
  "Idade Média": [{ nome: "Fordham Medieval Sourcebook", url: "https://sourcebooks.fordham.edu/sbook.asp" }],
  Renascimento: [{ nome: "National Gallery - Renaissance", url: "https://www.nationalgallery.org.uk/" }],
  "Primeira Guerra Mundial": [{ nome: "Imperial War Museums", url: "https://www.iwm.org.uk/history/first-world-war" }],
  "Período Entre Guerras": [
    { nome: "United States Holocaust Memorial Museum", url: "https://encyclopedia.ushmm.org/" }
  ],
  "Segunda Guerra Mundial": [
    { nome: "United States Holocaust Memorial Museum", url: "https://encyclopedia.ushmm.org/" },
    { nome: "National WWII Museum", url: "https://www.nationalww2museum.org/" }
  ]
};

const perguntasExtras: PerguntaRevisao[] = [
  {
    tipo: "Conceito",
    pergunta: "O que era uma pólis?",
    resposta: "Uma cidade-Estado grega, com território, leis, cultos, instituições e identidade cívica própria."
  },
  {
    tipo: "Roma",
    pergunta: "Roma caiu por uma única causa?",
    resposta: "Não. A queda envolveu fatores militares, políticos, econômicos, administrativos e externos."
  },
  {
    tipo: "Segunda Guerra",
    pergunta: "Como o Holocausto deve ser tratado em um material educativo?",
    resposta: "Com precisão, respeito às vítimas e contextualização da política genocida nazista."
  }
];

const perguntasGeradasPorEvento: PerguntaRevisao[] = eventosOrdenados.map((evento) => ({
  tipo: evento.periodo,
  pergunta: `Qual é a importância de ${evento.titulo}?`,
  resposta: `${evento.resumo} ${evento.legado}`
}));

const perguntasGeradasPorPersonagem: PerguntaRevisao[] = personagens.map((personagem) => ({
  tipo: personagem.periodo,
  pergunta: `Relacione ${personagem.nome} ao seu contexto histórico.`,
  resposta: `${personagem.ocupacao}. ${personagem.feitos} Impacto: ${personagem.impacto}`
}));

const bancoRevisao = [
  ...perguntasRevisao,
  ...perguntasExtras,
  ...perguntasGeradasPorEvento,
  ...perguntasGeradasPorPersonagem,
  ...mythologyReviewItems(),
  ...mythologyTreeReviewItems()
];

export function imagem(src?: string) {
  return normalizeImageSrc(src);
}

export function fontesEvento(evento: Acontecimento) {
  const fontes = [];
  if (isLocalAssetImageSrc(evento.imagem)) fontes.push(evento.imagem);
  fontes.push(imagemPadraoPeriodo[evento.periodo], FALLBACK_IMAGE_SRC);
  return Array.from(new Set(fontes.filter(Boolean)));
}

const imagensLocaisEspecificas = new Set([
  "primeiras-cidades",
  "piramides-gize",
  "renascimento",
  "revolucao-francesa",
  "primeira-industrial",
  "trincheiras",
  "verdun-somme",
  "crise-1929",
  "dia-d-franca"
]);

export function deveUsarImagemNoCard(evento: Acontecimento) {
  if (evento.imagem.startsWith("http")) return true;
  return imagensLocaisEspecificas.has(evento.id);
}

export function fontesPersonagem(personagem: Personagem) {
  const imagensLocais = personagemImages as Record<string, string>;
  return [
    imagensLocais[personagem.id],
    isLocalAssetImageSrc(personagem.imagem) ? personagem.imagem : undefined,
    imagemPadraoPeriodo[personagem.periodo],
    FALLBACK_IMAGE_SRC
  ].filter(Boolean);
}

export function fontesHistoricas(evento: Acontecimento) {
  const fontes = [...fontesGerais, ...(fontesPorPeriodo[evento.periodo] || [])];
  if (normalizar(evento.tipoFonte).includes("mito") || normalizar(evento.categoria).includes("mitologia")) {
    fontes.push({ nome: "Theoi Greek Mythology", url: "https://www.theoi.com/" });
  }

  return Array.from(new Map(fontes.map((fonte) => [fonte.nome, fonte])).values()).slice(0, 5);
}

export function escolherRevisao(): ItemRevisao {
  const tipo = Math.floor(Math.random() * 3);
  if (tipo === 0) {
    const evento = eventosOrdenados[Math.floor(Math.random() * eventosOrdenados.length)];
    return {
      id: `evento:${evento.id}`,
      tipo: "Acontecimento",
      tema: evento.periodo,
      pergunta: `O que aconteceu em ${evento.ano}: ${evento.titulo}?`,
      resposta: `${evento.resumo} ${evento.legado}`
    };
  }

  if (tipo === 1) {
    const personagem = personagens[Math.floor(Math.random() * personagens.length)];
    return {
      id: `personagem:${personagem.id}`,
      tipo: "Personagem",
      tema: personagem.periodo,
      pergunta: `Quem foi ${personagem.nome}?`,
      resposta: `${personagem.ocupacao}. ${personagem.feitos} Impacto: ${personagem.impacto}`
    };
  }

  const pergunta = bancoRevisao[Math.floor(Math.random() * bancoRevisao.length)] as PerguntaRevisao;
  return {
    id: `pergunta:${normalizar(pergunta.tipo)}:${normalizar(pergunta.pergunta).slice(0, 64)}`,
    tipo: "Pergunta",
    tema: pergunta.tipo,
    pergunta: pergunta.pergunta,
    resposta: pergunta.resposta
  };
}
