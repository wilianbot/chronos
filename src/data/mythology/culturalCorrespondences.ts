import type { MythologicalRelation } from "../../types/mythologyTree";
import { relationSources } from "./mythologySources";

const pairs = [
  ["zeus", "jupiter"],
  ["hera", "juno"],
  ["poseidon", "netuno"],
  ["hades", "plutao"],
  ["atena", "minerva"],
  ["ares", "marte"],
  ["afrodite", "venus"],
  ["hermes", "mercurio"],
  ["hefesto", "vulcano"],
  ["artemis", "diana"],
  ["demeter", "ceres"],
  ["persefone", "proserpina"],
  ["dionisio", "baco"],
  ["hestia", "vesta"],
  ["cronos", "saturno"],
  ["reia", "ops"],
  ["eros", "cupido"],
  ["nike", "vitoria"]
] as const;

export const culturalCorrespondences: MythologicalRelation[] = pairs.map(([sourceId, targetId], index) => ({
  id: `correspondencia-cultural-${index + 1}`,
  sourceId,
  targetId,
  type: "cultural-correspondence",
  mythology: "grega",
  label: "correspondência cultural aproximada",
  description:
    "Conexão de interpretação cultural greco-romana. Não é parentesco e não significa identidade absoluta entre culto, mito e função religiosa.",
  tradition: "interpretacao-greco-romana",
  alternative: true,
  sources: relationSources("britannica", "theoiIndex")
}));
