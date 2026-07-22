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
});
