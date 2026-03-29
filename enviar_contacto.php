<?php
/**
 * enviar_contacto.php - Procesamiento con PHPMailer
 */

// Permitir que GitHub Pages acceda a este script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Ajuste de rutas según tu carpeta php/src
require 'php/src/Exception.php';
require 'php/src/PHPMailer.php';
require 'php/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre   = isset($_POST['nombre']) ? strip_tags(trim($_POST['nombre'])) : "";
    $email    = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefono = isset($_POST['telefono']) ? strip_tags(trim($_POST['telefono'])) : "No facilitado";
    $mensaje  = isset($_POST['mensaje']) ? strip_tags(trim($_POST['mensaje'])) : "";

    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo "error|Por favor, rellena todos los campos obligatorios (*).";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // --- CONFIGURACIÓN SMTP ---
        $mail->isSMTP();
        $mail->Host       = 'citerior-com.correoseguro.dinaserver.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'web@citerior.com';
        $mail->Password   = 'RMTjN2*191w)'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL para el puerto 465
        $mail->Port       = 465;
        $mail->CharSet    = 'UTF-8';

        // --- DESTINATARIOS ---
        $mail->setFrom('web@citerior.com', 'Web Citerior');
        $mail->addAddress('web@citerior.com'); 
        $mail->addReplyTo($email, $nombre);

        // --- CONTENIDO ---
        $mail->isHTML(true);
        $mail->Subject = "Nuevo mensaje de contacto: $nombre";
        $mail->Body    = "<h3>Mensaje desde la web</h3>
                          <p><strong>Nombre:</strong> $nombre<br>
                          <strong>Email:</strong> $email<br>
                          <strong>Teléfono:</strong> $telefono<br>
                          <strong>Mensaje:</strong><br>" . nl2br($mensaje) . "</p>";

        $mail->send();
        echo "ok|Mensaje enviado correctamente.";
    } catch (Exception $e) {
        echo "error|No se pudo enviar: {$mail->ErrorInfo}";
    }
} else {
    echo "error|Acceso no autorizado.";
}
