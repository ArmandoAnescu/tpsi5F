// Funzione per caricare il JSON e popolare la pagina
function loadJSON() {
    fetch('sistemi.json') // URL del file JSON
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento del file JSON');
        }
        return response.json(); // Restituisce i dati come oggetto JavaScript
      })
      .then(data => {
        // Popola la pagina con i dati caricati
        loadPage(data);
      })
      .catch(error => {
        console.error('Errore:', error);
      });
  }
  
  // Funzione per aggiornare il contenuto della pagina con i dati JSON
  function loadPage(data) {
    const navbarLinks = document.getElementById('navbarLinks');
    data.navbar.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('nav-item');
      const link = document.createElement('a');
      link.classList.add('nav-link');
      link.href = item['nav-link'];
      link.textContent = item['nav-text'];
      listItem.appendChild(link);
      navbarLinks.appendChild(listItem);
    });
    // Titoli e testi
    document.getElementById('title').textContent = data.title;
    document.getElementById('sub-title').textContent = data['sub-title'];
    document.getElementById('lead-text').innerHTML = data['lead-text'];
  
    // Immagine
    const image = document.getElementById('image');
    image.src = data.image.src;
    image.alt = data.image.alt;
  
    // Note immagine
    document.getElementById('note-image').textContent = data['note-image'];
  
    // Metodi HTTP
    document.getElementById('methods-title').textContent = data['methods-title'];
    document.getElementById('methods-lead').innerHTML = data['methods-lead'];
  
    // Accordion items
    Object.keys(data['accordion_items']).forEach((itemKey, index) => {
      const item = data['accordion_items'][itemKey];
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');
      
      accordionItem.innerHTML = `
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button ${index === 0 ? 'show' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse${index}">
            ${item.term}
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            ${item.definition}
          </div>
        </div>
      `;
      
      document.getElementById('accordionExample').appendChild(accordionItem);
    });
  
    // Footer
    document.getElementById('footer-text').textContent = data['footer-text'];
  }
  
  // Caricare la pagina una volta che il DOM è pronto
  document.addEventListener('DOMContentLoaded', loadJSON);
  