let currentVideo = document.getElementById("player");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");
const progressBar = document.getElementById("progress-bar");

// Formatear tiempo
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
}

// Configuración de listeners
function setupVideo(video) {
  currentVideo.addEventListener("loadedmetadata", () => {
    let remainingTime = currentVideo.duration - currentVideo.currentTime;
    if (isNaN(remainingTime)) remainingTime = 0;
    totalTimeDisplay.textContent = formatTime(remainingTime);
    progressBar.style.width = "0%";
  });

  currentVideo.addEventListener("timeupdate", () => {
    const progress = (currentVideo.currentTime / currentVideo.duration) * 100;
    progressBar.style.width = `${progress}%`;
    let remainingTime = currentVideo.duration - currentVideo.currentTime;
    if (isNaN(remainingTime)) remainingTime = 0;
    totalTimeDisplay.textContent = formatTime(remainingTime);
  });

  video.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });
}

// Inicializar video original
setupVideo(currentVideo);

const playOverlay = document.getElementById("play-overlay");

// Función para actualizar el overlay según el estado
function updatePlayOverlay() {
  if (currentVideo.paused) {
    // Aparece instantáneo al pausar
    playOverlay.style.transition = "none";
    playOverlay.style.opacity = 1;
  } else {
    // Desaparece con transición al reproducir
    playOverlay.style.transition = "opacity 0.7s ease";
    playOverlay.style.opacity = 0;
  }
}

// Mostrar al cargar por primera vez
updatePlayOverlay();

// Listeners para cambios de estado
currentVideo.addEventListener("play", updatePlayOverlay);
currentVideo.addEventListener("pause", updatePlayOverlay);

currentVideo.addEventListener("dblclick", () => {
  toggleFullscreen();
});

// Tecla espacio para play/pause
document.addEventListener("keydown", (e) => {
  // Evitar que la página haga scroll con espacio
  if (e.code === "Space") {
    e.preventDefault();
    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  }
});

// Funciones de control
function getVideo() {
  return currentVideo;
}
function playVideo() {
  currentVideo.play();
}
function pauseVideo() {
  currentVideo.pause();
}
function stopVideo() {
  currentVideo.pause();
  currentVideo.currentTime = 0;
}
function restartVideo() {
  currentVideo.currentTime = 0;
  currentVideo.play();
}
function forwardVideo() {
  currentVideo.currentTime = Math.min(
    currentVideo.currentTime + 5,
    currentVideo.duration
  );
}
function rewindVideo() {
  currentVideo.currentTime = Math.max(currentVideo.currentTime - 5, 0);
}

// Barra de progreso
document.querySelector(".custom-timebar").addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  currentVideo.currentTime = (clickX / rect.width) * currentVideo.duration;
});

// Cambiar video al hacer click en miniatura
function showVideo(miniatura) {
  const videoSrc = miniatura.getAttribute("data-video");

  // Siempre cambiamos el src
  currentVideo.style.transition = "opacity 0.5s";
  currentVideo.style.opacity = 0;

  setTimeout(() => {
    currentVideo.src = videoSrc;
    currentVideo.load();
    currentVideo.pause();
    progressBar.style.width = "0%";

    updatePlayOverlay();

    currentVideo.addEventListener(
      "loadeddata",
      () => {
        currentVideo.style.opacity = 1;
      },
      { once: true }
    );
  }, 500);
}

function toggleFullscreen() {
  const videoContainer = document.querySelector(".main-display");

  if (!document.fullscreenElement) {
    // Pedimos pantalla completa
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
      videoContainer.msRequestFullscreen();
    }
  } else {
    // Salimos de pantalla completa
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

const progressTooltip = document.createElement("div");
progressTooltip.className = "progress-tooltip";
progressTooltip.textContent = "00:00:00";
document.body.appendChild(progressTooltip);

const progressBarContainer = document.querySelector(".custom-timebar");

progressBarContainer.addEventListener("mousemove", (e) => {
  const rect = progressBarContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const ratio = offsetX / rect.width;
  const hoverTime = ratio * currentVideo.duration;

  // Formatear como hh:mm:ss
  const hrs = Math.floor(hoverTime / 3600);
  const mins = Math.floor((hoverTime % 3600) / 60);
  const secs = Math.floor(hoverTime % 60);
  progressTooltip.textContent = `${String(hrs).padStart(2, "0")}:${String(
    mins
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  // Posición relativa al body
  progressTooltip.style.left = `${e.pageX}px`;
  progressTooltip.style.top = `${rect.top + window.scrollY - 20}px`; // 20px arriba de la barra
  progressTooltip.style.opacity = 1;
});

progressBarContainer.addEventListener("mouseleave", () => {
  progressTooltip.style.opacity = 0;
});

function adjustProgressBarForFullscreen() {
  const timeBar = document.querySelector(".custom-timebar");
  const timeNumber = document.querySelector(".time-info");

  if (document.fullscreenElement) {
    // En pantalla completa, hacemos la barra más larga
    timeBar.style.width = "93%"; // ajustá al tamaño deseado
    timeBar.style.left = "48%";
    timeBar.style.transform = "translateX(-50%)";
    timeNumber.style.bottom = "2.4%";
    timeNumber.style.left = "97.3%";
    timeNumber.style.transform = "translateX(-50%)";
  } else {
    // Cuando no está en fullscreen, volvemos al tamaño normal
    timeBar.style.width = "90%";
    timeBar.style.left = "46%";
    timeBar.style.transform = "translateX(-50%)";
    timeNumber.style.bottom = "2%";
    timeNumber.style.left = "95.5%";
    timeNumber.style.transform = "translateX(-50%)";
  }
}

// Escuchamos cambios de fullscreen
document.addEventListener("fullscreenchange", adjustProgressBarForFullscreen);
document.addEventListener(
  "webkitfullscreenchange",
  adjustProgressBarForFullscreen
);
document.addEventListener(
  "mozfullscreenchange",
  adjustProgressBarForFullscreen
);
document.addEventListener("MSFullscreenChange", adjustProgressBarForFullscreen);

// Llamada inicial por si ya estaba en fullscreen
adjustProgressBarForFullscreen();

let hideTimeout;

function showControls() {
  const timeBar = document.querySelector(".custom-timebar");
  const timeNumber = document.querySelector(".time-info");

  // Mostramos los controles
  timeBar.style.opacity = 1;
  timeBar.style.pointerEvents = "auto";
  timeNumber.style.opacity = 1;
  timeNumber.style.pointerEvents = "auto";

  // Limpiamos cualquier timeout previo
  clearTimeout(hideTimeout);

  // Ocultamos controles tras 3 segundos de inactividad
  hideTimeout = setTimeout(() => {
    timeBar.style.opacity = 0;
    timeBar.style.pointerEvents = "none";
    timeNumber.style.opacity = 0;
    timeNumber.style.pointerEvents = "none";
  }, 2000);
}

// Mousemove en todo el mainDisplay
const mainDisplay = document.querySelector(".main-display");
mainDisplay.addEventListener("mousemove", showControls);

// Llamada inicial para que aparezcan al cargar
showControls();
