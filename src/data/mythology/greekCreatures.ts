import type { MythologicalEntity } from "../../types/mythologyTree";
import { defaultGreekTreeSources } from "./mythologySources";

function creature(input: Omit<MythologicalEntity, "mythology" | "culture" | "entityType" | "categories" | "sources">) {
  return {
    mythology: "grega" as const,
    culture: "Tradições gregas antigas",
    entityType: "creature" as const,
    categories: ["monster" as const],
    sources: defaultGreekTreeSources,
    ...input
  };
}

export const greekCreatures: MythologicalEntity[] = [
  creature({
    id: "tifao",
    name: "Tifão",
    title: "Ser monstruoso associado a Gaia e Tártaro",
    shortDescription: "Criatura primordial monstruosa em tradições sobre a ameaça à ordem olímpica."
  }),
  creature({
    id: "equidna",
    name: "Equidna",
    title: "Mãe de monstros em tradições gregas",
    shortDescription: "Criatura associada a Tifão e à geração de monstros heroicos."
  }),
  creature({
    id: "cerbero",
    name: "Cérbero",
    title: "Cão do mundo dos mortos",
    shortDescription: "Guardião do Hades; sua relação com Héracles é narrativa, não genealógica."
  }),
  creature({
    id: "hidra-lerna",
    name: "Hidra de Lerna",
    title: "Monstro enfrentado por Héracles",
    shortDescription: "Criatura monstruosa associada aos trabalhos de Héracles."
  }),
  creature({
    id: "quimera",
    name: "Quimera",
    title: "Monstro vencido por Belerofonte",
    shortDescription: "Criatura híbrida em tradição heroica; relação com Belerofonte é narrativa."
  }),
  creature({
    id: "leao-nemeia",
    name: "Leão de Nemeia",
    title: "Monstro enfrentado por Héracles",
    shortDescription: "Criatura associada ao ciclo dos trabalhos de Héracles."
  }),
  creature({
    id: "minotauro",
    name: "Minotauro",
    title: "Criatura do labirinto de Creta",
    shortDescription: "Figura do ciclo de Teseu e de tradições cretenses."
  }),
  creature({
    id: "pegaso",
    name: "Pégaso",
    title: "Cavalo alado",
    shortDescription: "Criatura associada a Medusa e ao ciclo de Belerofonte."
  }),
  creature({
    id: "medusa",
    name: "Medusa",
    title: "Górgona",
    shortDescription: "Figura monstruosa ligada ao nascimento de Pégaso e ao ciclo de Perseu."
  }),
  creature({
    id: "cila",
    name: "Cila",
    title: "Monstro marinho",
    shortDescription: "Criatura associada a tradições de navegação e à Odisseia."
  }),
  creature({
    id: "caribdis",
    name: "Caríbdis",
    title: "Monstro ou perigo marítimo",
    shortDescription: "Figura associada a tradições de navegação e à Odisseia."
  })
];
