// Funzione per il reset delle risposte
function resetForm() {
    // Reset delle domande aperte
    const questionId = getParameterByName('id'); // Ottieni l'id dalla query string
    const question = data.domande_aperte.find(q => q.id == questionId); // Trova la domanda aperta
    const text = data.testi.find(t => t.id == questionId); // Trova il testo con domande a risposta multipla
    if (question) {
        const questionIds = Object.keys(localStorage).filter(key => key.startsWith('answer_'));
        localStorage.removeItem(`answer_${questionId}`);  // Rimuovi la risposta dal localStorage
        // Reset delle aree di testo (textarea) e radio button
        const answerTextarea = document.getElementById('answer');
        if (answerTextarea) {
            answerTextarea.value = '';  // Svuota la textarea
        }
    } else if (text) {
        // Reset delle domande a risposta multipla
        const textIds = Object.keys(localStorage).filter(key => key.startsWith(questionId));
        textIds.forEach(id => {
            localStorage.removeItem(id);  // Rimuovi la risposta dal localStorage
        });

        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;  // Deseleziona i radio button
        });
    }
    console.log('Domande e risposte reset');
}
// Assegna l'evento al tasto di reset
document.getElementById('btn-reset').addEventListener('click', resetForm);
