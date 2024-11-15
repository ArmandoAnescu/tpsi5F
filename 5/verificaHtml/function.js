// Funzione per ottenere il parametro 'id' dalla query string
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Funzione per caricare il file JSON da domande.json
function loadJSON(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'domande.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const jsonData = JSON.parse(xhr.responseText);
            callback(jsonData); // Esegui la callback con i dati del JSON
        }
    };
    xhr.send();
}

// Funzione per caricare la domanda aperta
function loadQuestion(data) {
    const questionId = getParameterByName('id'); // Ottieni l'id dalla query string
    const question = data.domande_aperte.find(q => q.id == questionId); // Trova la domanda aperta
    const text = data.testi.find(t => t.id == questionId); // Trova il testo con domande a risposta multipla

    const questionContent = document.getElementById('question-content');

    if (question) {
        // Se è una domanda aperta
        document.getElementById('title').textContent = `Domanda ${question.id}`;
        questionContent.innerHTML = `
            <p>${question.domanda}</p>
            <textarea id="answer" placeholder="Scrivi la tua risposta qui..."></textarea>
        `;

        // Recupera la risposta precedentemente salvata nel localStorage
        const savedAnswer = localStorage.getItem(`answer_${questionId}`);
        if (savedAnswer) {
            document.getElementById('answer').value = savedAnswer;
        }

        // Salva la risposta nel localStorage quando l'utente scrive
        document.getElementById('answer').addEventListener('input', function() {
            localStorage.setItem(`answer_${questionId}`, this.value);
        });
    } else if (text) {
        // Se è un testo con domande a risposta multipla
        document.getElementById('title').textContent = text.titolo;
        questionContent.innerHTML = `
            <p>${text.testo}</p>
            ${text.domande_multipla.map((q, index) => `
                <div>
                    <p>${q.domanda}</p>
                    <div>
                        ${q.opzioni.map((opzione, idx) => `
                            <label>
                                <input type="radio" name="question_${index}" value="${opzione}">
                                ${opzione}
                            </label><br>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    } else {
        // Se la domanda o il testo non esistono, mostra un errore
        document.getElementById('title').textContent = "Domanda non trovata!";
        questionContent.innerHTML = "<p>La domanda o il testo che cerchi non esiste.</p>";
    }
}

// Funzione per caricare la pagina
window.onload = function() {
    loadJSON(loadQuestion); // Carica i dati JSON e le domande
};
