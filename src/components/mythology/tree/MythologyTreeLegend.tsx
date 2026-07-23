export function MythologyTreeLegend() {
  return (
    <aside className="myth-tree-legend" aria-label="Legenda da árvore">
      <h3>Legenda</h3>
      <ul>
        <li>
          <span className="legend-line solid" /> descendência principal
        </li>
        <li>
          <span className="legend-line double" /> união ou casal
        </li>
        <li>
          <span className="legend-line dashed" /> tradição alternativa ou contestada
        </li>
        <li>
          <span className="legend-line cultural" /> correspondência cultural aproximada
        </li>
        <li>
          <span className="legend-line dotted" /> encontro narrativo, não parentesco
        </li>
      </ul>
    </aside>
  );
}
