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
    document.getElementById('footerText').textContent = jsonData.footer.text;
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
           <div class="card" style="width: 18rem;">
        <img src="${prodotto.immagine}" class="card-img-top" alt="${prodotto.nome}">
        <div class="card-body">
          <h5 class="card-title">${prodotto.nome}</h5>
            ${prodotto.colori && prodotto.colori.length > 0 ? `
              <p class="card-text">Seleziona il colore disponibile:</p>
          <div class="form-group">
              <select class="form-control" id="colore-${prodotto.id}">
                ${prodotto.colori.map(colore => `<option value="${colore}">${colore.charAt(0).toUpperCase() + colore.slice(1)}</option>`).join('')}
              </select>
            ` :
             ''
          }
          <p class="card-text price">€${prodotto.prezzo}</p>
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
  