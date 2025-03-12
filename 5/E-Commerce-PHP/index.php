<?php
include 'header.php';
?>
<!-- Begin page content -->
<main class="flex-shrink-0">
    <div class="container">
        <h1 class="mt-5 pt-5" id="pageTitle"></h1>
        <p class="lead" id="introText"></p>
        <br>
        <br>
        <h2 id="subTitle"></h2>
        <p id="subText"></p>
        <!-- Accordion -->
        <div class="accordion" id="accordionExample">

        </div>

    </div>
    <?= var_dump($_SESSION) ?>
</main>
<?php
include 'footer.php';
?>