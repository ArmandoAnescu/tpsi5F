function loadJSON() {
  fetch('index.json') // URL del file JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nel caricamento del file JSON'); // Errore se la fetch non va a buon fine
      }
      return response.json(); // Restituisce i dati come oggetto JavaScript
    })
    .then(data => {
      // Usa i dati caricati (data è l'oggetto JSON)
      caricaProdotti(data.prodotti); // Accedi alla proprietà 'prodotti'
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
}
// Funzione per caricare dinamicamente i prodotti
function caricaProdotti(prodotti) {
  const container = document.getElementById("prodotti-container");

  // Loop attraverso l'array di prodotti
  prodotti.forEach(prodotto => {
    // Creiamo una card per ogni prodotto
    const card = document.createElement("div");
    // Aggiungi un'immagine di default (se non disponibile nel JSON)
    card.innerHTML = `
        <div class="card style="width: 18rem;"">
          <img src="${prodotto.immagine}" class="card-img-top" alt="${prodotto.nome}">
          <div class="card-body">
            <h5 class="card-title">${prodotto.nome}</h5>
            <p class="card-text">Seleziona il colore disponibile:</p>
            <div class="form-group">
              <select class="form-control" id="colore-${prodotto.id}">
                ${prodotto.colori.map(colore => `<option value="${colore}">${colore}</option>`).join('')}
              </select>
            </div>
            <a href="paginaProdotto.html?id=${prodotto.id}" class="btn btn-primary">Vedi prodotto</a>
          </div>
        </div>
      `;

    // Aggiungiamo la card al contenitore
    container.appendChild(card);
  });
}

// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
