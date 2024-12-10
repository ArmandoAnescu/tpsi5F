document.addEventListener("DOMContentLoaded", function () {
    const jsonUrl = "glossario.json"; // Percorso del file JSON

    // Carica il file JSON
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Popola la navbar
            const navbar = document.getElementById("navbar");
            data.navbar.forEach(item => {
                const navItem = document.createElement("li");
                navItem.className = "nav-item";
                navItem.innerHTML = `<a class="nav-link" href="${item[`nav-link`]}">${item[`nav-text`]}</a>`;
                navbar.appendChild(navItem);
            });

            // Popola il titolo e l'introduzione
            document.getElementById("title").textContent = data.title;
            document.getElementById("intro").textContent = data.intro;

            // Popola l'accordion
            const accordion = document.getElementById("accordionExample");
            Object.keys(data.accordion_items).forEach((key, index) => {
                const item = data.accordion_items[key][0];
                const accordionItem = document.createElement("div");
                accordionItem.className = "accordion-item";

                accordionItem.innerHTML = `
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button ${index === 0 ? "" : "collapsed"}" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#collapse${index}" 
                                aria-expanded="${index === 0 ? "true" : "false"}" 
                                aria-controls="collapse${index}">
                            ${item.term}
                        </button>
                    </h2>
                    <div id="collapse${index}" 
                         class="accordion-collapse collapse ${index === 0 ? "show" : ""}" 
                         aria-labelledby="heading${index}" 
                         data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            ${item.definition}
                            ${item.link ? `<a href="${item.link}" class="btn btn-link">${item.link_text}</a>` : ""}
                        </div>
                    </div>
                `;

                accordion.appendChild(accordionItem);
            });

            // Popola il footer
            document.getElementById("footer-text").textContent = data.footer.text;
        })
        .catch(error => {
            console.error("Errore durante il caricamento del JSON:", error);
        });
});
