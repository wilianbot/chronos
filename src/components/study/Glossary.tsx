import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { glossario } from "../../data/studyTools";
import { normalizar } from "../../lib/history";

export function Glossary() {
  const [termoGlossario, setTermoGlossario] = useState("");
  const termosFiltrados = useMemo(
    () =>
      glossario.filter((item) => {
        const termo = normalizar(termoGlossario.trim());
        return (
          !termo || normalizar([item.termo, item.categoria, item.definicao, item.exemplo].join(" ")).includes(termo)
        );
      }),
    [termoGlossario]
  );

  return (
    <article className="glossary-panel">
      <div className="search-box">
        <Search size={18} />
        <input
          value={termoGlossario}
          onChange={(event) => setTermoGlossario(event.target.value)}
          placeholder="Buscar termo, tema ou exemplo..."
          aria-label="Buscar no glossário"
        />
      </div>
      <div className="glossary-list">
        {termosFiltrados.map((item) => (
          <section key={item.termo}>
            <span>{item.categoria}</span>
            <h3>{item.termo}</h3>
            <p>{item.definicao}</p>
            <small>{item.exemplo}</small>
          </section>
        ))}
      </div>
    </article>
  );
}
