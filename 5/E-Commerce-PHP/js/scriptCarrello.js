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
  document.getElementById('cartTitle').textContent = jsonData.cartTitle;
  document.getElementById('empty-cart').textContent = jsonData.emptyCart;
  document.getElementById('acquista').textContent = jsonData.acquista;
  document.getElementById('footerText').textContent = jsonData.footer.text;
  document.getElementById('apply_discount').textContent = jsonData.applyDiscount;
  let cartWarning = document.getElementById("cart-warning");
  if (cartWarning) {
    cartWarning.textContent = jsonData.cartWarning;
  }
  document.getElementById("seeProduct").textContent = jsonData.seeProduct;
}


// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
document.getElementById("empty-cart").addEventListener("click", function () {
  svuotaCarrello();
});
document.getElementById("acquista").addEventListener("click", function () {
  window.location.href = 'formPagamento.html?prezzo=' + totale;
});