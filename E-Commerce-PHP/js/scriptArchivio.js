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
  let select = document.getElementById('type');
  jsonData.types.forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo;
    option.textContent = tipo;
    select.appendChild(option);
  });
  document.getElementById('pageTitle').textContent = jsonData.archiveTitle;
  document.getElementById('footerText').textContent = jsonData.footer.text;
}
// Funzione per caricare dinamicamente i prodotti
function caricaProdotti(prodotti) {
  const container = document.getElementById("prodotti-container");
  // Filtra i prodotti
  let tipo = document.getElementById('type');
  const prodottiFiltrati = tipo.value === "--" ? prodotti : prodotti.filter(prodotto => prodotto.tipo === tipo);
  // Loop attraverso l'array di prodotti
  prodottiFiltrati.forEach(prodotto => {
    // Creiamo una card per ogni prodotto
    const card = document.createElement("div");
    // Aggiungi un'immagine di default (se non disponibile nel JSON)
    card.innerHTML = `
           <div class="card vert" style="width: 18rem;">
        <img src="${prodotto.immagine}" class="card-img-top" alt="${prodotto.nome}">
        <div class="card-body">
          <h5 class="card-title">${prodotto.nome}</h5>
            
          <p class="card-text price">€${prodotto.prezzo}</p>
          </div>
          <div>
            <a href="paginaProdotto.html?id=${prodotto.id}&tipo=${prodotto.tipo}" class="btn btn-primary">Vedi prodotto</a>
          </div>
        </div>
      </div>
    `;
    // Aggiungiamo la card al contenitore
    container.appendChild(card);
  });
}

// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
document.getElementById("type").addEventListener("change", function () {

});
