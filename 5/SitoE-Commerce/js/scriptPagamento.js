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
function giveCodiciSconto(){
    return fetch('pagamento.json') // URL del file JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nel caricamento del file JSON');//dico che c'è stato un errore
            }
            return response.json(); // Restituisce i dati come oggetto JavaScript
        })
        .then(data => {
            // Usa i dati caricati (data è l'oggetto JSON)
            return data.discountCodes;
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}
function giveProdotti() {
    return fetch('prodotti.json') // URL del file JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nel caricamento del file JSON');//dico che c'è stato un errore
            }
            return response.json(); // Restituisce i dati come oggetto JavaScript
        })
        .then(data => {
            // Usa i dati caricati (data è l'oggetto JSON)
            return data.prodotti;
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
    let select = document.getElementById('payment-method');
    jsonData.paymentmethod.forEach(metodo => {
        const option = document.createElement('option');
        option.value = metodo;
        option.textContent = metodo;
        select.appendChild(option);
    });
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
    document.getElementById('discountLabel').textContent = jsonData.discountText;
    document.getElementById('price').innerHTML = `totale: <span class="price">€${new URLSearchParams(window.location.search).get('prezzo')}</span>`;
    let lista = document.getElementById('product-list');
    let carrello = JSON.parse(localStorage.getItem("carrello")) || [];
    prodotti = giveProdotti().then(prodotti=>{
        carrello.forEach((carrelloProdotto) => {
            prodotti.forEach(prodotto => {
                if (carrelloProdotto.id === prodotto.id) {
                    elemento = document.createElement('li');
                    elemento.textContent = carrelloProdotto.quantita + "x " + prodotto.nome;
                    lista.appendChild(elemento);
                }
            });
        }
        );
    });
    document.getElementById('apply-discount').textContent=jsonData.applyDiscount;    
    document.getElementById('footerText').textContent = jsonData.footer.text;
}
// Carica i prodotti quando la pagina è pronta
document.addEventListener("DOMContentLoaded", loadJSON);
document.getElementById("apply-discount").addEventListener('click',function(){
    let codiceInserito=document.getElementById('discount').value;
    giveCodiciSconto().then(codici=>{
        codiceValido=codici.find(codice=>codice.code === codiceInserito);
        if(codiceValido){
            let prezzo=new URLSearchParams(window.location.search).get('prezzo');
            let sconto=prezzo - (prezzo*codiceValido.discount / 100);
            sconto = parseFloat(sconto.toFixed(2));
            document.getElementById('price').innerHTML = `totale: <span class="price">€${sconto}</span>`;
        }else{
            window.alert('Codice sconto NON valido!');
        }
    });
});