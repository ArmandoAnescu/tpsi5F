<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start(); // Avvia la sessione solo se non è già attiva
}
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];  // Inizializza il carrello se non esiste
}
?>
<!DOCTYPE html>
<html lang="it" class="h-100">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.84.0">
    <title>HomePage</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sticky-footer-navbar/">
    <link rel="icon" type="image/jpg" href="PixelHaven_Logo.png">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>
</head>

<body class="d-flex flex-column h-100">

    <header>
        <!-- Fixed navbar -->
        <nav class="navbar navbar-expand-md navbar-dark fixed-top ">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.php" id="nav-brand"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0" id="navbarLinks">
                        <!-- I collegamenti della navbar saranno riempiti dinamicamente -->
                    </ul>
                    <ul class="navbar-nav ms-auto">
                        <?php if (isset($_SESSION['id'])): ?>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown">
                                    <?= $_SESSION['username'] ?>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="account.php">Profilo</a></li>
                                    <li><a class="dropdown-item text-danger" href="logout.php">Logout</a></li>
                                </ul>
                            </li>
                        <?php else: ?>
                            <li class="nav-item">
                                <a class="nav-link" href="login.php">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="register.php">Registrati</a>
                            </li>
                        <?php endif; ?>

                    </ul>
                </div>
            </div>
        </nav>
    </header>