<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"])) {
    $id = $_POST['id'];
    $quantita = isset($_POST['quantita']) ? (int)$_POST['quantita'] : 1;
    $colore = isset($_POST['colore']) ? $_POST['colore'] : "N/A";
    if (!isset($_SESSION["cart"])) {
        $_SESSION["cart"] = [];
    }

    // Se il prodotto è già nel carrello, aggiorna la quantità
    if (isset($_SESSION["cart"][$id])) {
        $nuovaQuantita = 0;
        $nuovaQuantita = ($_SESSION["cart"][$id]['quantita'] + $quantita) > $maxQuantita ? $maxQuantita : $_SESSION["cart"][$id]['quantita'] + $quantita;
        $_SESSION["cart"][$id]["quantita"] += $nuovaQuantita;
    } else {
        $_SESSION["cart"][$id] = [
            'id' => $id,
            'quantita' => $quantita,
            'colore' => $colore
        ];
    }
}
