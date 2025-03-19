<?php
require 'connection.php';
function transformJSON($originalJSON)
{
    $transformedJSON = [];

    // Itera su ogni elemento dell'array originale
    foreach ($originalJSON as $item) {
        $key = $item['chiave'];  // La chiave
        $value = $item['valore'];  // Il valore

        // Prova a decodificare il valore JSON se possibile
        $decodedValue = json_decode($value, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            // Se il valore è un JSON valido, lo aggiungo come array
            $transformedJSON[$key] = $decodedValue;
        } else {
            // Altrimenti, lascio il valore come stringa
            $transformedJSON[$key] = $value;
        }
    }

    return $transformedJSON;
}
$query = "SELECT c.chiave,c.valore  FROM configurazione_sito c";
$stm = $db->prepare($query);
$stm->execute();
$result = $stm->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');  // Assicurati che il tipo di contenuto sia JSON
$result = transformJSON($result);
echo json_encode($result);  // Controlla che $result sia un array valido
return json_encode($result, JSON_PRETTY_PRINT); // Converte in array associativo