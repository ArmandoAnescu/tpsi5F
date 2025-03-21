<?php
require 'header.php';
require 'connection.php';
$prodotti = OttieniProdotti();
if (session_status() === PHP_SESSION_NONE) {
    session_start(); // Avvia la sessione solo se non è già attiva
}
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];  // Inizializza il carrello se non esiste
}
?>
<!-- Begin page content -->
<main class="flex-shrink-0">
    <div class="container">
        <h1 class="" id="pageTitle"></h1>
        <select name="type" id="type"></select>
        <div id="prodotti-container" class="">
            <div class="row">
                <?php foreach ($prodotti as $prodotto) { ?>
                    <div class="col-md-4">
                        <div class="card vert" style="width: 18rem;">
                            <img src="<?= $prodotto['immagine'] ?>" class="card-img-top" alt="<?= $prodotto['nome'] ?>">
                            <div class="card-body">
                                <h5 class="card-title"><?= $prodotto['nome'] ?></h5>
                                <p class="card-text price"><?= $prodotto['prezzo'] ?> €</p>
                                <a href="prodotto.php?id=<?= $prodotto['id'] ?>" class="btn btn-primary">Vedi prodotto</a>
                            </div>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
    <br>
</main>
<?php
require 'footer.php';
