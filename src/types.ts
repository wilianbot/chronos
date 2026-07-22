export type Categoria =
  | "guerra"
  | "filosofia"
  | "politica"
  | "política"
  | "religião"
  | "religiao"
  | "mitologia"
  | "ciência"
  | "ciencia"
  | "arte"
  | "expansão"
  | "expansao"
  | "revolução"
  | "revolucao"
  | "império"
  | "imperio"
  | "tratados"
  | "personagens"
  | string;

export interface Acontecimento {
  id: string;
  ano: string;
  anoOrdenacao: number;
  titulo: string;
  periodo: string;
  civilizacao: string;
  categoria: Categoria;
  resumo: string;
  descricao: string;
  contexto: string;
  personagens: string[];
  causas: string[];
  consequencias: string[];
  curiosidades: string[];
  legado: string;
  imagem: string;
  alt: string;
  creditoImagem: string;
  tipoFonte: string;
}

export interface DeusGrego {
  nome: string;
  dominio: string;
  simbolo: string;
  parentesco: string;
  historia: string;
  romano: string;
}

export interface Personagem {
  id: string;
  nome: string;
  periodo: string;
  origem: string;
  ocupacao: string;
  feitos: string;
  impacto: string;
  curiosidade: string;
  imagem: string;
  foto?: string;
  fotoRemota?: string;
}

export interface ComparadorCivilizacao {
  governo: string;
  sociedade: string;
  economia: string;
  religiao: string;
  militar: string;
  cultura: string;
  territorio: string;
  personagens: string;
  legado: string;
}

export interface MapaHistorico {
  titulo: string;
  descricao: string;
  foco: string;
}

export interface PerguntaRevisao {
  pergunta: string;
  resposta: string;
  tipo: string;
}

export interface LocalHistorico {
  lat: number;
  lng: number;
  nome: string;
}
