import type { MythologicalRelation, MythologicalRelationType } from "../../types/mythologyTree";
import { relationSources } from "./mythologySources";

let relationIndex = 0;

function rel(
  sourceId: string,
  targetId: string,
  type: MythologicalRelationType,
  options: Omit<MythologicalRelation, "id" | "sourceId" | "targetId" | "type" | "mythology"> = {}
): MythologicalRelation {
  relationIndex += 1;
  return {
    id: `romana-rel-${relationIndex}`,
    sourceId,
    targetId,
    type,
    mythology: "romana",
    ...options
  };
}

function parents(parentIds: string[], childIds: string[], options: Parameters<typeof rel>[3] = {}) {
  return parentIds.flatMap((parentId) => childIds.map((childId) => rel(parentId, childId, "parent", options)));
}

const romanFoundation = {
  tradition: "livio-ab-urbe-condita",
  sourceAuthor: "Lívio",
  sources: relationSources("livyRome")
};

const aeneid = {
  tradition: "virgilio-eneida",
  sourceAuthor: "Virgílio",
  sources: relationSources("virgilAeneid")
};

export const romanRelations: MythologicalRelation[] = [
  rel("saturno", "ops", "partner", {
    tradition: "ovidio-metamorfoses",
    sourceAuthor: "Ovídio",
    sources: relationSources("ovidMetamorphoses")
  }),
  ...parents(["saturno", "ops"], ["jupiter", "juno", "netuno", "plutao", "ceres", "vesta"], {
    tradition: "ovidio-metamorfoses",
    sourceAuthor: "Ovídio",
    sources: relationSources("ovidMetamorphoses"),
    description: "Relação romana literária, não cópia automática da teogonia grega."
  }),
  rel("jupiter", "juno", "partner", romanFoundation),
  ...parents(["jupiter", "juno"], ["marte", "vulcano"], romanFoundation),
  ...parents(["jupiter"], ["minerva"], {
    ...romanFoundation,
    alternative: true,
    description: "A relação de Minerva com Júpiter é marcada pela interpretação romana e recepção greco-romana."
  }),
  rel("venus", "anquises-romano", "partner", aeneid),
  ...parents(["venus", "anquises-romano"], ["eneias-romano"], {
    ...aeneid,
    description: "Tradição literária romana que liga Eneias à proteção de Vênus."
  }),
  ...parents(["eneias-romano"], ["linhagem-alba-longa"], {
    ...aeneid,
    label: "ancestralidade fundadora",
    description:
      "Nó coletivo usado para representar a tradição de descendência sem inventar cada geração intermediária."
  }),
  ...parents(["linhagem-alba-longa"], ["reia-silvia"], {
    ...romanFoundation,
    label: "descendência tradicional",
    description: "Relação coletiva de mito fundador, não registro documental."
  }),
  ...parents(["numitor"], ["reia-silvia"], romanFoundation),
  rel("marte", "reia-silvia", "partner", {
    ...romanFoundation,
    description: "Relação de mito fundador romano; não deve ser lida como história documentada."
  }),
  ...parents(["marte", "reia-silvia"], ["romulo", "remo"], romanFoundation),
  rel("romulo", "remo", "sibling", romanFoundation),
  rel("romulo", "quirino", "cultural-correspondence", {
    ...romanFoundation,
    label: "associação cultual",
    description: "Rômulo é associado a Quirino em tradição romana posterior."
  }),
  ...parents(["venus"], ["cupido"], {
    tradition: "ovidio-metamorfoses",
    sourceAuthor: "Ovídio",
    sources: relationSources("ovidMetamorphoses"),
    alternative: true,
    description: "Cupido é frequentemente ligado a Vênus, mas a genealogia varia."
  })
];
