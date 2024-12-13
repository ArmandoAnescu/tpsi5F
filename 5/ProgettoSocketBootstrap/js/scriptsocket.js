// Funzione per caricare il JSON e popolare la pagina
function loadJSON() {
  fetch('socket.json') // URL del file JSON
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

function loadPage(data) {
  const icona = document.getElementById('nav-brand');
  icona.innerHTML = data.icon;
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
  document.getElementById('socket-description').innerHTML = data['socket-description'];

  document.getElementById('type-socket-title').textContent = data['type-socket-title'];
  document.getElementById('type-socket-description').innerHTML = data['type-socket-description'];

  document.getElementById('datagram-title').textContent = data['datagram-title'];
  document.getElementById('datagram-description').innerHTML = data['datagram-description'];

  document.getElementById('stream-title').textContent = data['stream-title'];
  document.getElementById('stream-description').innerHTML = data['stream-description'];

  document.getElementById('raw-title').textContent = data['raw-title'];
  document.getElementById('raw-description').innerHTML = data['raw-description'];

  document.getElementById('comunication-title').textContent = data['comunication-title'];
  document.getElementById('comunication-description').innerHTML = data['comunication-description'];

  document.getElementById('image-tcp').src = data['image-tcp'];
  document.getElementById('image-udp').src = data['image-udp'];
  document.getElementById('note-immagini').textContent = data['note-immagini'];

  // Footer
  document.getElementById('footer-text').textContent = data['footer-text'];
}
// Caricare la pagina una volta che il DOM è pronto
document.addEventListener('DOMContentLoaded', loadJSON);
