const documentales = [
  {
    video: "./videos/documentales/293788_small.mp4",
    titulo: "Y tú que sabes ?...",
  },
  {
    video: "./videos/documentales/304330_small.mp4",
    titulo: "Mansajes del Agua (Masaro Emoto)",
  },
  {
    video: "./videos/documentales/236711_small.mp4",
    titulo: "Programa 60 Minutos (Caso OVNI Edward Meyer)",
  },
  {
    video: "./videos/documentales/152085-802335503_small.mp4",
    titulo: "El Incidante OVNI de Magé (Brasil)",
  },
  {
    video: "./videos/documentales/304330_small.mp4",
    titulo: "El Incidente OVNI en la Escuela Ariel (Africa)",
  },
  {
    video: "./videos/documentales/293788_small.mp4",
    titulo: "El Incidente OVNI de Varginha (Brasil)",
  },
  {
    video: "./videos/documentales/293788_small.mp4",
    titulo: "Estrellamiento OVNI en Desierto de Kalahari",
  },
  {
    video: "./videos/documentales/293788_small.mp4",
    titulo: "Interrogatorio a un Extraterrestre",
  },
  {
    video: "./videos/documentales/293788_small.mp4",
    titulo: "Filmación Original ETs de Varginha (Brasil)",
  },
];

const miniA = "./imagenes/documentales/miniatura1.png";
const miniB = "./imagenes/documentales/miniatura2.png";

const contenedor = document.querySelector(".videos-column");
const player = document.getElementById("player");
const source = player.querySelector("source");

let indiceActual = 0;

// --------------------------------------------------------
// 1) GENERAR LISTA DINÁMICAMENTE
// --------------------------------------------------------
function generarLista() {
  contenedor.innerHTML = "";

  documentales.forEach((item, i) => {
    const miniaturaAlternada = i % 2 === 0 ? miniA : miniB;

    contenedor.innerHTML += `
      <div class="video-item" data-index="${i}">
        <img src="${miniaturaAlternada}" class="video-item-miniatura">
        <div class="titulo-documental">${item.titulo}</div>
      </div>
    `;
  });

  activarClicks();
}

// --------------------------------------------------------
// 2) CLICK: CARGAR Y MARCAR SELECCIONADO
// --------------------------------------------------------
function activarClicks() {
  document.querySelectorAll(".video-item").forEach((el) => {
    el.addEventListener("click", () => {
      const index = parseInt(el.dataset.index);
      indiceActual = index;

      cargarVideo(index);
      marcarSeleccionado(index);
    });
  });
}

function cargarVideo(index) {
  player.classList.add("fading");
  setTimeout(() => {
    source.src = documentales[index].video;
    player.load();
    void player.offsetWidth;
    player.classList.remove("fading");
  }, 500);
}

function marcarSeleccionado(i) {
  document
    .querySelectorAll(".video-item")
    .forEach((el) => el.classList.remove("selected"));

  document
    .querySelector(`.video-item[data-index="${i}"]`)
    .classList.add("selected");
}

// --------------------------------------------------------
// 3) BOTONES DE CONTROL
// --------------------------------------------------------
function playVideo() {
  player.play();
}
function pauseVideo() {
  player.pause();
}
function stopVideo() {
  player.pause();
  player.currentTime = 0;
}
function restartVideo() {
  player.currentTime = 0;
  player.play();
}
function siguienteVideo() {
  indiceActual = (indiceActual + 1) % documentales.length;
  cargarVideo(indiceActual);
  marcarSeleccionado(indiceActual);
}
function anteriorVideo() {
  indiceActual = (indiceActual - 1 + documentales.length) % documentales.length;
  cargarVideo(indiceActual);
  marcarSeleccionado(indiceActual);
}

// --------------------------------------------------------
// 4) INICIALIZACIÓN
// --------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  documentales.sort((a, b) => a.titulo.localeCompare(b.titulo));
  generarLista();
  cargarVideo(0);
  marcarSeleccionado(0);
});
