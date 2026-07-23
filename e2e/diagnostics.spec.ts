import { test } from "@playwright/test";

const baseUrl = process.env.DIAGNOSTIC_BASE_URL || "http://127.0.0.1:5174";
const routes = [
  "/",
  "/linha-do-tempo",
  "/periodos",
  "/personagens",
  "/mitologia",
  "/mitologia/arvore",
  "/mitologia/arvore?mitologia=grega&foco=zeus",
  "/mitologia/arvore?mitologia=grega&foco=heracles",
  "/mitologia/arvore?mitologia=grega&tipo=semideus",
  "/mitologia/arvore?mitologia=romana&foco=romulo",
  "/mapas",
  "/comparacoes",
  "/jornadas",
  "/revisao",
  "/flashcards",
  "/glossario",
  "/favoritos",
  "/progresso",
  "/sobre",
  "/privacidade",
  "/termos",
  "/contato"
];
const widths = [320, 375, 430, 768, 1024, 1440];

test("browser diagnostics", async ({ page }) => {
  test.setTimeout(240_000);
  const failures: Array<{ route: string; width: number; url: string; status?: number; type: string; detail?: string }> =
    [];
  const routeMetrics = [];
  const consoleMessages: string[] = [];
  const mapRequests = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) consoleMessages.push(`${message.type()}: ${message.text()}`);
  });
  page.on("response", (response) => {
    const url = response.url();
    const type = response.request().resourceType();
    const status = response.status();
    const contentType = response.headers()["content-type"] || "";
    if (
      url.includes("tile.openstreetmap.org") ||
      url.includes("server.arcgisonline.com") ||
      url.includes("basemaps.cartocdn.com")
    ) {
      mapRequests.push({ url, status, contentType });
    }
    if (["image", "stylesheet", "script"].includes(type) && (status >= 400 || contentType.includes("text/html"))) {
      failures.push({
        route: page.url(),
        width: page.viewportSize()?.width || 0,
        url,
        status,
        type,
        detail: contentType
      });
    }
  });
  page.on("requestfailed", (request) => {
    const type = request.resourceType();
    if (["image", "stylesheet", "script"].includes(type)) {
      failures.push({
        route: page.url(),
        width: page.viewportSize()?.width || 0,
        url: request.url(),
        type,
        detail: request.failure()?.errorText
      });
    }
  });

  for (const width of widths) {
    await page.setViewportSize({ width, height: Math.max(720, Math.round(width * 1.4)) });
    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(route === "/mapas" ? 2500 : 500);
      const metric = await page.evaluate(() => ({
        route: location.pathname,
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        brokenImages: Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
        map: {
          provider: (document.querySelector(".map-provider-select select") as HTMLSelectElement | null)
            ?.selectedOptions[0]?.textContent,
          tileImgs: document.querySelectorAll(".leaflet-tile").length,
          loadedTiles: document.querySelectorAll(".leaflet-tile-loaded").length,
          fallback: !!document.querySelector(".fallback-world-map"),
          warning: document.querySelector(".map-tile-warning")?.textContent?.trim() || null
        }
      }));
      routeMetrics.push(metric);
      if ([320, 375, 768, 1440].includes(width)) {
        const safeRoute = route === "/" ? "home" : route.replace(/^\//, "").replace(/[^a-z0-9-]+/gi, "-");
        await page.screenshot({
          path: `test-results/final-${width}-${safeRoute}.png`,
          fullPage: true
        });
      }
    }
  }

  console.log(JSON.stringify({ failures, consoleMessages, mapRequests, routeMetrics }, null, 2));
});

test("second map provider loads", async ({ page }) => {
  test.setTimeout(45_000);
  const mapRequests = [];

  page.on("response", (response) => {
    const url = response.url();
    if (url.includes("server.arcgisonline.com")) {
      mapRequests.push({
        url,
        status: response.status(),
        contentType: response.headers()["content-type"] || ""
      });
    }
  });

  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto(`${baseUrl}/mapas`, { waitUntil: "domcontentloaded" });
  await page.selectOption(".map-provider-select select", { label: "Esri World Street Map" });
  await page.waitForTimeout(4_000);

  const metrics = await page.evaluate(() => ({
    provider: (document.querySelector(".map-provider-select select") as HTMLSelectElement | null)?.selectedOptions[0]
      ?.textContent,
    tileImgs: document.querySelectorAll(".leaflet-tile").length,
    loadedTiles: document.querySelectorAll(".leaflet-tile-loaded").length,
    fallback: !!document.querySelector(".fallback-world-map"),
    warning: document.querySelector(".map-tile-warning")?.textContent?.trim() || null
  }));

  console.log(JSON.stringify({ mapRequests, metrics }, null, 2));
});

test("map layer geometry", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto(`${baseUrl}/mapas`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3_000);

  const geometry = await page.evaluate(() => {
    const tile = document.querySelector<HTMLImageElement>(".leaflet-tile");
    const tilePane = document.querySelector<HTMLElement>(".leaflet-tile-pane");
    const overlayPane = document.querySelector<HTMLElement>(".leaflet-overlay-pane");
    const overlaySvg = document.querySelector<SVGElement>(".leaflet-overlay-pane svg");
    return {
      tileRect: tile?.getBoundingClientRect().toJSON(),
      tileStyle: tile
        ? {
            className: tile.className,
            parentClasses: Array.from(tile.parentElement?.parentElement?.parentElement?.classList || []),
            ancestors: (() => {
              const values = [];
              let node: HTMLElement | null = tile;
              while (node && values.length < 8) {
                values.push(node.className || node.tagName);
                node = node.parentElement;
              }
              return values;
            })(),
            closestLeafletContainer: !!tile.closest(".leaflet-container"),
            inline: tile.getAttribute("style"),
            position: getComputedStyle(tile).position,
            width: getComputedStyle(tile).width,
            minWidth: getComputedStyle(tile).minWidth,
            maxWidth: getComputedStyle(tile).maxWidth,
            transform: getComputedStyle(tile).transform,
            opacity: getComputedStyle(tile).opacity,
            zIndex: getComputedStyle(tile).zIndex
          }
        : null,
      tilePane: tilePane
        ? {
            rect: tilePane.getBoundingClientRect().toJSON(),
            transform: getComputedStyle(tilePane).transform,
            zIndex: getComputedStyle(tilePane).zIndex,
            opacity: getComputedStyle(tilePane).opacity
          }
        : null,
      overlayPane: overlayPane
        ? {
            rect: overlayPane.getBoundingClientRect().toJSON(),
            transform: getComputedStyle(overlayPane).transform,
            zIndex: getComputedStyle(overlayPane).zIndex,
            opacity: getComputedStyle(overlayPane).opacity
          }
        : null,
      overlaySvg: overlaySvg?.getBoundingClientRect().toJSON(),
      markerCount: document.querySelectorAll(".leaflet-interactive").length
    };
  });

  console.log(JSON.stringify(geometry, null, 2));
});
