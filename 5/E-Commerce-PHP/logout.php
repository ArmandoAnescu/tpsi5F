<?php
require 'connection.php';
session_start();
if (isset($_SESSION['cart'])) {
    SalvaCarrello(); // Salva il carrello
}
session_destroy();
header("Location: index.php");
exit;
