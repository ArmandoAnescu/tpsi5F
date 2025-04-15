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
    let select = document.getElementById('payment-method');
    jsonData.paymentmethods.forEach(metodo => {
        const option = document.createElement('option');
        option.value = metodo;
        option.textContent = metodo;
        select.appendChild(option);
    });
    document.getElementById('paymentMethod').textContent = jsonData.paymentMethod;
    document.getElementById('transaction').textContent = jsonData.transaction;
    document.getElementById('addrCity').textContent = jsonData.addrCity;
    document.getElementById('submit').textContent = jsonData.submit;
    document.getElementById('secCode').textContent = jsonData.secCode;
    document.getElementById('postal-code-label').textContent = jsonData.pcLabel;
    document.getElementById('countryLabel').textContent = jsonData.countryLabel;
    document.getElementById('phoneNumber').textContent = jsonData.phoneNumber;
    document.getElementById('names-label').textContent = jsonData.namesLabel;
    document.getElementById('personalDetails').textContent = jsonData.personalDetails;
    document.getElementById('card-number-label').textContent = jsonData.cardNumLabel;
    document.getElementById('apply_discount').textContent = jsonData.applyDiscount;
    document.getElementById('footerText').textContent = jsonData.footer.text;
}
// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);