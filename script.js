// --- Modo swap por toque (funciona en móvil y desktop) ---
let selectedSwap = null;

puzzleDiv.addEventListener('click', function(e) {
  const target = e.target.closest('.palabra');
  if (!target) return;
  if (selectedSwap === target) {
    target.classList.remove('dragging');
    selectedSwap = null;
    return;
  }
  if (!selectedSwap) {
    selectedSwap = target;
    target.classList.add('dragging');
  } else {
    // Intercambiar posiciones
    const all = Array.from(puzzleDiv.children);
    const idx1 = all.indexOf(selectedSwap);
    const idx2 = all.indexOf(target);
    if (idx1 > -1 && idx2 > -1 && idx1 !== idx2) {
      if (idx1 < idx2) {
        puzzleDiv.insertBefore(selectedSwap, target.nextSibling);
      } else {
        puzzleDiv.insertBefore(selectedSwap, target);
      }
    }
    selectedSwap.classList.remove('dragging');
    selectedSwap = null;
  }
});
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
  //div.setAttribute('draggable', true); // Deshabilitado para modo swap por toques
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


// Drag & Drop deshabilitado para modo swap por toques

// Soporte táctil para móviles
let touchDragging = null;
let touchStartIndex = null;

puzzleDiv.addEventListener('touchstart', function(e) {
  const target = e.target.closest('.palabra');
  if (!target) return;
  touchDragging = target;
  touchDragging.classList.add('dragging');
  touchStartIndex = Array.from(puzzleDiv.children).indexOf(touchDragging);
}, {passive: true});

puzzleDiv.addEventListener('touchmove', function(e) {
  if (!touchDragging) return;
  e.preventDefault();
  const touch = e.touches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  const over = elem && elem.closest('.palabra');
  if (over && over !== touchDragging) {
    const overIndex = Array.from(puzzleDiv.children).indexOf(over);
    if (overIndex > -1) {
      puzzleDiv.insertBefore(touchDragging, overIndex > touchStartIndex ? over.nextSibling : over);
      touchStartIndex = overIndex;
    }
  }
}, {passive: false});

puzzleDiv.addEventListener('touchend', function(e) {
  if (touchDragging) {
    touchDragging.classList.remove('dragging');
    touchDragging = null;
    touchStartIndex = null;
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
