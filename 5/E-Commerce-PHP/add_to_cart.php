<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"]) && isset($_SESSION['id'])) {
    $id = $_POST['id'];
    $quantita = isset($_POST['quantita']) ? (int)$_POST['quantita'] : 1;
    $nome = isset($_POST['nome']) ? $_POST['nome'] : 'N/A';
    $colore = isset($_POST['colore']) ? $_POST['colore'] : "N/A"; // Nome del colore (es. "Rosso")
    $maxQuantita = isset($_POST['maxQuantita']) ? $_POST['maxQuantita'] : 20;
    $immagine = $_POST['immagine'] ?? null; // Percorso dell'immagine (es. "immagini_prodotti/nintendo_ds/nintendods_nero.jpg")
    $prezzo = $_POST['prezzo'] ?? 0.0;

    if (!isset($_SESSION["cart"])) {
        $_SESSION["cart"] = [];
    }

    // Se il prodotto è già nel carrello, aggiorna la quantità
    if (isset($_SESSION["cart"][$id])) {
        $nuovaQuantita = ($_SESSION["cart"][$id]['quantita'] + $quantita) > $maxQuantita ? $maxQuantita : $_SESSION["cart"][$id]['quantita'] + $quantita;
        echo "Quantità aggiornata a $nuovaQuantita.";
        $_SESSION["cart"][$id]["quantita"] = $nuovaQuantita;
    } else {
        $_SESSION["cart"][$id] = [
            'id' => $id,
            'nome' => $nome,
            'quantita' => $quantita,
            'colore' => $colore, // Il nome del colore
            'immagine' => $immagine, // Il percorso dell'immagine
            'prezzo' => $prezzo
        ];
    }
    echo "1";
    exit;
} else {
    echo "0";
    exit;
}
