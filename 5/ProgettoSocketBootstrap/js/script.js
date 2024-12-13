function loadJSON() {
  fetch('index.json') // URL del file JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nel caricamento del file JSON');
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
// Funzione per aggiornare la navbar
function updateNavbar(jsonData) {
  const icona = document.getElementById('nav-brand');
  icona.innerHTML = jsonData.icon;
  const navbarLinks = document.getElementById('navbarLinks');
  jsonData.navbar.forEach(item => {
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

// Funzione per aggiornare il titolo e i testi della pagina
function updatePageContent(jsonData) {
  document.getElementById('pageTitle').textContent = jsonData.title;
  document.getElementById('introText').textContent = jsonData.intro;
  document.getElementById('subtitle1').textContent = jsonData['subtitle-1'];
  document.getElementById('paragraph1').textContent = jsonData['paragraph-1'];
  document.getElementById('subtitle2').textContent = jsonData['subtitle-2'];
}

// Funzione per aggiornare gli alert
function updateAlerts(jsonData) {
  const alert1 = document.getElementById('alert1');
  alert1.innerHTML = `<p>${jsonData.alerts[0].content} <a href="${jsonData.alerts[0].link}">qui</a></p>`;
  const alert2 = document.getElementById('alert2');
  alert2.innerHTML = `<p>${jsonData.alerts[1].content} <a href="${jsonData.alerts[1].link}">qui</a></p>`;
}

// Funzione per aggiornare il dropdown
function updateDropdown(jsonData) {
  const dropdownBtn = document.getElementById("btn-dropdown");
  dropdownBtn.textContent = jsonData.dropdown.btndropdown;
  const dropdownLinks = document.getElementById('dropdownLinks');
  jsonData.dropdown.links.forEach(link => {
    const listItem = document.createElement('li');
    const linkItem = document.createElement('a');
    linkItem.classList.add('dropdown-item');
    linkItem.href = link['link'];
    linkItem.textContent = link['name'];
    listItem.appendChild(linkItem);
    dropdownLinks.appendChild(listItem);
  });
}

// Funzione per aggiornare il footer
function updateFooter(jsonData) {
  document.getElementById('footerText').textContent = jsonData.footer.text;
}

// Funzione per caricare i dati nella pagina
function loadPage(data) {
  updateNavbar(data);
  updatePageContent(data);
  updateAlerts(data);
  updateDropdown(data);
  updateFooter(data);
}

// Caricare la pagina
document.addEventListener('DOMContentLoaded', loadJSON);


// Funzione per caricare i dati nella pagina
function loadPage(data) {
  updateNavbar(data);
  updatePageContent(data);
  updateAlerts(data);
  updateDropdown(data);
  updateFooter(data);
}

// Caricare la pagina
document.addEventListener('DOMContentLoaded', loadJSON);
