<?php
require 'components/header.php';
require 'connection.php';
// Controlla se l'utente è loggato
if (!isset($_SESSION['id']) || !isset($_SESSION['email'])) {
    // Se non è loggato, mostra un messaggio e interrompe l'esecuzione
    echo "<p>Per visualizzare il carrello devi essere loggato. <a href='login.php'>Accedi</a></p>";
    include 'components/footer.php'; // Assicurati di chiudere il resto della pagina
    exit; // Termina l'esecuzione del resto del codice
}
// Recupera il carrello dalla sessione
$carrello = isset($_SESSION['cart']) ? $_SESSION['cart'] : null;
// Raggruppa i prodotti per ID
$prodottiRaggruppati = [];
if ($carrello) {
    foreach ($carrello as $item) {
        // Se il prodotto è di tipo "bundle", ottieni i singoli prodotti del bundle
        if ($item['type'] == 'bundle' && isset($item['prodotti'])) {
            // Loop attraverso i prodotti del bundle
            foreach ($item['prodotti'] as $prodottoBundle) {
                // Verifica se il prodotto è già nel carrello (sia come singolo che come parte del bundle)
                if (!isset($prodottiRaggruppati[$prodottoBundle['id']])) {
                    // Se il prodotto non è ancora nel carrello, aggiungilo come singolo prodotto
                    $prodottiRaggruppati[$prodottoBundle['id']] = [
                        'id' => $prodottoBundle['id'],
                        'nome' => $prodottoBundle['nome'],
                        'quantita' => $item['quantita'], // Imposta la quantità del prodotto del bundle
                        'prezzo' => $item['prezzo'], // Assegna il prezzo del bundle al prodotto
                        'immagine' => $prodottoBundle['immagine'],
                        'type' => 'single' // Mark as a single product
                    ];
                }
            }
        } else {
            // Se non è un bundle, aggiungi il prodotto singolo al carrello
            $prodottiRaggruppati[$item['id']] = [
                'id' => $item['id'],
                'nome' => $item['nome'],
                'quantita' => $item['quantita'],
                'prezzo' => $item['prezzo'],
                'immagine' => $item['immagine'],
                'type' => 'single'
            ];
        }
    }
}
?>
<main class="flex-shrink-0">
    <div class="container">
        <h1 class="mt-3 pt-3" id="cartTitle"></h1>
        <p class="lead" id="cartText"></p>
        <div class="carrello">
            <div id="cart-container" class="card-container">
                <div class="row">
                    <!-- Prodotti caricati dinamicamente -->
                    <?php
                    if ($prodottiRaggruppati) {
                        foreach ($prodottiRaggruppati as $item) { ?>
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
                                                <p class="card-text">Quantità: <?= $item['quantita'] ?></p>
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
                        <p id="cart-warning" class="cart-warning">Il tuo carrello è vuoto.</p>
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
            if (!isset($_SESSION['total'])) {
                $_SESSION['total'] = number_format($somma, 2);
            }
            if (isset($_SESSION['old_total']) && $_SESSION['old_total'] != $_SESSION['total']) {
                // Stampa il vecchio prezzo (tagliato) e il nuovo prezzo
                echo "Totale: <span style='text-decoration: line-through;'>€" . number_format($somma, 2) . "</span> ";
                echo "€" . number_format($_SESSION['total'], 2);
            } else {
                // Se non ci sono sconti, stampa solo il prezzo normale
                echo "Totale: €" . number_format($somma, 2);
            }
            ?>
        </p>
        <br>
        <form method="POST" action="action_page.php?action=coupon">
            <input type="text" name="coupon" id="coupon" placeholder="Codice sconto">
            <button type="submit" name="apply_discount" class="btn btn-primary" id="apply_discount"></button>
        </form>
        <br>
        <button id="empty-cart" class="empty" onclick="window.location.href='action_page.php?action=empty'"></button>
        <button id="acquista" class="transaction"></button>
    </div>
    <br>
</main>
<?php
//var_dump($_SESSION['cart']);
include 'components/footer.php';
?>