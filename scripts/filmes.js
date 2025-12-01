const filmes = [
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

const imagenBoton =
  "./imagenes/filmes/g-(Filmes) Botón base p corredera para multiplicar.png";

const contenedor = document.querySelector(".filmes-column");
const player = document.getElementById("player-filmes");
const source = player.querySelector("source");

let indiceActual = 0;

// --------------------------------------------------------
// 1) GENERAR LISTA DINÁMICAMENTE
// --------------------------------------------------------
function generarLista() {
  contenedor.innerHTML = "";

  filmes.forEach((item, i) => {
    contenedor.innerHTML += `
      <div class="filmes-item" data-index="${i}">
        <img src="${imagenBoton}" class="filmes-item-boton">
        <div class="titulo-filmes">${item.titulo}</div>
      </div>
    `;
  });

  activarClicks();
}

// --------------------------------------------------------
// 2) CLICK: CARGAR Y MARCAR SELECCIONADO
// --------------------------------------------------------
function activarClicks() {
  document.querySelectorAll(".filmes-item").forEach((el) => {
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
    source.src = filmes[index].video;
    player.load();
    void player.offsetWidth;
    player.classList.remove("fading");
  }, 500);
}

function marcarSeleccionado(i) {
  document
    .querySelectorAll(".filmes-item")
    .forEach((el) => el.classList.remove("selected"));

  document
    .querySelector(`.filmes-item[data-index="${i}"]`)
    .classList.add("selected");
}

// --------------------------------------------------------
// 3) INICIALIZACIÓN
// --------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  filmes.sort((a, b) => a.titulo.localeCompare(b.titulo));
  generarLista();
  cargarVideo(0);
  marcarSeleccionado(0);
});
