const data = {
  adan: [
    {
      titulo: "Adán - Video 1",
      miniatura: "./imagenes/documentales/miniatura2.png",
      video:
        "./videos/videoteca/La Fenomenología de los Biofotones (La Luz de nuestro Ser) (corto).mp4",
    },
    {
      titulo: "Adán - Video 2",
      miniatura: "./imagenes/documentales/miniatura2.png",
      video:
        "./videos/videoteca/La Cámara Kirlian y sus interesantes revelaciones (corto).mp4",
    },
  ],

  "adan-kadmon": [
    {
      titulo: "Adán Kadmón - Video 1",
      miniatura: "./imagenes/videoteca/thumb4.png",
      video: "./videos/videoteca/Perfiles de El Aura Humana.mp4",
    },
  ],

  adapa: [
    {
      titulo: "Adapa - Video 2",
      miniatura: "./imagenes/videoteca/thumb8.png",
      video:
        "./videos/videoteca/La Fenomenología de los Biofotones (La Luz de nuestro Ser) (corto).mp4",
    },
    {
      titulo: "Adapa - Video 1",
      miniatura: "./imagenes/videoteca/thumb7.png",
      video: "./videos/videoteca/Perfiles de El Aura Humana.mp4",
    },
  ],
};

const contenedorVideos = document.getElementById("videos-relacionados");
const contenedorTitulos = document.getElementById("titulos-column");
const videoPlayer = document.getElementById("videoplayer");
const videoSource = document.getElementById("video-source");

let tituloActual = null;
let indiceVideoActual = 0;

// -------------------------------------------------------------
// 1) GENERAR TITULOS AUTOMATICAMENTE
// -------------------------------------------------------------
function generarTitulos() {
  contenedorTitulos.innerHTML = "";

  Object.keys(data).forEach((clave) => {
    contenedorTitulos.innerHTML += `
      <div class="titulo-item" data-titulo="${clave}">
        <img
          src="./imagenes/videoteca/44-Botón Base para Títulos Videoteca.png"
          class="titulo-item-fondo"
        />
        <div class="titulo-item-texto">${formatearTitulo(clave)}</div>
      </div>
    `;
  });

  activarClicksTitulos();
}

// Convierte "adan-kadmon" → "Adán Kadmón"
function formatearTitulo(t) {
  return t.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// -------------------------------------------------------------
// 2) ACTIVAR CLICK EN TITULOS
// -------------------------------------------------------------
function activarClicksTitulos() {
  document.querySelectorAll(".titulo-item").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".titulo-item")
        .forEach((el) => el.classList.remove("selected"));

      item.classList.add("selected");

      const key = item.dataset.titulo;
      tituloActual = key;
      indiceVideoActual = 0;

      cargarVideosRelacionados(data[key]);
    });
  });
}

// -------------------------------------------------------------
// 3) CARGAR VIDEOS RELACIONADOS EN LA COLUMNA
// -------------------------------------------------------------
function cargarVideosRelacionados(videos) {
  contenedorVideos.innerHTML = "";

  videos.forEach((v, index) => {
    /*contenedorVideos.innerHTML += `
      <div class="titulo-miniatura-boton">
        <div class="titulo-del-video">${v.titulo}</div>

        <img 
          src="${v.miniatura}"
          class="boton-de-muestra"
          data-index="${index}"
          data-video="${v.video}"
        >
      </div>
    `;*/
    contenedorVideos.innerHTML += `
      <div class="titulo-miniatura-boton">
          <img src="./imagenes/videoteca/(Videoteca) Botón de Muestra con título 1.png" class="boton-de-muestra-titulo">

          <img 
            src="./imagenes/videoteca/(Videoteca) Botón de Muestra 1.png"
            class="boton-de-muestra"
            data-index="${index}"
            data-video="${v.video}"
          >
        </div>
    `;
  });

  activarClicksMiniaturas();

  if (videos && videos.length > 0) {
    indiceVideoActual = 0;
    videoSource.src = videos[0].video;
    videoPlayer.load();
  }
}

// -------------------------------------------------------------
// 4) CLICKS EN MINIATURAS
// -------------------------------------------------------------
function activarClicksMiniaturas() {
  document.querySelectorAll("[data-video]").forEach((mini) => {
    mini.addEventListener("click", () => {
      const url = mini.dataset.video;
      indiceVideoActual = parseInt(mini.dataset.index);

      videoSource.src = url;
      videoPlayer.load();
      videoPlayer.play();
    });
  });
}

// -------------------------------------------------------------
// 5) BOTONES DE CONTROL
// -------------------------------------------------------------
function playVideo() {
  videoPlayer.play();
}
function pauseVideo() {
  videoPlayer.pause();
}
function stopVideo() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
}
function restartVideo() {
  videoPlayer.currentTime = 0;
  videoPlayer.play();
}

function siguienteVideo() {
  if (!tituloActual) return;

  const lista = data[tituloActual];
  indiceVideoActual = (indiceVideoActual + 1) % lista.length;

  videoSource.src = lista[indiceVideoActual].video;
  videoPlayer.load();
  videoPlayer.play();
}

function anteriorVideo() {
  if (!tituloActual) return;

  const lista = data[tituloActual];
  indiceVideoActual = (indiceVideoActual - 1 + lista.length) % lista.length;

  videoSource.src = lista[indiceVideoActual].video;
  videoPlayer.load();
  videoPlayer.play();
}

// -------------------------------------------------------------
// 6) INICIO AUTOMATICO
// -------------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  generarTitulos();

  // Clic automático en el primer título
  const primerTitulo = document.querySelector(".titulo-item");
  if (primerTitulo) primerTitulo.click();
});
