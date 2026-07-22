import type { FonteReferencia } from "../../services/historyCatalog";

export function Stat({ label, value, small = false }: { label: string; value: string | number; small?: boolean }) {
  return (
    <article className="stat">
      <strong className={small ? "small" : ""}>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

export function FilterSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="select-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Todos</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function References({ title, sources }: { title: string; sources: FonteReferencia[] }) {
  return (
    <section>
      <h3>{title}</h3>
      <ul className="source-list">
        {sources.map((source) => (
          <li key={source.nome}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.nome}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SmartImage({
  sources,
  alt,
  className,
  loading = "lazy"
}: {
  sources: Array<string | undefined>;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const lista = sources.filter(Boolean) as string[];
  const src = lista[0] || "/assets/images/mapa-placeholder.svg";
  return <img className={className} src={src} alt={alt} loading={loading} />;
}
