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
        header('Location: carrello.php');
        break;
    case 'remove':
        $id = $_REQUEST['id'];
        var_dump($_SESSION['cart']);
        if (isset($_SESSION['cart'][$id])) {
            unset($_SESSION['cart'][$id]); // Rimuove l'elemento specifico
        }
        header('Location: carrello.php');
        break;
}
