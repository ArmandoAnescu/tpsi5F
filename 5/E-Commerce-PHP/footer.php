<?php
?>
<!--Foooter-->
<footer class="footer mt-auto py-3 bg-light">
    <div class="container mt-auto">
        <span class="text-muted" id="footerText"></span>
    </div>
</footer>

<script src="js/bootstrap.bundle.min.js"></script>
<?php
$current_page = basename($_SERVER['PHP_SELF']); // Ottiene solo il nome del file

switch ($current_page) {
    case "index.php": ?>
        <script src="js/script.js"></script>
    <?php
        break;
    case "prodotto.php": ?>
        <script src="js/scriptProdotto.js"></script>
    <?php
        break;
    case "carrello.php": ?>
        <script src="js/scriptCarrello.js"></script>
    <?php
    case "archivio.php": ?>
        <script src="js/scriptArchivio.js"></script>
<?php
        break;
}

?>
</body>

</html>