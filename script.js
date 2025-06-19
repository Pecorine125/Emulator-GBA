const jogos = [
  { nome: "Pokémon", rom: "roms/pokemon.gba", capa: "covers/pokemon.jpg" },
  { nome: "Mario", rom: "roms/mario.gba", capa: "covers/mario.jpg" }
];

const gallery = document.getElementById("gallery");
let emulatorInstance = null;

jogos.forEach(jogo => {
  const div = document.createElement("div");
  div.className = "game";
  div.innerHTML = `<img src="${jogo.capa}" alt="${jogo.nome}"><p>${jogo.nome}</p>`;
  div.onclick = () => rodarJogo(jogo.rom);
  gallery.appendChild(div);
});

async function rodarJogo(romPath) {
  try {
    if(emulatorInstance){
      emulatorInstance.stop();
      emulatorInstance = null;
    }

    const response = await fetch(romPath);
    if(!response.ok) throw new Error("Não foi possível carregar a ROM");

    const buffer = await response.arrayBuffer();

    const canvas = document.getElementById("emulator");
    emulatorInstance = new GameBoyAdvance(canvas);
    emulatorInstance.setBios(null);
    emulatorInstance.loadRomFromFile(buffer);
    emulatorInstance.runStable();

  } catch (e) {
    alert("Erro ao carregar o jogo: " + e.message);
  }
}
