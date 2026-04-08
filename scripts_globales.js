/**
 * Lógica global para el banner de cookies y utilidades comunes.
 */
function handleCookies(decision) {
  localStorage.setItem("cookieConsent", decision);
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.style.display = "none";
}

window.addEventListener("load", () => {
  const banner = document.getElementById("cookie-banner");
  if (banner && !localStorage.getItem("cookieConsent")) {
    banner.style.display = "block";
  }
});
