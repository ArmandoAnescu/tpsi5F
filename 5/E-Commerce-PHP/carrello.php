<?php
require 'components/header.php';
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
                        foreach ($carrello as $item) { ?>
                            <div>
                                <div class="card mb-3" style="max-width: 800px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="<?= $item['immagine'] ?>" class="img-fluid rounded-start" alt="<?= $item['nome'] ?>">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title"><?= $item['nome'] ?></h5>
                                                <p class="card-text price">€<?= $item['prezzo'] ?></p>
                                                <p class="card-text">quantità: <?= $item['quantita'] ?></p>
                                                <div class="btn-group">
                                                    <a href="prodotto.php?id=<?= $item['id'] ?>" id="seeProduct" class="btn btn-primary">Vedi Prodotto</a>
                                                    <a id="remove-item" href="action_page.php?action=remove&id=<?= $item['id'] ?>" class="btn">Rimuovi dal Carrello</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php }
                    } else { ?>
                        <p id="cart-warning" class="cart-warning"></p>
                    <?php } ?>
                </div>
            </div>
        </div>
        <p id="price">
            <?php
            $somma = 0;
            foreach ($carrello as $item) {
                $somma += (float)$item['prezzo'] * (int)$item['quantita'];
            }
            echo "Totale: €" . number_format($somma, 2);
            ?>
        </p>
        <button id="empty-cart" class="empty" onclick="window.location.href='action_page.php?action=empty'"></button>
        <button id="acquista" class="transaction"></button>
    </div>
    <br>
</main>
<?php
//var_dump($_SESSION['cart']);
include 'components/footer.php';
?>