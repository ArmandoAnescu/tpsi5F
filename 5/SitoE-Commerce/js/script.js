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
  document.getElementById('pageTitle').textContent = jsonData.pageTitle;
  document.getElementById('introText').textContent = jsonData.introText;
  document.getElementById('subTitle').textContent = jsonData.subTitle;
  document.getElementById('subText').textContent = jsonData.subText;
  //accordion
  const accordion = document.getElementById("accordionExample");
  Object.keys(jsonData.accordion_items).forEach((key, index) => {
    const item = jsonData.accordion_items[key][0];
    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";
    accordionItem.innerHTML = `
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button ${index === 0 ? "" : "collapsed"}" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#collapse${index}" 
          aria-expanded="${index === 0 ? "true" : "false"}" 
          aria-controls="collapse${index}">
          ${item.question}
        </button>
      </h2>
      <div id="collapse${index}" 
           class="accordion-collapse collapse ${index === 0 ? "show" : ""}" 
           aria-labelledby="heading${index}" 
           data-bs-parent="#accordionExample">
        <div class="accordion-body">
          ${item.definition}
        </div>
      </div>
    `;
    accordion.appendChild(accordionItem);
  });
  document.getElementById('footerText').textContent = jsonData.footer.text;
}
// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
