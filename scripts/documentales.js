// Funciones de control
function getVideo() {
  return document.getElementById("player");
}

function playVideo() {
  const video = getVideo();
  if (video) video.play();
}

function pauseVideo() {
  const video = getVideo();
  if (video) video.pause();
}

function stopVideo() {
  const video = getVideo();
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

function restartVideo() {
  const video = getVideo();
  if (video) {
    video.currentTime = 0;
    video.play();
  }
}

function forwardVideo() {
  const video = getVideo();
  if (video) video.currentTime += 5;
}

function rewindVideo() {
  const video = getVideo();
  if (video) video.currentTime -= 5;
}

// Formatear tiempo en MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Función para mostrar un video
function showVideo(miniatura) {
  const mainDisplay = document.querySelector(".main-display");
  const videoSrc = miniatura.getAttribute("data-video");

  mainDisplay.innerHTML = `
    <video id="player" autoplay width="100%" height="100%">
      <source src="${videoSrc}" type="video/mp4">
      Tu navegador no soporta la reproducción de video.
    </video>
  `;

  // Capturamos el nuevo video
  const video = getVideo();
  const currentTimeDisplay = document.getElementById("current-time");
  const totalTimeDisplay = document.getElementById("total-time");
  const progressBar = document.getElementById("progress-bar");

  // Actualizar duración total
  video.addEventListener("loadedmetadata", () => {
    totalTimeDisplay.textContent = formatTime(video.duration);
  });

  // Actualizar tiempo y barra
  video.addEventListener("timeupdate", () => {
    currentTimeDisplay.textContent = formatTime(video.currentTime);
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  // Click en video: play/pause
  video.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });

  // Click en barra: saltar a tiempo
  document.querySelector(".custom-timebar").addEventListener("click", (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (video) video.currentTime = (clickX / rect.width) * video.duration;
  });
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const initialVideo = getVideo();
  const currentTimeDisplay = document.getElementById("current-time");
  const totalTimeDisplay = document.getElementById("total-time");
  const progressBar = document.getElementById("progress-bar");

  // Configurar tiempo y barra para el video inicial
  if (initialVideo) {
    initialVideo.addEventListener("loadedmetadata", () => {
      totalTimeDisplay.textContent = formatTime(initialVideo.duration);
    });

    initialVideo.addEventListener("timeupdate", () => {
      currentTimeDisplay.textContent = formatTime(initialVideo.currentTime);
      const progress = (initialVideo.currentTime / initialVideo.duration) * 100;
      progressBar.style.width = `${progress}%`;
    });

    initialVideo.addEventListener("click", () => {
      if (initialVideo.paused) initialVideo.play();
      else initialVideo.pause();
    });

    document.querySelector(".custom-timebar").addEventListener("click", (e) => {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      initialVideo.currentTime = (clickX / rect.width) * initialVideo.duration;
    });
  }
});
