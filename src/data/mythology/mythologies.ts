import type { Mythology } from "../../types/mythology";

export const mythologies: Mythology[] = [
  {
    id: "grega",
    name: "Mitologia Grega",
    culture: "Grécia Antiga",
    icon: "🏛",
    available: true,
    description:
      "Conjunto de narrativas, cultos e tradições religiosas do mundo grego antigo, preservado por poesia, teatro, arte, inscrições e autores posteriores."
  },
  {
    id: "romana",
    name: "Mitologia Romana",
    culture: "Roma Antiga",
    icon: "⚔",
    available: true,
    description:
      "Religião cívica e doméstica romana, formada por cultos próprios, assimilação de tradições itálicas e aproximações seletivas com divindades gregas."
  },
  {
    id: "nordica",
    name: "Mitologia Nórdica",
    culture: "Escandinávia medieval",
    icon: "ᚱ",
    available: false,
    description: "Preparada para cadastro futuro."
  },
  {
    id: "egipcia",
    name: "Mitologia Egípcia",
    culture: "Egito Antigo",
    icon: "𓂀",
    available: false,
    description: "Preparada para cadastro futuro."
  },
  {
    id: "celta",
    name: "Mitologia Celta",
    culture: "Culturas célticas",
    icon: "☘",
    available: false,
    description: "Preparada para cadastro futuro."
  },
  {
    id: "mesopotamica",
    name: "Mitologia Mesopotâmica",
    culture: "Mesopotâmia",
    icon: "𒀭",
    available: false,
    description: "Preparada para cadastro futuro."
  },
  {
    id: "hindu",
    name: "Mitologia Hindu",
    culture: "Sul da Ásia",
    icon: "ॐ",
    available: false,
    description: "Preparada para cadastro futuro."
  },
  {
    id: "japonesa",
    name: "Mitologia Japonesa",
    culture: "Japão",
    icon: "⛩",
    available: false,
    description: "Preparada para cadastro futuro."
  },
  {
    id: "asteca",
    name: "Mitologia Asteca",
    culture: "México central",
    icon: "☀",
    available: false,
    description: "Preparada para cadastro futuro."
  },
  {
    id: "maia",
    name: "Mitologia Maia",
    culture: "Mesoamérica",
    icon: "𓆏",
    available: false,
    description: "Preparada para cadastro futuro."
  },
  {
    id: "inca",
    name: "Mitologia Inca",
    culture: "Andes",
    icon: "☉",
    available: false,
    description: "Preparada para cadastro futuro."
  }
];

export const availableMythologies = mythologies.filter((mythology) => mythology.available);
