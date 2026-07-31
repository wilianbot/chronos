import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf-8");

describe("CSS responsivo", () => {
  it("mantém breakpoints principais para tablet e celular", () => {
    expect(css).toContain("@media (max-width: 1100px)");
    expect(css).toContain("@media (max-width: 760px)");
    expect(css).toContain("@media (max-width: 520px)");
  });

  it("inclui layouts novos e críticos nas regras responsivas", () => {
    expect(css).toMatch(/\.guided-layout,[\s\S]*\.study-grid,[\s\S]*\.timeline-layout/);
    expect(css).toMatch(/\.stats-grid,[\s\S]*\.review-score,[\s\S]*\.compare-grid/);
    expect(css).toMatch(/\.event-card\s*\{\s*grid-template-columns:\s*1fr;/);
  });

  it("respeita redução de movimento", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("bloqueia overflow horizontal global e protege tiles do Leaflet", () => {
    expect(css).toMatch(/html\s*\{[\s\S]*overflow-x:\s*hidden;/);
    expect(css).toMatch(/body\s*\{[\s\S]*min-width:\s*320px;[\s\S]*overflow-x:\s*hidden;/);
    expect(css).toMatch(/\.leaflet-container img\.leaflet-tile\s*\{[\s\S]*max-width:\s*none !important;/);
  });

  it("define altura responsiva para o mapa e modal de tela cheia no celular", () => {
    expect(css).toMatch(/\.map-visual\s*\{[\s\S]*min-height:\s*420px;[\s\S]*height:\s*min\(65vh,\s*720px\);/);
    expect(css).toMatch(/\.map-shell\s*\{[\s\S]*max-width:\s*100%;[\s\S]*overflow:\s*clip;/);
    expect(css).toMatch(/\.map-visual\s*\{[\s\S]*contain:\s*layout paint;[\s\S]*isolation:\s*isolate;/);
    expect(css).toMatch(/\.leaflet-container \.leaflet-control-attribution\s*\{[\s\S]*text-overflow:\s*ellipsis;/);
    expect(css).toMatch(/@media \(max-width:\s*520px\)[\s\S]*\.modal\s*\{[\s\S]*max-height:\s*100dvh;/);
    expect(css).toMatch(/@media \(max-width:\s*520px\)[\s\S]*\.map-visual\s*\{[\s\S]*height:\s*50vh;/);
  });
});
