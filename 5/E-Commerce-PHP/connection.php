<?php
require 'config/dbconfig.php';
require_once 'config/dbcon.php';
$config = require 'config/dbconfig.php';
$db = dbcon::getDb($config);

function logError(Exception $e): void
{
    error_log($e->getMessage() . "---" . date('Y-m-d H:i:s' . "\n"), 3, 'dberror/error_logfile.log');
    echo "DB error.Try again";
}
function OttieniProdotti(): ?array
{
    global $db;
    $query = "SELECT p.id, p.nome, p.prezzo, p.descrizione, 
        (SELECT i.percorso 
         FROM immagini i 
         WHERE i.prodotto = p.id 
         LIMIT 1) AS immagine FROM prodotti p;";
    try {
        $stm = $db->prepare($query);
        $stm->execute();
        $prodotti = $stm->fetchAll(PDO::FETCH_ASSOC);
        $stm->closeCursor();
    } catch (Exception $e) {
        logError($e);
        return null;
    }
    return $prodotti;
}

function OttieniProdotto($id)
{
    global $db;
    $query = "SELECT p.id, p.nome, p.prezzo, p.descrizione, 
    (SELECT i.percorso 
     FROM immagini i 
     WHERE i.prodotto = p.id 
     LIMIT 1) AS immagine FROM prodotti p
     WHERE id=:id";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':id', $id);
        $stm->execute();
        $prodotto = $stm->fetch(PDO::FETCH_ASSOC);
        $stm->closeCursor();
    } catch (Exception $e) {
        logError($e);
        return null;
    }
    return $prodotto;
}

function OttieniImmaginiProdotto($id)
{
    global $db;
    $query = "SELECT * 
     FROM immagini i 
     WHERE i.prodotto =:id";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':id', $id);
        $stm->execute();
        $prodotto = $stm->fetchAll(PDO::FETCH_ASSOC);
        $stm->closeCursor();
    } catch (Exception $e) {
        logError($e);
        return null;
    }
    return $prodotto;
}
