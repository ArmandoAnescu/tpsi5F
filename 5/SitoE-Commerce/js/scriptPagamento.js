function loadJSON() {
    fetch('pagamento.json') // URL del file JSON
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
    const paymentMethods = document.getElementById('payment-method');
    if (jsonData.metodoPagamento && Array.isArray(jsonData.metodoPagamento)) {
        jsonData.metodoPagamento.forEach(metodo => {
            const option = document.createElement('option');
            option.value = metodo;
            option.textContent = metodo;
            paymentMethods.appendChild(option);
        });
    }
    // Titoli (h2)
document.getElementById("transaction").textContent = jsonData.transaction;
document.getElementById("personalDetails").textContent = jsonData.personalDetails;

// Label dei campi di pagamento
document.getElementById("paymentMethod").textContent = jsonData.transaction;
document.getElementById("card-number-label").textContent = jsonData.cardNumLabel;
document.getElementById("expDate").textContent = jsonData.expDate;
document.getElementById("secCode").textContent = jsonData.secCode;

// Label dei dettagli personali
document.getElementById("names-label").textContent = jsonData.namesLabel;
document.getElementById("addrCity").textContent = jsonData.addrCity;
document.getElementById("postal-code-label").textContent = jsonData.pcLabel;
document.getElementById("countryLabel").textContent = jsonData.countryLabel;
document.getElementById("phoneNumber").textContent = jsonData.phoneNumber;

// Pulsante di invio
document.getElementById("submit").textContent = jsonData.submit;

    document.getElementById('footerText').textContent = jsonData.footer.text;
}
// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
