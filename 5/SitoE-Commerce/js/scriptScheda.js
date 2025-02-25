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
        const prodottoId = new URLSearchParams(window.location.search).get('id'); // Ottieni l'ID del prodotto dalla URL
        const prodotto = dataProdotti.prodotti.find(p => p.id === prodottoId); // Trova il prodotto corrispondente all'ID
        caricaProdotto(prodotto);
        LoadPage(dataJson,prodottoId);
      })
      .catch(error => {
        console.error('Errore:', error);
      });
  }
  function LoadPage(jsonData,id) {
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
    document.getElementById('return-arrow').href="paginaProdotto.html?id="+id;
    document.getElementById('return-arrow').innerHTML = jsonData.returnArrow;
    document.getElementById('footerText').textContent = jsonData.footer.text;
  }
  // Funzione per caricare dinamicamente i prodotti
  function caricaProdotto(prodotto) {
    // Carica il nome del prodotto
    const nomeProdotto = document.getElementById('nome-prodotto');
    nomeProdotto.textContent = prodotto.nome;

    const tabella_tecnica=document.getElementById('table-prodotto');
    let specifiche=document.createElement('th');
    specifiche.textContent="Specifiche";
    let descrizione=document.createElement('th');
    descrizione.textContent="Descrizione";
    let riga = document.createElement('tr');
    //aggiungo le 2 colonne
    riga.appendChild(specifiche);
    riga.appendChild(descrizione);
    thead=document.createElement('thead');
    thead.appendChild(riga);
    //aggiungo la tabella
    tabella_tecnica.appendChild(thead);
    tbody=document.createElement('tbody');
    //ritorna un array chiavi valore
    Object.entries(prodotto.specifiche).forEach(([nome, descrizione]) => {
        // Crea una riga per ogni specifica
        let riga = document.createElement('tr');
        
        // Crea la cella per il nome della specifica
        let tdNome = document.createElement('td');
        tdNome.textContent = nome; // nome della specifica (chiave dell'oggetto)
        
        // Crea la cella per la descrizione della specifica
        let tdDescrizione = document.createElement('td');
        tdDescrizione.textContent = descrizione; // valore della specifica
        
        // Aggiungi le celle alla riga
        riga.appendChild(tdNome);
        riga.appendChild(tdDescrizione);
        
        // Aggiungi la riga al corpo della tabella
        tbody.appendChild(riga);
    });
    tabella_tecnica.appendChild(tbody);
  }  
  // Carica i prodotti quando la pagina è pronta
  document.addEventListener("DOMContentLoaded", loadJSON);