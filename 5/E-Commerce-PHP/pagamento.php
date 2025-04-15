<?php
require 'components/header.php';
$carrello = isset($_SESSION['cart']) ? $_SESSION['cart'] : null;

?>
<main class="flex-shrink-0">
    <div class="container pagamento" id="container-prodotto">
        <form action="#" method="POST">
            <h2 id="transaction"></h2>

            <!-- Selettore del metodo di pagamento -->
            <label for="metodoPagamento" id="paymentMethod"></label>
            <select id="payment-method" name="metodoPagamento" required>
                <!-- Aggiunti dinamicamente -->
            </select>
            <br>

            <!-- Numero della carta -->
            <label for="card-number" id="card-number-label"></label>
            <input id="card-number" name="card-number" placeholder="XXXX-XXXX-XXXX-XXXX" type="text" required>
            <br>

            <!-- Data di scadenza -->
            <label for="expiration-date" id="expDate"></label>
            <input id="expiration-date" name="expiration-date" type="month" required>
            <br>

            <!-- Codice di sicurezza (CVV) -->
            <label for="security-code" id="secCode"></label>
            <input id="security-code" name="security-code" placeholder="123" type="text" required>
            <br>

            <h2 id="personalDetails"></h2>

            <!-- Nome e Cognome -->
            <label id="names-label"></label>
            <input type="text" id="name" name="name" placeholder="Nome" required>
            <input type="text" id="lastname" name="lastname" placeholder="Cognome" required>
            <br>

            <!-- Indirizzo e Città -->
            <label for="address-city" id="addrCity"></label>
            <input type="text" id="address-city" placeholder="Città" required>
            <input type="text" id="address" placeholder="Indirizzo" required>
            <br>

            <!-- Codice postale -->
            <label for="postal-code" id="postal-code-label"></label>
            <input type="text" id="postal-code" required>
            <br>

            <!-- Paese -->
            <label for="country" id="countryLabel"></label>
            <input type="text" id="country" required>
            <br>

            <!-- Numero di telefono -->
            <label for="phone-number" id="phoneNumber"></label>
            <input type="tel" id="phone-number" placeholder="+39 123 456789"
                pattern="(\+39\s?)?([0-9]{3})[ -]?[0-9]{6,7}" required>
            <br>

            <br><br>

            <!-- Pulsante di invio -->
            <button class="btn btn-primary" type="submit" id="submit"></button>
        </form>
        <div id="products">
            <ul id="product-list">
                <?php
                if ($carrello) {
                    foreach ($carrello as $item) { ?>
                        <li><?= $item['nome'] ?> <?= $item['quantita'] ?></li>
                <?php
                    }
                }
                ?>
            </ul>
            <?php
            if (isset($_SESSION['old_total']) && isset($_SESSION['total']) && $_SESSION['old_total'] != $_SESSION['total']) {
                // Stampa il vecchio prezzo (tagliato) e il nuovo prezzo
                echo "<p id='price'>Totale: <span style='text-decoration: line-through;'>€" . number_format($_SESSION['old_total'], 2) . "</span> €" . number_format($_SESSION['total'], 2) . "</p>";
            } else if (isset($_SESSION['total'])) {
                // Se non ci sono sconti, stampa solo il prezzo normale
                echo "<p id='price'>€" . number_format($_SESSION['total'], 2) . "</p>";
            }
            ?>
            <form method="POST" action="action_page.php?action=coupon">
                <input type="text" name="coupon" id="coupon" placeholder="Codice sconto">
                <button type="submit" name="apply_discount" class="btn btn-primary" id="apply_discount"></button>
            </form>
        </div>
    </div>
</main>
<?php
require 'components/footer.php';
?>