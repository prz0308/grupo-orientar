const documentales = [
  {
    miniatura: "./imagenes/documentales/miniatura2.png",
    video: "./videos/documentales/293788_small.mp4",
  },
  {
    miniatura: "./imagenes/documentales/miniatura1.png",
    video: "./videos/documentales/304330_small.mp4",
  },
  {
    miniatura: "./imagenes/documentales/miniatura2.png",
    video: "./videos/documentales/236711_small.mp4",
  },
  {
    miniatura: "./imagenes/documentales/miniatura1.png",
    video: "./videos/documentales/152085-802335503_small.mp4",
  },
  {
    miniatura: "./imagenes/documentales/miniatura2.png",
    video: "./videos/documentales/304330_small.mp4",
  },
  {
    miniatura: "./imagenes/documentales/miniatura1.png",
    video: "./videos/documentales/293788_small.mp4",
  },
];

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
    contenedor.innerHTML += `
      <div class="video-item" data-index="${i}">
        <img src="${item.miniatura}" class="video-item-miniatura">
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
  source.src = documentales[index].video;
  player.load();
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
  generarLista();
  cargarVideo(0);
  marcarSeleccionado(0);
});
