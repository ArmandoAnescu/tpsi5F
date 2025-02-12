function loadJSON() {
    fetch('index.json') // URL del file JSON
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento del file JSON');//dico che c'è stato un errore
        }
        return response.json(); // Restituisce i dati come oggetto JavaScript
      })
      .then(data => {
        // Usa i dati caricati (data è l'oggetto JSON)
        loadPage(data);
      })
      .catch(error => {
        console.error('Errore:', error);
      });
  }
  function loadPage(jsonData) {
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
  // Carica i prodotti quando la pagina è pronta
  document.addEventListener("DOMContentLoaded", loadJSON);
  