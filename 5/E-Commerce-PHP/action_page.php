<?php
require 'connection.php';
switch ($_REQUEST['action']) {
    case 'login':
        $email = $_POST['email'];
        $password = $_POST['password'];

        $user = Login($email, $password);

        if ($user) {
            if (session_status() === PHP_SESSION_NONE) {
                session_start(); // Avvia la sessione solo se non è già attiva
            }
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
}
