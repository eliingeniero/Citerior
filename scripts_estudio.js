// scripts_estudio.js
// Este script gestiona la animación de aparición y desaparición de los miembros del equipo
// en la página 'estudio.html' utilizando la Intersection Observer API.

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los elementos con la clase 'member-row' que representan a cada miembro del equipo.
  const miembros = document.querySelectorAll(".member-row");

  // Opciones para el Intersection Observer.
  const observerOptions = {
    root: null, // El viewport es el elemento raíz que se observa.
    /*
       rootMargin define un margen alrededor del viewport. Los valores negativos encogen el área de detección,
       mientras que los positivos la expanden.
       - "-74px 0px -50px 0px":
         - Top: -74px (margen superior negativo de 74px). Esto hace que el elemento se considere
           "fuera de vista" 92px antes de llegar al borde superior real del viewport.
           Este valor está calculado para coincidir con la altura de la barra de navegación fija (.barrarriba),
           asegurando que los elementos desaparezcan justo cuando se ocultan bajo la barra.
         - Bottom: -50px (margen inferior negativo de 50px). Esto hace que el elemento se considere
           "en vista" 50px antes de llegar al borde inferior real del viewport, o "fuera de vista"
           50px antes de salir completamente por la parte inferior.
    */
    rootMargin: "-74px 0px -50px 0px",
    threshold: 0.2, // El callback se ejecuta cuando el 20% del elemento es visible (o el 80% no lo es).
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Si el elemento está intersectando (es decir, es visible según el threshold y rootMargin),
      // añade la clase 'reveal' para activar la animación de aparición.
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      } else {
        // Si el elemento ya no está intersectando, quita la clase 'reveal' para activar
        // la animación de desaparición.
        entry.target.classList.remove("reveal");
      }
    });
  }, observerOptions);

  // Observa cada miembro del equipo.
  miembros.forEach((miembro) => observer.observe(miembro));
});
