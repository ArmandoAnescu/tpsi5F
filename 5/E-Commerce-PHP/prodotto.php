<?php
include 'header.php';
require 'connection.php';
$id = $_REQUEST['id'] ?? '1';
$prodotto = OttieniProdotto($id);
$immagini = OttieniImmaginiProdotto($id);
?>
<main class="flex-shrink-0">
    <div class="container-prodotto" id="container-prodotto">
        <a href="archivio.php" class="btn" id="return-arrow"></a>
        <div class="product-details">
            <img id="immagine-prodotto" src="<?= $prodotto['immagine'] ?>" alt="<?= $prodotto['nome'] ?>">
            <div class="product-info" id="product-info">
                <h1 id="nome-prodotto" class="product-name"><?= $prodotto['nome'] ?></h1>
                <hr>
                <span id="descrizione"><?= $prodotto['descrizione'] ?></span>
                <br>
                <h3 id="price" class="price"><?= $prodotto['prezzo'] ?></h3>
                <!--<select id="colore" class="select-colore">-->
                <a class="btn" id="tabella_tecnica" href=""></a>
                <div id="colore-container">
                    <?php if (!empty($immagini) && !in_array(null, array_column($immagini, 'colore'), true)) { ?>
                        <select name="colori" class="select-colore" id="colore">
                            <?php foreach ($immagini as $immagine) { ?>
                                <option value="<?= $immagine['percorso'] ?>"><?= $immagine['colore'] ?></option>
                            <?php }
                            ?>
                        </select>
                    <?php } else {
                    ?>
                        <input type="hidden" id="immagine" value="<?= $prodotto['immagine'] ?>">
                    <?php
                    }
                    ?>
                </div>
                <br>
                <input type="number" id="quantita" min="1" max="<?= $prodotto['quantita'] ?>" value="1">
                <br>
                <button class="product-btn" id="addToCart"></button>
                <button class="product-btn" id="buyNow" onclick="window.location.href='pagamento.php?id=<?= $prodotto['id'] ?>'"></button>
            </div>
        </div>
    </div>
</main>
<?php
include 'footer.php';
?>