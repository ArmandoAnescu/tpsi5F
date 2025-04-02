function loadJSON() {
  fetch('get_content.php') // URL del file JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nel caricamento dei contenuti');//dico che c'è stato un errore
      }
      return response.json(); // Restituisce i dati come oggetto JavaScript
    })
    .then(data => {
      //console.log(data);  // Verifica la struttura del JSON
      // Usa i dati caricati (data è l'oggetto JSON)
      LoadPage(data);
    })
    .catch(error => {
      console.error('Errore:', error);
    });
}
function LoadPage(jsonData) {
  const icona = document.getElementById('nav-brand');
  icona.innerHTML = jsonData.logo;
  icona.href = 'index.php';
  const navbarLinks = document.getElementById('navbarLinks');
  jsonData.navbar.forEach(item => {//foreach dove creo gli elementi della navbar
    const listItem = document.createElement('li');
    listItem.classList.add('nav-item');
    const link = document.createElement('a');
    link.classList.add('nav-link');
    link.href = item['nav-link'];
    link.textContent = item['nav-text'];
    listItem.appendChild(link);
    navbarLinks.appendChild(listItem);
  });
  let specstable = document.getElementById('tabella_tecnica');
  if (specstable) {
    specstable.textContent = jsonData.specsTable;
  }
  document.getElementById('return-arrow').innerHTML = jsonData.returnArrow;
  document.getElementById('addToCart').textContent = jsonData.addToCart;
  document.getElementById('buyNow').textContent = jsonData.buyNow;
  document.getElementById('footerText').textContent = jsonData.footer.text;
}
function aggiungiAlCarrello() {
  // Recupera l'ID del prodotto dalla query string
  let Id = new URLSearchParams(window.location.search).get('id');
  let nomeProdotto = document.getElementById('nome-prodotto').textContent;
  let percorsoImmagine;
  let nomeColore;

  // Recupera l'elemento select per il colore
  let selectColore = document.getElementById('colore');
  if (selectColore) {
    // Recupera il percorso dell'immagine (value) e il nome del colore (testo dell'option)
    percorsoImmagine = selectColore ? selectColore.value : null;
    nomeColore = selectColore ? selectColore.options[selectColore.selectedIndex].text : null;
  } else {
    percorsoImmagine = document.getElementById('immagine').value;
    nomeColore = null;
  }
  // Recupera il prezzo del prodotto
  let prezzo = document.getElementById('price').textContent;

  // Recupera la quantità selezionata
  let quantita = parseInt(document.getElementById('quantita').value);
  let maxQuantita = parseInt(document.getElementById('quantita').max);

  // Verifica che la quantità selezionata non superi la quantità massima disponibile
  if (quantita > maxQuantita) {
    alert("La quantità selezionata non è disponibile");
    return;
  }

  // Invia i dati al server tramite fetch
  fetch("add_to_cart.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `nome=${nomeProdotto}&id=${Id}&colore=${nomeColore}&immagine=${percorsoImmagine}&quantita=${quantita}&maxQuantita=${maxQuantita}&prezzo=${prezzo}`
  })
    .then(response => response.text())
    .then(data => {
      if (data) {
        let alert = document.createElement('div');
        alert.innerHTML =
          `
    <div class="alert alert-success" role="alert">
      Prodotto aggiunto al carrello!
    </div>`;
        document.getElementById('container-prodotto').appendChild(alert);
        // Rimuove il messaggio dopo 3 secondi
        setTimeout(() => alert.remove(), 3000);
      } else {
        let alert = document.createElement('div');
        alert.innerHTML =
          `
    <div class="alert alert-success" role="alert">
      Impossibile aggiungere il prodotto al carrello! Registrati o effettua il login per continuare.
    </div>`;
        document.getElementById('container-prodotto').appendChild(alert);
        // Rimuove il messaggio dopo 3 secondi
        setTimeout(() => alert.remove(), 3000);
      }
    });
}


function cambiaImmagine() {

  let colore = document.getElementById('colore').value;
  document.getElementById('immagine-prodotto').src = colore;
}

// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
document.getElementById('addToCart').addEventListener('click', function () {
  aggiungiAlCarrello();
});
// Delegazione dell'evento per il click sugli elementi che sono le opzioni di colore
document.getElementById('product-info').addEventListener('change', function (event) {
  if (event.target && event.target.classList.contains('select-colore')) {//guardo se l'obbiettivo dell'evento è la mia select oppure no
    // se lo è chiamo l'evento per cambiare immagine
    cambiaImmagine();
  }
});