<?php
require 'connection.php';
session_start(); // Assicurati che la sessione sia attiva
switch ($_REQUEST['action']) {
    case 'login':
        session_start(); // Assicurati che la sessione sia attiva
        $email = $_POST['email'];
        $password = $_POST['password'];
        $user = Login($email, $password);

        if ($user) {
            $_SESSION['id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            CaricaCarrello();
            header('Location: index.php'); // Reindirizza alla home page
            exit();
        } else {
            header('Location: login.php?msg=Password o Email errata');
            exit();
        }
        break;
    case 'register':
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $hashedPw = password_hash($password, PASSWORD_DEFAULT);
        $result = Register($username, $hashedPw, $email);
        if ($result) {
            header('Location: login.php?msg=Registrazione completata');
        } else {
            header('Location: register.php?msg=Username o Email già in uso');
        }
        break;
    case 'empty':
        $_SESSION['cart'] = [];
        $_SESSION['total'] = 0;
        header('Location: carrello.php');
        unset($_SESSION['total']);
        break;
    case 'remove':
        $id = $_REQUEST['bundleId'] ?? $_REQUEST['id'];
        //var_dump($_SESSION['cart']);
        $_SESSION['total'] = $_SESSION['total'] - $_SESSION['cart'][$id]['prezzo'] * $_SESSION['cart'][$id]['quantita'];
        if (isset($_SESSION['cart'][$id])) {
            unset($_SESSION['cart'][$id]); // Rimuove l'elemento specifico
        }
        header('Location: carrello.php');
        break;
    case 'coupon':
        $coupon = $_POST['coupon'];
        $user_email = $_SESSION['email']; // Supponendo che l'email dell'utente sia nella sessione
        $codice = CodiceSconto($coupon);
        var_dump($codice);
        if ($codice) {
            if (ControllaCodice(intval($codice['id']), $user_email)) {
                var_dump($_SESSION['cart']);
                // Salva il totale precedente prima di applicare lo sconto
                $_SESSION['old_total'] = $_SESSION['total'];
                $sconto = intval($codice['value']);
                $_SESSION['total'] = $_SESSION['total'] - ($_SESSION['total'] * ($sconto / 100));
                echo $_SESSION['total'];
                RegistraCodice($codice['id'], $user_email);
                header('Location: pagamento.php');
            } else {
                header('Location: pagamento.php?msg=Codice già usato');
            }
        } else {
            header('Location: pagamento.php?msg=Codice non valido');
        }
        break;
}
