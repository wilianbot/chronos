import type { MythologicalEntity } from "../../types/mythologyTree";
import { defaultRomanTreeSources } from "./mythologySources";

function romanMortal(
  input: Omit<MythologicalEntity, "mythology" | "culture" | "entityType" | "categories" | "sources">
) {
  return {
    mythology: "romana" as const,
    culture: "Tradições romanas antigas",
    entityType: "mortal" as const,
    categories: ["other" as const],
    sources: defaultRomanTreeSources,
    ...input
  };
}

export const romanMortals: MythologicalEntity[] = [
  romanMortal({
    id: "anquises-romano",
    name: "Anquises",
    title: "Pai de Eneias",
    shortDescription: "Mortal troiano ligado a Vênus e à ancestralidade mítica romana."
  }),
  romanMortal({
    id: "reia-silvia",
    name: "Reia Sílvia",
    alternativeNames: ["Ilia"],
    title: "Mãe de Rômulo e Remo",
    shortDescription:
      "Vestal na tradição fundadora romana; a relação com Marte pertence ao mito fundador, não a registro histórico."
  }),
  romanMortal({
    id: "numitor",
    name: "Numitor",
    title: "Rei mítico de Alba Longa",
    shortDescription: "Avô de Reia Sílvia em tradições sobre Rômulo e Remo."
  })
];
