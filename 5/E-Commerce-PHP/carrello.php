<?php
require 'header.php';
?>
<main class="flex-shrink-0">
    <div class="container">
        <h1 class="mt-3 pt-3" id="pageTitle"></h1>
        <p class="lead" id="introText"></p>
        <div class="carrello">
            <div id="cart-container" class="card-container">
                <div class="row">
                    <!--Prodotti caricati dinamicamente-->
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