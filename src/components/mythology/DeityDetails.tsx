import { useState } from "react";
import { Link } from "react-router-dom";
import { getTreeUrl } from "../../services/mythologyTreeService";
import type { Deity } from "../../types/mythology";
import { DeityFamily } from "./DeityFamily";
import { DeityRelations } from "./DeityRelations";
import { DeitySources } from "./DeitySources";

const tabs = [
  { id: "overview", label: "Visão geral" },
  { id: "myths", label: "História e mitos" },
  { id: "family", label: "Família" },
  { id: "cult", label: "Culto" },
  { id: "symbols", label: "Símbolos" },
  { id: "art", label: "Arte" },
  { id: "sources", label: "Fontes" }
] as const;

type TabId = (typeof tabs)[number]["id"];

export function DeityDetails({ deity }: { deity: Deity }) {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <section className="deity-tabs">
      <div className="deity-tab-list" role="tablist" aria-label={`Detalhes de ${deity.name}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`deity-tab-${tab.id}`}
            className={active === tab.id ? "active" : ""}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="deity-tab-panel" id={`deity-tab-${active}`} role="tabpanel">
        {active === "overview" && (
          <div className="deity-prose">
            <h3>Quem era</h3>
            <p>{deity.fullHistory}</p>
            <h3>Origem e contexto</h3>
            <p>{deity.historicalContext}</p>
            <h3>Curiosidades</h3>
            <ul>
              {deity.curiosities?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {active === "myths" && (
          <div className="deity-prose">
            <h3>Principais mitos</h3>
            <ul>
              {deity.mainMyths.map((myth) => (
                <li key={myth}>{myth}</li>
              ))}
            </ul>
            <p>
              Mitos antigos possuem versões diferentes conforme cidade, autor, período e gênero literário. Esta página
              resume tradições recorrentes sem tratar uma versão como universal.
            </p>
          </div>
        )}
        {active === "family" && (
          <>
            <div className="deity-prose family-tree-callout">
              <h3>Família e genealogia</h3>
              <p>
                O grafo separa genealogias gregas e romanas, identifica relações alternativas e mostra correspondências
                culturais sem tratá-las como parentesco.
              </p>
              <Link
                className="button primary compact"
                to={getTreeUrl({
                  id: deity.id,
                  name: deity.name,
                  mythology: deity.mythology,
                  culture: deity.culture,
                  entityType: "deity",
                  categories: [],
                  shortDescription: deity.shortDescription
                })}
              >
                Ver na árvore genealógica
              </Link>
            </div>
            <DeityFamily deity={deity} />
            <DeityRelations deity={deity} />
          </>
        )}
        {active === "cult" && (
          <div className="deity-prose">
            <h3>Culto e religião</h3>
            <p>{deity.worshipAndCult}</p>
            {deity.templesAndPlaces?.length ? (
              <>
                <h3>Templos e locais</h3>
                <ul>
                  {deity.templesAndPlaces.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {deity.festivals?.length ? (
              <>
                <h3>Festivais</h3>
                <ul>
                  {deity.festivals.map((festival) => (
                    <li key={festival}>{festival}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        )}
        {active === "symbols" && (
          <div className="deity-facts-grid">
            <Fact title="Domínios" items={deity.domains} />
            <Fact title="Símbolos" items={deity.symbols} />
            <Fact title="Animais associados" items={deity.sacredAnimals} />
            <Fact title="Plantas associadas" items={deity.sacredPlants} />
            <Fact title="Atributos" items={deity.attributes} />
          </div>
        )}
        {active === "art" && (
          <div className="deity-prose">
            <h3>Representações na arte</h3>
            <p>
              Representações antigas e históricas variam por período, suporte e acervo. A imagem principal desta página
              foi escolhida como referência visual didática, com crédito e licença registrados.
            </p>
            <h3>Legado cultural</h3>
            <p>{deity.culturalLegacy}</p>
          </div>
        )}
        {active === "sources" && <DeitySources deity={deity} />}
      </div>
    </section>
  );
}

function Fact({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section>
      <h4>{title}</h4>
      <div className="deity-chip-list">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
