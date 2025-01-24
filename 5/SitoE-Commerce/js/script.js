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
      })
      .catch(error => {
        console.error('Errore:', error);
      });
  }
  
  // Funzione per caricare dinamicamente i prodotti
  function caricaProdotti(prodotti) {
    const container = document.getElementById("prodotti-container");
  
    // Loop attraverso l'array di prodotti
    prodotti.forEach(prodotto => {
      // Creiamo una card per ogni prodotto
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4"); // Layout a 3 colonne con Bootstrap
  
      // Aggiungi un'immagine di default (se non disponibile nel JSON)
      card.innerHTML = `
        <div class="card">
          <img src="${prodotto.immagine}" class="card-img-top" alt="${prodotto.nome}">
          <div class="card-body">
            <h5 class="card-title">${prodotto.nome}</h5>
            <p class="card-text">Seleziona il colore disponibile:</p>
            <div class="form-group">
              <select class="form-control" id="colore-${prodotto.id}">
                ${prodotto.colori.map(colore => `<option value="${colore}">${colore}</option>`).join('')}
              </select>
            </div>
            <a href="#" class="btn btn-primary">Vedi prodotto</a>
          </div>
        </div>
      `;
  
      // Aggiungiamo la card al contenitore
      container.appendChild(card);
    });
  }
  
  // Carica i prodotti quando la pagina è pronta
  document.addEventListener("DOMContentLoaded", loadJSON);
  