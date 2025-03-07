<?php
include 'header.php';
?>
<main class="flex-shrink-0">
    <div class="container-prodotto" id="container-prodotto">
        <a href="archivio.html" class="btn" id="return-arrow"></a>
        <div class="product-details">
            <img id="immagine-prodotto" src="" alt="">
            <div class="product-info" id="product-info">
                <h1 id="nome-prodotto" class="product-name"></h1>
                <hr>
                <span id="descrizione"></span>
                <br>
                <h3 id="price" class="price"></h3>
                <!--<select id="colore" class="select-colore">-->
                <a class="btn" id="tabella_tecnica" href=""></a>
                <div id="colore-container"></div>
                <br>
                <input type="number" id="quantita" min="1" max="20" value="1">
                <br>
                <button class="product-btn" id="aggiungi-carrello"></button>
                <button class="product-btn" id="compra" onclick="window.location.href='formPagamento.html'"></button>
            </div>
        </div>
    </div>
</main>
<?php
include 'footer.php';
?>