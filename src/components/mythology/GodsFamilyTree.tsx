export function GodsFamilyTree() {
  return (
    <div className="deity-tree" aria-label="Árvore genealógica simplificada dos deuses gregos">
      <div className="tree-row">
        <span>Gaia</span>
        <i>+</i>
        <span>Urano</span>
      </div>
      <div className="tree-line" />
      <div className="tree-row wide">
        <span>Titãs</span>
        <span>Cronos</span>
        <span>Reia</span>
      </div>
      <div className="tree-line" />
      <div className="tree-row olympians">
        {["Zeus", "Hera", "Poseidon", "Hades", "Deméter", "Héstia"].map((nome) => (
          <span key={nome}>{nome}</span>
        ))}
      </div>
      <p>
        A Titanomaquia narra a disputa entre os deuses olímpicos e os Titãs. É uma tradição mítica e religiosa, útil
        para entender imaginário, culto e literatura, não um acontecimento histórico documentado.
      </p>
    </div>
  );
}
