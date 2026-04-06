<?php
/**
 * enviar_correo.php - Procesa el formulario de contacto de Citerior
 */

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recoger y limpiar datos
    $nombre = strip_tags(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telefono = strip_tags(trim($_POST["telefono"]));
    $mensaje = strip_tags(trim($_POST["mensaje"]));

    // Validación básica
    if (empty($nombre) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "error|Por favor, completa los campos obligatorios correctamente.";
        exit;
    }

    // Configuración del correo
    $destinatario = "web@citerior.com"; 
    $asunto = "Nueva consulta web de: $nombre";

    $contenido = "Has recibido un nuevo mensaje desde el formulario de contacto de la web:\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Teléfono: " . ($telefono ?: "No proporcionado") . "\n\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    $headers = "From: no-reply@citerior.com\r\n"; // Es mejor usar un correo del propio dominio para evitar filtros de spam
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($destinatario, $asunto, $contenido, $headers)) {
        echo "ok|¡Gracias! Tu mensaje ha sido enviado correctamente.";
    } else {
        echo "error|Lo sentimos, el servidor no pudo enviar el correo. Inténtalo de nuevo más tarde.";
    }
} else {
    echo "error|Acceso no permitido.";
}
