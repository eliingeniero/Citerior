/**
 * Lógica del visor de galería para proyectos.html
 */
let imagenesActuales = [];
let indiceActual = 0;

function abrirProyecto(titulo, imagenes) {
  imagenesActuales = imagenes;
  indiceActual = 0;
  document.getElementById("proyectoTitulo").innerText = titulo;
  document.getElementById("proyectoImagen").src = imagenesActuales[indiceActual];
  document.getElementById("proyectoVisor").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function cerrarProyecto() {
  document.getElementById("proyectoVisor").style.display = "none";
  document.body.style.overflow = "auto";
}

function cambiarImagen(dir) {
  indiceActual += dir;
  if (indiceActual < 0) indiceActual = imagenesActuales.length - 1;
  if (indiceActual >= imagenesActuales.length) indiceActual = 0;
  document.getElementById("proyectoImagen").src = imagenesActuales[indiceActual];
}

// Evento para cerrar al pulsar fuera del visor
window.addEventListener("click", (e) => {
  const visor = document.getElementById("proyectoVisor");
  if (e.target === visor) cerrarProyecto();
});
