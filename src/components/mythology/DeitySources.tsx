import type { Deity } from "../../types/mythology";

export function DeitySources({ deity }: { deity: Deity }) {
  return (
    <div className="deity-sources">
      <section>
        <h4>Crédito da imagem</h4>
        <p>{deity.image.alt}</p>
        <dl>
          {deity.image.author && (
            <div>
              <dt>Autor</dt>
              <dd>{deity.image.author}</dd>
            </div>
          )}
          {deity.image.institution && (
            <div>
              <dt>Instituição</dt>
              <dd>{deity.image.institution}</dd>
            </div>
          )}
          {deity.image.license && (
            <div>
              <dt>Licença</dt>
              <dd>{deity.image.license}</dd>
            </div>
          )}
          {deity.image.sourceUrl && (
            <div>
              <dt>Fonte</dt>
              <dd>
                <a className="source-link" href={deity.image.sourceUrl} target="_blank" rel="noreferrer">
                  Página original
                </a>
              </dd>
            </div>
          )}
        </dl>
      </section>
      <section>
        <h4>Fontes de consulta</h4>
        <ul>
          {deity.sources.map((source) => (
            <li key={`${source.title}-${source.url || ""}`}>
              {source.url ? (
                <a className="source-link" href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              ) : (
                source.title
              )}
              {source.institution ? <span> - {source.institution}</span> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
