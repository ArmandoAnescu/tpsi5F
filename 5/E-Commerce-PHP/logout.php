<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start(); // Avvia la sessione solo se non è già attiva
}
session_destroy();
header("Location: index.php");
exit;
