function loadContent() {
    fetch('informatica.json') // Assicurati che il file JSON si trovi nel percorso corretto
        .then(response => response.json())
        .then(data => {
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
            // Popolare le sezioni
            document.getElementById('client-title').textContent=data.client;
            document.getElementById('client-content').textContent=data.clientContent;
            document.getElementById('server-title').textContent=data.server;
            document.getElementById('server-content').textContent=data.serverContent;

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
            const additonalInfo=document.getElementById('additional-info');
            additonalInfo.innerHTML=data.sections.additonalInfo;
            // Impostare l'immagine
            const imgElement = document.getElementById('image-src');
            imgElement.src = data.image.src;
            imgElement.alt = data.image.alt;
            const imgSource = document.createElement('p');
            imgSource.innerHTML = data.image.source;
            additonalInfo.appendChild(imgElement);
            additonalInfo.appendChild(imgSource);

            // Impostare il footer
            document.querySelector('.footer span').textContent = data.footer.text;
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

document.addEventListener('DOMContentLoaded', loadContent);
