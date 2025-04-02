<?php
?>
<!--Foooter-->
<footer class="footer mt-auto py-3 bg-dark">
    <div class="container mt-auto">
        <span class="text-muted" id="footerText"></span>
    </div>
</footer>

<script src="js/bootstrap.bundle.min.js"></script>
<?php
$current_page = basename($_SERVER['PHP_SELF']); // Ottiene solo il nome del file
switch ($current_page) {
    case "index.php":
        echo '<script src="js/script.js"></script>';
        break;
    case "prodotto.php":
        echo '<script src="js/scriptProdotto.js"></script>';
        break;
    case "carrello.php":
        echo '<script src="js/scriptCarrello.js"></script>';
        break;
    case "archivio.php":
        echo '<script src="js/scriptArchivio.js"></script>';
        break;
    default: // Default case per tutte le altre pagine
        echo '<script src="js/script.js"></script>';
        break;
}

?>
</body>

</html>