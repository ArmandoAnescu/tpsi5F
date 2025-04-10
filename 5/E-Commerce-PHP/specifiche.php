<?php
include 'components/header.php';
include 'connection.php';
$id = $_REQUEST['id'];
$specifiche = OttieniSpecifiche($id);
?>
<div class="table-responsive container-prodotto">
    <h1 class="mt-3 pt-3" id="specsTitle"></h1>
    <a href="prodotto.php?id=<?= $id ?>&type=product" class="btn" id="return-arrow"></a>
    <table class="table table-dark table-striped table-hover table-bordered rounded" id="tabella-prodotti">
        <thead>
            <tr>
            </tr>
            <tr>
                <th>Specifica</th>
                <th>Descrizione</th><!--creo i le colonne con i dati da mostrare-->
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($specifiche as $key => $value) { ?>
                <tr>
                    <td><?= $key; ?></td>
                    <td><?= $value; ?></td>
                </tr>
            <?php
            }
            ?>
        </tbody>
    </table>
</div>
<?php
include 'components/footer.php';
?>