/**
 * Gestión del visor de servicios para servicios.html
 */
function abrirServicio(titulo, descripcion, logo = null) {
  const visor = document.getElementById("servicioVisor");
  const logoContenedor = document.getElementById("visorLogoContenedor");
  const logoImg = document.getElementById("visorLogo");

  document.getElementById("servicioTitulo").innerText = titulo;
  document.getElementById("servicioDescripcion").innerHTML = descripcion;

  if (logo) {
    logoImg.src = logo;
    logoContenedor.style.display = "block";
  } else {
    logoContenedor.style.display = "none";
  }

  visor.classList.add("active");
  document.body.style.overflow = "hidden"; // Bloquea el scroll de la página de fondo
}

function cerrarServicio() {
  const visor = document.getElementById("servicioVisor");
  visor.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Cerrar al hacer clic fuera del contenido blanco
window.addEventListener("click", (e) => {
  const visor = document.getElementById("servicioVisor");
  if (e.target === visor) cerrarServicio();
});
