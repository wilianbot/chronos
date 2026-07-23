import type { CSSProperties } from "react";
import type { MythologicalRelation } from "../../../types/mythologyTree";

export function relationLabel(relation: MythologicalRelation) {
  if (relation.label) return relation.label;
  if (relation.type === "parent") return "parentesco";
  if (relation.type === "partner" || relation.type === "spouse") return "união";
  if (relation.type === "sibling") return "irmãos";
  if (relation.type === "cultural-correspondence") return "correspondência cultural";
  if (relation.type === "rival") return "encontro narrativo";
  if (relation.type === "companion") return "associação narrativa";
  return relation.type;
}

export function relationEdgeStyle(relation: MythologicalRelation): CSSProperties {
  if (relation.type === "cultural-correspondence") {
    return { stroke: "#62d2ff", strokeWidth: 3.4, strokeDasharray: "8 8" };
  }
  if (relation.type === "partner" || relation.type === "spouse") {
    return { stroke: "#ffe08a", strokeWidth: 5.2 };
  }
  if (relation.alternative || relation.disputed) {
    return { stroke: "#f4b860", strokeWidth: 3.1, strokeDasharray: "5 7" };
  }
  if (relation.type === "rival" || relation.type === "companion") {
    return { stroke: "#c9bea6", strokeWidth: 2.2, strokeDasharray: "2 8" };
  }
  return { stroke: "#f1d486", strokeWidth: 3.4 };
}

export function relationClassName(relation: MythologicalRelation) {
  return [
    "myth-edge",
    `myth-edge-${relation.type}`,
    relation.alternative ? "myth-edge-alternative" : "",
    relation.disputed ? "myth-edge-disputed" : ""
  ]
    .filter(Boolean)
    .join(" ");
}
