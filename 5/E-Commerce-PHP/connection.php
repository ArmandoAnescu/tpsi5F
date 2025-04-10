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
         LIMIT 1) AS immagine FROM prodotti p";
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
    $query = "SELECT p.id, p.nome, p.prezzo, p.descrizione,p.quantita, 
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

function Login($email, $password)
{
    global $db;
    $query = "SELECT u.id,u.username,u.email,u.password FROM utenti u WHERE email=:email";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':email', $email);
        $stm->execute();
        $result = $stm->fetch(PDO::FETCH_ASSOC);
        $stm->closeCursor();
        if ($result && password_verify($password, $result['password'])) {
            return [
                'id' => $result['id'],
                'username' => $result['username'],
                'email' => $result['email']
            ];
        } else {
            return null;
        }
    } catch (Exception $e) {
        logError($e);
        return null;
    }
}

function Register($username, $password, $email)
{
    global $db;
    $query = "INSERT INTO utenti (username, password, email) VALUES (:username, :password, :email)";
    $check = "SELECT * FROM utenti WHERE username = :username OR email = :email";
    try {
        $stm = $db->prepare($check);
        $stm->bindValue(':email', $email);
        $stm->bindValue(':username', $username);
        $stm->execute();
        $result = $stm->fetchAll(PDO::FETCH_ASSOC);
        $stm->closeCursor();
        if ($result) {
            return false;
        }

        $stm = $db->prepare($query);
        $stm->bindValue(':username', $username);
        $stm->bindValue(':password', $password);
        $stm->bindValue(':email', $email);
        $stm->execute();
        $stm->closeCursor();
        return true;
    } catch (Exception $e) {
        logError($e);
        return false;
    }
}

function CercaSpecifiche($id): bool
{
    global $db;
    $query = "SELECT * FROM specifiche WHERE prodotto = :id";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':id', $id);
        $stm->execute();
        $prodotto = $stm->fetch(PDO::FETCH_ASSOC);
        $stm->closeCursor();
        if ($prodotto) {
            return true;
        } else {
            return false;
        }
    } catch (Exception $e) {
        logError($e);
        return false;
    }
}

function OttieniSpecifiche($id): ?array
{
    global $db;
    $query = "SELECT * FROM specifiche WHERE prodotto = :id";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':id', $id);
        $stm->execute();
        $spec = $stm->fetch(PDO::FETCH_ASSOC);
        $stm->closeCursor();
        return $spec;
    } catch (Exception $e) {
        logError($e);
        return null;
    }
}

function SalvaCarrello()
{
    global $db;
    $query = "INSERT INTO carrelli (contenuto,utente) VALUES (:contenuto,:id)";
    if (PHP_SESSION_NONE === session_status()) {
        session_start();
    }
    if (isset($_SESSION['cart'])) {
        $cart_json = json_encode($_SESSION['cart']);
    }
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':id', $_SESSION['id']);
        $stm->bindValue(':contenuto', $cart_json);
        $stm->execute();
        $stm->closeCursor();
    } catch (Exception $e) {
        logError($e);
    }
}

function CaricaCarrello()
{
    global $db;

    if (PHP_SESSION_NONE === session_status()) {
        session_start();
    }

    if (!isset($_SESSION['id'])) {
        return;
    }

    $user_id = $_SESSION['id'];

    $query = "SELECT contenuto FROM carrelli WHERE utente = :id";

    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':id', $user_id);
        $stm->execute();

        $result = $stm->fetch(PDO::FETCH_ASSOC);

        if ($result && !empty($result['contenuto'])) {
            $_SESSION['cart'] = json_decode($result['contenuto'], true);
        }

        $stm->closeCursor();
    } catch (Exception $e) {
        logError($e);
    }
}

function OttieniBundle(): ?array
{
    global $db;
    $query = "SELECT * FROM bundle";
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

function OttieniBundleSpecifico($id): ?array
{
    global $db;
    $query = "SELECT * FROM bundle WHERE id = :id";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':id', $id);
        $stm->execute();
        $prodotti = $stm->fetch(PDO::FETCH_ASSOC);
        $stm->closeCursor();
    } catch (Exception $e) {
        logError($e);
        return null;
    }
    return $prodotti;
}

function OttieniProdottiBundle($id): ?array
{
    global $db;
    $query = "SELECT p.id, p.nome, 
               (SELECT i.percorso 
                FROM immagini i 
                WHERE i.prodotto = p.id 
                LIMIT 1) AS immagine 
        FROM prodotti p
        INNER JOIN appartenere a ON a.prodotto = p.id
        WHERE a.bundle = :id";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':id', $id, PDO::PARAM_INT);
        $stm->execute();
        $prodotti = $stm->fetchAll(PDO::FETCH_ASSOC);
        $stm->closeCursor();

        return $prodotti; // Array associativo con tutti i prodotti nel bundle
    } catch (Exception $e) {
        logError($e);
        return null;
    }
}

function CodiceSconto($codice): ?array
{
    global $db;
    $query = "SELECT * FROM codici_sconto WHERE codice = :codice ";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':codice', $codice);
        $val = $stm->fetch(PDO::FETCH_ASSOC);
        $stm->closeCursor();
    } catch (Exception $e) {
        logError($e);
        return null;
    }
    return $val;
}

function ControllaCodice($codice, $id)
{
    global $db;
    $query = "SELECT * FROM usare WHERE codice_sconto = :codice_sconto AND user = :user";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':codice', $codice);
        $stm->bindValue(':user', $id);
        $stm->execute();
        if ($stm->rows() > 0) {
            $stm->closeCursor();
            return true;
        } else {
            $stm->closeCursor();
            return false; // Codice non trovato
        }
    } catch (Exception $e) {
        logError($e);
        return false;
    }
}

function RegistraCodice($codice, $email)
{
    global $db;
    $query = "INSERT INTO ecommerce.usare (codice_sconto, user) VALUES (:codice_sconto, :user)";
    try {
        $stm = $db->prepare($query);
        $stm->bindValue(':codice_sconto', $codice);
        $stmt->bindParam(':user', $email);
    } catch (Exception $e) {
    }
}
