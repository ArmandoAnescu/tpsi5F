function loadContent() {
    fetch('informatica.json') // Assicurati che il file JSON si trovi nel percorso corretto
        .then(response => response.json())
        .then(data => {
            const icona=document.getElementById('nav-brand');
            icona.innerHTML=data.icon;
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
            /// Impostare il titolo
            document.title = data.title;
            document.getElementById('main-title').textContent = data.title;

            // Impostare l'introduzione
            document.getElementById('introduction-title').textContent = data.introtitle;
            document.getElementById('introduction-content').textContent = data.intro;
            // Assumendo che la struttura del JSON sia quella che hai fornito, devi usare gli indici dell'array per accedere ai dati.

            // Accedi ai dati della sezione client
            document.getElementById('client-title').textContent = data.sections[0].client;
            document.getElementById('client-content').innerHTML = data.sections[0].clientContent;

            // Accedi ai dati della sezione server
            document.getElementById('server-title').textContent = data.sections[1].server;
            document.getElementById('server-content').innerHTML = data.sections[1].serverContent;


            // Ottieni il contenitore della lista
            const serverList = document.getElementById('server-list');
            // Ottieni i dati relativi ai tipi di server dalla sezione del JSON
            const serverTypes = data.sections.find(section => section.heading === 'Tipi di server').content;
            // Per ogni tipo di server, crea un elemento della lista
            serverTypes.forEach(server => {
                // Crea un elemento di lista (li)
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');

                // Aggiungi il nome del tipo di server (server_type)
                const serverName = document.createElement('strong');
                serverName.textContent = server.server_type;
                listItem.appendChild(serverName);

                // Aggiungi la descrizione
                listItem.innerHTML += `: ${server.description}`;

                // Aggiungi l'elemento alla lista
                serverList.appendChild(listItem);
            });
            //link
            const additonalInfo = document.getElementById('additional-info');
            additonalInfo.innerHTML = data.sections[3].additionalInfo;
            // Impostare l'immagine
            const imgElement = document.getElementById('image-src');
            imgElement.src = data.image.src;
            imgElement.alt = data.image.alt;
            const imgSource = document.getElementById('image-source');
            imgSource.innerHTML = data.image.source;

            // Impostare il footer
            document.querySelector('.footer span').textContent = data.footer.text;
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

document.addEventListener('DOMContentLoaded', loadContent);
