let timer;
let seconds = localStorage.getItem('timerSeconds') ? parseInt(localStorage.getItem('timerSeconds')) : 60 * 60; // 60 minuti in secondi, se non c'è il valore nel localStorage parte da 60 minuti

// Funzione per avviare il timer
function startTimer() {
    timer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timer); // Ferma il timer quando i secondi arrivano a zero
            document.getElementById('timer').textContent = "Tempo scaduto!";
            return; // Esce dalla funzione se il tempo è finito
        }

        seconds--; // Decrementa ogni secondo
        let mins = Math.floor(seconds / 60); // Calcola i minuti
        let secs = seconds % 60; // Calcola i secondi
        document.getElementById('timer').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        // Salva il tempo rimanente nel localStorage
        localStorage.setItem('timerSeconds', seconds);
    }, 1000);
}

// Funzione per ottenere il parametro 'id' dalla query string
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Funzione per caricare il file JSON da domande.json
function loadJSON(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'domande.json', true);  // Assicurati che il percorso sia corretto
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
        const textContent = document.getElementById('text-content');
        const titleElement = document.getElementById('title');
        const textElement = document.getElementById('text');
        // Se il testo è trovato
        titleElement.textContent = text.titolo;
        textElement.textContent = text.testo;

        // Carica le domande a risposta multipla, se esistono
        if (text.domande_multipla && text.domande_multipla.length > 0) {
            let questionsHTML = '';
            text.domande_multipla.forEach((question, index) => {
                // Recupera la risposta salvata dal localStorage
                const savedAnswer = localStorage.getItem(`question_${index}`);
                questionsHTML += `
                    <div>
                        <p><strong>Domanda ${index + 1}:</strong> ${question.domanda}</p>
                        <div>
                            ${question.opzioni.map((opzione) => {
                                const isChecked = savedAnswer === opzione ? 'checked' : ''; // Se la risposta è già stata selezionata
                                return `
                                    <label>
                                        <input type="radio" name="question_${index}" value="${opzione}" ${isChecked}>
                                        ${opzione}
                                    </label><br>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            });
            // Aggiungi le domande a risposta multipla al contenuto
            textContent.innerHTML += questionsHTML;

            // Aggiungi gli event listener per memorizzare la risposta nel localStorage quando l'utente seleziona una risposta
            text.domande_multipla.forEach((_, index) => {
                const radios = document.getElementsByName(`question_${index}`);
                radios.forEach(radio => {
                    radio.addEventListener('change', function() {
                        localStorage.setItem(`question_${index}`, this.value);  // Salva la risposta selezionata
                    });
                });
            });
        }

    } else {
        // Se la domanda o il testo non esistono, mostra un errore
        document.getElementById('title').textContent = "Domanda non trovata!";
        questionContent.innerHTML = "<p>La domanda o il testo che cerchi non esiste.</p>";
    }
}

// Funzione per caricare la pagina
window.onload = function() {
    startTimer(); // Avvia il timer
    loadJSON(loadQuestion); // Carica i dati JSON e le domande
};
