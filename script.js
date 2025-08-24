const puzzleDiv = document.getElementById('puzzle');
const verificarBtn = document.getElementById('verificar');
const resultado = document.getElementById('resultado');
const rondaDiv = document.getElementById('ronda');

// Frases románticas (puedes agregar más frases aquí)
const frases = [
  ["Sos", "el", "Sol", "que", "ilumina", "mis", "días"],
  ["Contigo", "todo", "es", "mejor", "y", "más", "bonito"],
  ["Mi", "corazón", "late", "sólo", "por", "y", "para", "ti"],
  ["Te", "encuentro", "en", "cada", "canción", "de", "amor"],
  ["Eres", "la", "razón", "de", "mi", "tonta", "sonrisa"],
  ["Eres", "mi", "paraíso", "en", "la", "tierra"],
  ["Te", "amo", "Te", "amo", "Te", "amo", "Te", "amo"]
];
let ronda = 0;

function mezclar(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function mostrarRonda() {
  rondaDiv.textContent = `Ronda ${ronda + 1} de ${frases.length}`;
}

function cargarFrase() {
  puzzleDiv.innerHTML = '';
  resultado.textContent = '';
  mostrarRonda();
  let palabras = mezclar(frases[ronda]);
  palabras.forEach(word => {
    const div = document.createElement('div');
    div.classList.add('palabra');
    // No draggable para evitar drag and drop nativo
    div.textContent = word;
    puzzleDiv.appendChild(div);
  });
  // Imagen y texto especial para la ronda 3 (índice 2) y ronda 6 (índice 5)
  const imagenDiv = document.getElementById('imagen-ronda');
  const textoMitad = document.getElementById('texto-mitad');
  if (ronda === 2) {
    imagenDiv.innerHTML = '<img src="3.jpg" alt="Imagen especial" style="max-width:220px; border-radius:12px; box-shadow:0 2px 8px #0002; margin-top:10px;">';
    textoMitad.innerHTML = '';
  } else if (ronda === 5) {
    textoMitad.innerHTML = '¿Mitad de seis?';
    imagenDiv.innerHTML = '<img src="mitad.jpg" alt="Imagen especial" style="max-width:220px; border-radius:12px; box-shadow:0 2px 8px #0002; margin-top:10px;">';
  } else {
    imagenDiv.innerHTML = '';
    textoMitad.innerHTML = '';
  }
}


let seleccionada = null;

puzzleDiv.addEventListener('click', function(e) {
  const target = e.target.closest('.palabra');
  if (!target) return;
  if (seleccionada === target) {
    target.classList.remove('seleccionada');
    seleccionada = null;
    return;
  }
  if (seleccionada) {
    // Intercambiar texto
    const temp = seleccionada.textContent;
    seleccionada.textContent = target.textContent;
    target.textContent = temp;
    seleccionada.classList.remove('seleccionada');
    seleccionada = null;
  } else {
    target.classList.add('seleccionada');
    seleccionada = target;
  }
});


verificarBtn.addEventListener('click', () => {
  const ordenActual = Array.from(puzzleDiv.children).map(div => div.textContent);
  const imagenDiv = document.getElementById('imagen-ronda');
  if(ordenActual.join(" ") === frases[ronda].join(" ")){
    if(ronda < frases.length - 1){
      resultado.textContent = "¡Correcto! Siguiente frase...";
      setTimeout(() => {
        ronda++;
        cargarFrase();
      }, 1200);
    } else {
      resultado.textContent = "¡FELICIDADES MI AMOR TE AMOOOOOOOOOOO! 💖";
      imagenDiv.innerHTML = '<img src="checo.jpg" alt="Imagen final" style="max-width:240px; border-radius:14px; box-shadow:0 2px 8px #0002; margin-top:10px;">';
    }
  } else {
    resultado.textContent = "Waittt… Intenta reorganizar las palabras.";
  }
});

// Inicializar
cargarFrase();
