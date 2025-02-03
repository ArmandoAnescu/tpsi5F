let timer;
let seconds = localStorage.getItem('timerSeconds') ? parseInt(localStorage.getItem('timerSeconds')) : 60 * 60; // 60 minuti in secondi, se non c'è il valore nel localStorage parte da 60 minuti
        
// Variabile globale per memorizzare i dati
let data;

// Carica i dati JSON una sola volta al caricamento della pagina
function loadJSON(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'domande.json', true);  // Percorso del file JSON
    xhr.onload = function() {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);  // Salva i dati nella variabile globale
            callback(data);  // Passa i dati alla funzione di callback
        }
    };
    xhr.send();
}
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

// Reset del timer quando la scheda viene chiusa o ricaricata
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('timerSeconds'); // Rimuove il valore dal localStorage
});


// Funzione per ottenere il parametro 'id' dalla query string
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
// Funzione per caricare la domanda aperta
function loadQuestion(data) {
    const questionId = getParameterByName('id'); // Ottieni l'id dalla query string
    const question = data.domande_aperte.find(q => q.id == questionId); // Trova la domanda aperta
    const text = data.testi.find(t => t.id == questionId); // Trova il testo con domande a risposta multipla

    const questionContent = document.getElementById('question-content');
    
    if (question) {
        // Se è una domanda aperta
        const charCount = document.getElementById('char-count'); // Recupera l'elemento per il contatore
        const parts = question.id.split('_');
        document.getElementById('title').textContent = `Domanda ${parts[1]}`;
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
            charCount.textContent = `Caratteri scritti: ${this.value.length}`;
        });
        charCount.textContent = `Caratteri scritti: ${document.getElementById('answer').value.length}`;
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
                // Recupera la risposta salvata dal localStorage per il testo e la domanda
                const savedAnswer = localStorage.getItem(`${text.id}_question_${index}`);
                questionsHTML += `
                    <div>
                        <p><strong>Domanda ${index + 1}:</strong> ${question.domanda}</p>
                        <div>
                            ${question.opzioni.map((opzione) => {
                                const isChecked = savedAnswer === opzione ? 'checked' : ''; // Se la risposta è già stata selezionata
                                return `
                                    <label>
                                        <input type="radio" name="${text.id}_question_${index}" value="${opzione}" ${isChecked}>
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
                const radios = document.getElementsByName(`${text.id}_question_${index}`);
                radios.forEach(radio => {
                    radio.addEventListener('change', function() {
                        localStorage.setItem(`${text.id}_question_${index}`, this.value);  // Salva la risposta selezionata
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



// Funzione per salvare le risposte in un file di testo
document.getElementById('consegna').addEventListener('click', function() {
    let risposte = [];

    // Recupera le risposte delle domande aperte (textarea)
    const questionIds = Object.keys(localStorage).filter(key => key.startsWith('answer_'));
    questionIds.forEach((id, index) => {
        const risposta = localStorage.getItem(id);
        // Aggiungi la risposta al file anche se è vuota
        risposte.push(`Risposta alla Domanda ${index + 1}: ${risposta || '(nessuna risposta)'}\n`);
    });

    // Recupera le risposte delle domande a risposta multipla
    const textIds = Object.keys(localStorage).filter(key => key.startsWith('text_'));
    textIds.forEach((id, index) => {
        const risposta = localStorage.getItem(id);
        
        if (risposta !== null) {
            // Estrai i numeri da text_5_question_1 (es. 5 e 1)
            const parts = id.split('_');
            const numeroDomanda = parts[1]; // es. '5'
            const numeroSpecifico = Number(parts[3]) + 1; // es. '1'

            // Riformatta il testo in "testo 5 - 3 domanda"
            const formattedText = `domanda ${numeroSpecifico} - testo ${numeroDomanda}`;

            risposte.push(`Risposta alla ${formattedText}: ${risposta || '(nessuna risposta)'}\n`);
        }
    });

    // Creare un Blob con il contenuto delle risposte
    const blob = new Blob(risposte, { type: 'text/plain' });

    // Crea un link per scaricare il file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'risposte.txt'; // Nome del file di download
    link.click(); // Avvia il download

    console.log('Risposte salvate');
});

