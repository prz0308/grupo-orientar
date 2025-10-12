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
