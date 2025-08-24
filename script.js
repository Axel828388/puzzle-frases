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
    div.setAttribute('draggable', true);
    div.textContent = word;
    puzzleDiv.appendChild(div);
  });
  // Imagen especial para la ronda 3 (índice 2)
  const imagenDiv = document.getElementById('imagen-ronda');
  if (ronda === 2) {
    imagenDiv.innerHTML = '<img src="3.jpg" alt="Imagen especial" style="max-width:220px; border-radius:12px; box-shadow:0 2px 8px #0002; margin-top:10px;">';
  } else {
    imagenDiv.innerHTML = '';
  }
}

// Drag & Drop
let dragged = null;

puzzleDiv.addEventListener('dragstart', (e) => {
  dragged = e.target;
  e.target.classList.add('dragging');
});

puzzleDiv.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
  dragged = null;
});

puzzleDiv.addEventListener('dragover', (e) => {
  e.preventDefault();
  const target = e.target;
  if(target.classList.contains('palabra') && target !== dragged){
    const rect = target.getBoundingClientRect();
    const next = (e.clientX - rect.left) / rect.width > 0.5;
    puzzleDiv.insertBefore(dragged, next ? target.nextSibling : target);
  }
});

// Verificar orden y pasar a la siguiente ronda
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
    resultado.textContent = "No aún… Intenta reorganizar las palabras.";
  }
});

// Inicializar
cargarFrase();
