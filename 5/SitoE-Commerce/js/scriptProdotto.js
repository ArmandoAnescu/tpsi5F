function loadJSON() {
    fetch('paginaProdotto.json') // URL del file JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nel caricamento del file JSON'); // Errore se la fetch non va a buon fine
            }
            return response.json(); // Restituisce i dati come oggetto JavaScript
        })
        .then(data => {
            const prodottoId = new URLSearchParams(window.location.search).get('id'); // Ottieni l'ID del prodotto dalla URL
            const prodotto = data.prodotti.find(p => p.id === prodottoId); // Trova il prodotto corrispondente all'ID
            if (prodotto) {
                caricaProdotto(prodotto); // Carica il prodotto nella pagina
            } else {
                console.error('Prodotto non trovato');
            }
            LoadPage(data);
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}
function LoadPage(jsonData) {
    const icona = document.getElementById('nav-brand');
    icona.innerHTML = jsonData.icon;
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
    document.getElementById('footerText').textContent = jsonData.footer.text;
}
// Funzione per caricare dinamicamente i prodotti
function caricaProdotto(prodotto) {
    // Carica l'immagine del prodotto
    const immagineProdotto = document.getElementById('immagine-prodotto');
    immagineProdotto.src = prodotto.immagine;
    immagineProdotto.alt = prodotto.nome;

    // Carica il nome del prodotto
    const nomeProdotto = document.getElementById('nome-prodotto');
    nomeProdotto.textContent = prodotto.nome;

    // Carica la descrizione (puoi aggiungere una descrizione nel JSON, ad esempio)
    const descrizioneProdotto = document.getElementById('descrizione');
    descrizioneProdotto.textContent = `<bold>Descrizione</bold> :${prodotto.descrizione}`; // Aggiungi una descrizione appropriata

    // Carica il prezzo
    const prezzoProdotto = document.getElementById('price');
    prezzoProdotto.textContent = `€${prodotto.prezzo}`;
    //Select dei colori
    const selezioneColore = document.getElementById('colore');
    prodotto.colori.forEach(colore => {
      const option = document.createElement('option');
      option.value = colore;
      option.textContent = colore.charAt(0).toUpperCase() + colore.slice(1); // Formatta il colore (Es: "rosso" diventa "Rosso")
      selezioneColore.appendChild(option);
    });
    // Imposta il testo dei pulsanti
    const btnAggiungiCarrello = document.getElementById('aggiungi-carrello');
    btnAggiungiCarrello.textContent = 'Aggiungi al carrello';

    const btnCompra = document.getElementById('compra');
    btnCompra.textContent = 'Compra ora';

    // Aggiungi eventuali altre funzionalità ai pulsanti (come l'aggiunta al carrello o il pagamento)
}

// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
