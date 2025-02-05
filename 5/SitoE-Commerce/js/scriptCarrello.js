function loadJSON() {
    Promise.all([
      fetch('index.json').then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento di index.json');
        }
        return response.json();
      }),
      fetch('prodotti.json').then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento di prodotti.php');
        }
        return response.json();
      })
    ])
      .then(([dataJson, dataProdotti]) => {
        LoadPage(dataJson);
        caricaProdotti(dataProdotti.prodotti);
      })
      .catch(error => {
        console.error('Errore:', error);
      });
    }
  
  function LoadPage(jsonData) {
    const icona = document.getElementById('nav-brand');
    icona.innerHTML = jsonData.logo;
    icona.href = 'index.html';
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
    document.getElementById('pageTitle').textContent=jsonData.cartTitle;
    document.getElementById('footerText').textContent = jsonData.footer.text;
  }
  // Funzione per caricare dinamicamente i prodotti
function caricaProdotti(prodotti) {
    const container = document.getElementById("cart-container");
    let carrello = JSON.parse(localStorage.getItem("carrello")) || [];
carrello.forEach((carrelloProdotto) => {
    prodotti.forEach(prodotto => {
        if(carrelloProdotto.id===prodotto.id){
        const card = document.createElement("div");
        // Aggiungi un'immagine di default (se non disponibile nel JSON)
        card.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${prodotto.immagine}" class="img-fluid rounded-start" alt="${prodotto.nome}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${prodotto.nome}</h5>
                <p class="card-text price">€${prodotto.prezzo}</p>
                ${prodotto.colori && prodotto.colori.length > 0 ? `
                  <p class="card-text">Seleziona il colore disponibile:</p>
                  <div class="form-group">
                    <select class="form-control" id="colore-${prodotto.id}">
                      ${prodotto.colori.map(colore => `<option value="${colore}">${colore}</option>`).join('')}
                    </select>
                  </div>
                ` : ''}
                <a href="paginaProdotto.html?id=${prodotto.id}" class="btn btn-primary">Vedi prodotto</a>
                <a id="remove-item" class="btn btn-danger" style="margin-left: 10px;">Rimuovi prodotto</a>
              </div>
            </div>
          </div>
        </div>
      `;
      
        // Aggiungiamo la card al contenitore
        container.appendChild(card);
        }//end

      });
    });
}
  // Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
  