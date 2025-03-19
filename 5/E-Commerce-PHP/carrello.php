<?php
require 'header.php';
require 'connection.php';
$carrello = isset($_SESSION['cart']) ? $_SESSION['cart'] : null; // Retrieve the cart from the session
$prodotti = OttieniProdotti();
?>
<main class="flex-shrink-0">
    <div class="container">
        <h1 class="mt-3 pt-3" id="cartTitle"></h1>
        <p class="lead" id="cartText"></p>
        <div class="carrello">
            <div id="cart-container" class="card-container">
                <div class="row">
                    <!--Prodotti caricati dinamicamente-->
                    <?php
                    if ($carrello) {
                        foreach ($carrello as $item) {
                            foreach ($prodotti as $prodotto) {
                                if ($item['id'] == $prodotto['id']) { ?>
                                    <div>
                                        <div class="card mb-3" style="max-width: 540px;">
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img src="<?= $prodotto['immagine'] ?>" class="img-fluid rounded-start" alt="<?= $prodotto['nome'] ?>">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title"><?= $prodotto['nome'] ?></h5>
                                                        <p class="card-text price">€<?= $prodotto['prezzo'] ?></p>
                                                        <p class="card-text">quantità: <?= $item['quantita'] ?></p>
                                                        <div class="btn-group">
                                                            <a href="prodotto.php?id=<?= $prodotto['id'] ?>" class="btn btn-primary">Vedi prodotto</a>
                                                            <a id="remove-item" class="btn btn-danger">Rimuovi prodotto</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        <?php }
                            }
                        }
                    } else { ?>
                        <p class="cart-warning">Il tuo carrello è vuoto</p>
                    <?php } ?>
                </div>
            </div>
        </div>
        <p id="price"></p>
        <button id="empty-cart" class="empty"></button>
        <button id="acquista" class="transaction"></button>
    </div>
</main>
<?php
include 'footer.php';
?>
