import type { MythologicalEntity } from "../../types/mythologyTree";
import { defaultRomanTreeSources } from "./mythologySources";

function romanHero(entity: Omit<MythologicalEntity, "mythology" | "culture" | "sources">): MythologicalEntity {
  return {
    mythology: "romana",
    culture: "Tradições romanas antigas",
    sources: defaultRomanTreeSources,
    ...entity
  };
}

export const romanHeroes: MythologicalEntity[] = [
  romanHero({
    id: "eneias-romano",
    name: "Eneias",
    entityType: "hero",
    categories: ["heroic"],
    title: "Herói troiano ancestral mítico de Roma",
    shortDescription:
      "Na tradição romana, Eneias liga Troia, Vênus e a ancestralidade fundadora de Roma. Isso é mito fundador, não história documentada.",
    pageRoute: "/herois/eneias-romano"
  }),
  romanHero({
    id: "romulo",
    name: "Rômulo",
    entityType: "demigod",
    categories: ["heroic", "war"],
    title: "Fundador mítico de Roma",
    shortDescription: "Filho de Marte e Reia Sílvia na tradição fundadora romana; depois associado a Quirino.",
    pageRoute: "/semideuses/romulo"
  }),
  romanHero({
    id: "remo",
    name: "Remo",
    entityType: "demigod",
    categories: ["heroic", "war"],
    title: "Irmão de Rômulo",
    shortDescription: "Gêmeo de Rômulo na tradição de fundação de Roma.",
    pageRoute: "/semideuses/remo"
  }),
  romanHero({
    id: "linhagem-alba-longa",
    name: "Linhagem de Alba Longa",
    entityType: "collective",
    categories: ["heroic"],
    title: "Elo tradicional entre Eneias e Rômulo",
    shortDescription:
      "Grupo coletivo usado para não inventar cada geração intermediária entre Eneias e Reia Sílvia nesta primeira versão."
  })
];
