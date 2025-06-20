function rodarJogo(caminhoROM) {
  const container = document.getElementById('emulador-container');
  container.innerHTML = ''; // limpa o emulador antigo

  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 160;
  container.appendChild(canvas);

  const gba = new GameBoyAdvance();
  gba.setCanvas(canvas);
  gba.loadRomFromUrl(caminhoROM, () => {
    gba.runStable();
  });
}
