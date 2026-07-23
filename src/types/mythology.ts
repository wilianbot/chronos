export type MythologyId =
  | "grega"
  | "romana"
  | "nordica"
  | "egipcia"
  | "celta"
  | "mesopotamica"
  | "hindu"
  | "japonesa"
  | "asteca"
  | "maia"
  | "inca";

export type DeityGender = "masculino" | "feminino" | "outro" | "nao-definido";

export type DeityCategory =
  | "olimpico"
  | "primordial"
  | "tita"
  | "ctonico"
  | "personificacao"
  | "heroi-divinizado"
  | "domestico"
  | "agricola"
  | "guerra"
  | "natureza"
  | "amor"
  | "morte"
  | "sabedoria"
  | "cura"
  | "liminar";

export type DeityImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  position?: string;
  author?: string;
  institution?: string;
  license?: string;
  sourceUrl?: string;
};

export type DeitySource = {
  title: string;
  institution?: string;
  url?: string;
};

export type Deity = {
  id: string;
  name: string;
  alternativeNames?: string[];
  mythology: MythologyId;
  culture: string;
  gender?: DeityGender;
  category: DeityCategory;
  tags?: DeityCategory[];
  title?: string;
  shortDescription: string;
  fullHistory: string;
  domains: string[];
  symbols: string[];
  sacredAnimals?: string[];
  sacredPlants?: string[];
  attributes?: string[];
  parents?: string[];
  siblings?: string[];
  partners?: string[];
  children?: string[];
  equivalentDeityIds?: string[];
  relatedDeityIds?: string[];
  relatedMythIds?: string[];
  relatedEventIds?: string[];
  mainMyths: string[];
  worshipAndCult?: string;
  templesAndPlaces?: string[];
  festivals?: string[];
  historicalContext?: string;
  culturalLegacy?: string;
  curiosities?: string[];
  image: DeityImage;
  sources: DeitySource[];
  sourceType: "mito" | "religiao" | "tradicao";
};

export type Mythology = {
  id: MythologyId;
  name: string;
  culture: string;
  icon: string;
  description: string;
  available: boolean;
};

export type DeityComparisonItem = {
  greekId: string;
  romanId: string;
  origin: string;
  domains: string;
  symbols: string;
  mythicPersonality: string;
  religiousImportance: string;
  worship: string;
  similarities: string;
  differences: string;
};
