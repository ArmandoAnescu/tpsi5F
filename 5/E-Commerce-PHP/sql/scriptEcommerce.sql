create database ecommerce;

create table ecommerce.prodotti(
id int primary key auto_increment,
nome varchar(40) not null,
descrizione varchar(240) not null,
prezzo decimal(8,2) not null,
quantita int not null,
check(prezzo>0),
check(quantita>=0)
);

create table ecommerce.immagini(
id int primary key auto_increment,
percorso varchar(200) not null,
colore varchar(10),
prodotto int,
foreign key(prodotto) references ecommerce.prodotti(id)
);

create table ecommerce.bundle(
id int primary key auto_increment,
nome varchar(40) not null,
descrizione varchar(240) not null,
prezzo decimal(8,2) not null,
immagine varchar(120)
);

insert into ecommerce.bundle(nome,descrizione,prezzo,immagine) values(
"Pokemon DS","Tutti i giochi pokemon del Nintendo Ds",250,"immagini_prodotti/bundle/bundle_1.jpg");

create table ecommerce.appartenere(
bundle int,
prodotto int,
primary key (bundle, prodotto),  
foreign key(bundle) references ecommerce.bundle(id) on delete cascade,
foreign key(prodotto) references ecommerce.prodotti(id) on delete cascade
);

insert into ecommerce.appartenere (bundle,prodotto) values 
(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,22),(1,23),(1,24);

create table ecommerce.specifiche(
id int primary key auto_increment,
CPU varchar(80) not null,
RAM varchar(80) not null,
Memoria varchar(80) not null,
Schermo varchar(120),
Connettivita varchar(80) not null,
Grafica varchar(80),
prodotto int,
foreign key(prodotto) references ecommerce.prodotti(id) on delete cascade
);

INSERT INTO ecommerce.prodotti (nome,descrizione, prezzo, quantita)
VALUES 
    ('Nintendo DS Lite','Console portatile classica della Nintendo, con doppio schermo e un ampio catalogo di giochi.', 149.99, 10),
    ('Nintendo 3DS','Console portatile Nintendo 3DS con schermo 3D senza occhiali e ampio catalogo di giochi.', 199.99, 10),
    ('New Nintendo 3DS','La versione migliorata della console Nintendo 3DS, con maggiore potenza e nuove funzionalità.', 249.99, 10),
    ('PlayStation 2','Console di gioco Sony, famosa per la sua vasta libreria di titoli e la retrocompatibilità con i giochi PS1.', 99.99, 10);
  
select * from ecommerce.prodotti p;

INSERT INTO ecommerce.immagini (percorso, colore, prodotto)
VALUES
    ('immagini_prodotti/nintendo_ds/nintendods_nero.jpg', 'nero', 1),
    ('immagini_prodotti/nintendo_ds/nintendods_rosso.jpg', 'rosso', 1),
    ('immagini_prodotti/nintendo_ds/nintendods_blu.jpg', 'blu', 1),
    ('immagini_prodotti/nintendo_3ds/nintendo3ds_nero.jpg', 'nero', 2),
    ('immagini_prodotti/nintendo_3ds/nintendo3ds_rosso.jpg', 'rosso', 2),
    ('immagini_prodotti/nintendo_3ds/nintendo3ds_blu.jpg', 'blu', 2),
    ('immagini_prodotti/new_nintendo_3ds/newnintendo3ds_nero.jpg', 'nero', 3),
    ('immagini_prodotti/new_nintendo_3ds/newnintendo3ds_rosso.jpg', 'rosso', 3),
    ('immagini_prodotti/new_nintendo_3ds/newnintendo3ds_blu.jpg', 'blu', 3),
    ('immagini_prodotti/playstation_2/play2_nero.jpg', 'nero', 4);

INSERT INTO ecommerce.specifiche (CPU, RAM, Memoria, Schermo, Connettivita, Grafica, prodotto)
VALUES
    ('ARM946E-S a 67 MHz e ARM7TDMI a 33 MHz', '4 MB', 'Slot per cartucce di gioco', 'Doppio schermo LCD da 3 pollici, uno dei quali touchscreen', 'Wi-Fi 802.11b', NULL, 1),
    ('Dual-core ARM11 MPCore a 268 MHz e single-core ARM9 a 134 MHz', '128 MB FCRAM', '1 GB di memoria interna, espandibile tramite schede SD', 'Schermo superiore 3D autostereoscopico da 3,53 pollici, schermo inferiore touchscreen da 3,02 pollici', 'Wi-Fi 802.11b/g', NULL, 2),
    ('Quad-core ARM11 MPCore a 804 MHz', '256 MB FCRAM', '1 GB di memoria interna, espandibile tramite schede microSD', 'Schermo superiore 3D autostereoscopico da 3,88 pollici, schermo inferiore touchscreen da 3,33 pollici', 'Wi-Fi 802.11b/g/n, NFC', NULL, 3),
    ('Emotion Engine a 294 MHz', '32 MB RDRAM', 'Supporto per Memory Card da 8 MB', NULL, 'Porta Ethernet (solo nel modello slim)', 'Graphics Synthesizer a 147 MHz con 4 MB di VRAM', 4);

INSERT INTO ecommerce.prodotti (nome, descrizione, prezzo, quantita) VALUES
    ('Game Boy Color', 'Console portatile classica Nintendo con schermo a colori, disponibile in vari colori e giochi iconici.', 79.99, 10),
    ('Game Boy Advance SP', 'Una versione compatta del Game Boy, con schermo retroilluminato e design pieghevole.', 119.99, 10),
    ('PlayStation 3', 'Console di gioco Sony della generazione PS3, con giochi in HD e supporto per il Blu-ray.', 299.99, 10),
    ('PlayStation Portable (PSP)', 'Console portatile della Sony, con un ampio catalogo di giochi e funzionalità multimediali, perfetta per giocare in movimento.', 129.99, 10),
    ('PlayStation Vita (PS Vita)', 'La console portatile di Sony con uno schermo OLED e un esperienza di gioco avanzata.', 199.99, 10),
    ('Xbox 360', 'Console Microsoft con un catalogo ricco di giochi e accessori, e supporto per giochi online tramite Xbox Live.', 249.99, 10),
    ('Wii', 'Console innovativa di Nintendo che utilizza il controllo motion-sensing, con giochi come Wii Sports.', 199.99, 10),
    ('Game Boy Advance', 'Console portatile Nintendo GameBoy Advance, compatibile con una vasta libreria di giochi retro.', 129.99, 10),
	('PlayStation 1', 'La leggendaria console PlayStation 1 di Sony, che ha dato il via alla rivoluzione dei giochi 3D.', 199.99, 10),
	('Pokémon Bianco', 'Pokémon Bianco, uno dei titoli della quinta generazione di giochi Pokémon, con una nuova regione e nuovi Pokémon.', 39.99, 10),
	('Pokémon Nero', 'Pokémon Nero, gioco della quinta generazione che presenta una regione rinnovata e nuovi Pokémon da catturare.', 39.99, 10),
	('Pokémon Bianco 2', 'Pokémon Bianco 2, un sequel diretto di Pokémon Bianco, con nuove storie e sfide da affrontare.', 49.99, 10),
	('Pokémon Nero 2', 'Pokémon Nero 2, sequel di Pokémon Nero, con nuove dinamiche e Pokémon da scoprire.', 49.99, 10),
	('Pokémon HeartGold', 'Pokémon HeartGold, remake della versione originale Pokémon Oro, con nuove funzionalità e Pokémon da catturare.', 44.99, 10),
	('Pokémon SoulSilver', 'Pokémon SoulSilver, remake di Pokémon Argento con nuove caratteristiche e avventure da vivere.', 44.99, 10),
	('Pokémon X', 'Pokémon X, il gioco della sesta generazione di Pokémon, che introduce nuove meccaniche di gioco e una nuova regione.', 59.99, 10),
	('Pokémon Y', 'Pokémon Y, versione complementare di Pokémon X, con nuovi Pokémon e nuove sfide.', 59.99, 10),
	('Pokémon Diamante', 'Pokémon Diamante, gioco della quarta generazione con una nuova regione e nuove meccaniche di gioco.', 49.99, 10),
	('Pokémon Perla', 'Pokémon Perla, versione complementare di Pokémon Diamante, con nuove avventure e Pokémon da catturare.', 49.99, 10),
	('Pokémon Platino', 'Pokémon Platino, la versione definitiva della quarta generazione con contenuti extra e una storia arricchita.', 59.99, 10),
	('Pokémon Rubino Omega', 'Pokémon Rubino Omega, remake di Pokémon Rubino con nuove funzionalità e Pokémon da scoprire.', 49.99, 10),
	('Pokémon Zaffiro Alfa', 'Pokémon Zaffiro Alfa, remake di Pokémon Zaffiro, con nuove dinamiche di gioco e contenuti extra.', 49.99, 10);


INSERT INTO ecommerce.immagini (percorso, colore, prodotto) VALUES
    ('immagini_prodotti/gameboy_color/gameboycolor_giallo.jpg', 'giallo', 5),
    ('immagini_prodotti/gameboy_color/gameboycolor_blu.jpg', 'blu', 5),
    ('immagini_prodotti/gameboy_color/gameboycolor_nero.jpg', 'nero', 5),
    ('immagini_prodotti/gameboy_sp/gameboysp_rosso.jpg', 'rosso', 6),
    ('immagini_prodotti/gameboy_sp/gameboysp_blu.jpg', 'blu', 6),
    ('immagini_prodotti/playstation_3/play3_nero.jpg', 'nero', 7),
    ('immagini_prodotti/psp/psp_nero.jpg', 'nero', 8),
    ('immagini_prodotti/psp/psp_argento.jpg', 'argento', 8),
    ('immagini_prodotti/psp/psp_blu.jpg', 'blu', 8),
    ('immagini_prodotti/psvita/psvita_nero.jpg', 'nero', 9),
    ('immagini_prodotti/psvita/psvita_blu.jpg', 'blu', 9),
    ('immagini_prodotti/psvita/psvita_bianco.jpg', 'bianco', 9),
    ('immagini_prodotti/xbox_360/xbox360_bianco.jpg', 'bianco', 10),
    ('immagini_prodotti/xbox_360/xbox360_nero.jpg', 'nero', 10),
    ('immagini_prodotti/wii/wii_bianco.jpg', 'bianco', 11),
    ('immagini_prodotti/wii/wii_nero.jpg', 'nero', 11),
    ('immagini_prodotti/gameboy_advance/gameboyadvance_viola.jpg', 'viola', 12),
    ('immagini_prodotti/gameboy_advance/gameboyadvance_bianco.jpg', 'bianco', 12),
	('immagini_prodotti/playstation_1/play1_grigio.jpg', 'grigio',13),
	('immagini_prodotti/games/pkmn_white_0.jpg', NULL, 14),
	('immagini_prodotti/games/pkmn_black_0.jpg', NULL, 15),
	('immagini_prodotti/games/pkmn_white2_0.jpg', NULL, 16),
	('immagini_prodotti/games/pkmn_black2_0.jpg', NULL, 17),
	('immagini_prodotti/games/pkmn_heartgold_0.jpg', NULL, 18),
	('immagini_prodotti/games/pkmn_soulsilver_0.jpg', NULL, 19),
	('immagini_prodotti/games/pkmn_X_0.jpg', NULL, 20),
	('immagini_prodotti/games/pkmn_Y_0.jpg', NULL, 21),
	('immagini_prodotti/games/pkmn_diamond_0.jpg', NULL, 22),
	('immagini_prodotti/games/pkmn_pearl_0.jpg', NULL, 23),
	('immagini_prodotti/games/pkmn_platinum_0.jpg', NULL, 24),
	('immagini_prodotti/games/pkmn_omegaruby_0.jpg', NULL, 25),
	('immagini_prodotti/games/pkmn_alphasapphire_0.jpg', NULL, 26);

INSERT INTO ecommerce.specifiche (CPU, RAM, Memoria, Grafica, Connettivita, prodotto) VALUES
('MIPS R3000A a 33,87 MHz', '2 MB RAM principale, 1 MB VRAM', 'Memory Card da 128 KB', 'GPU personalizzata a 33 MHz con supporto per risoluzioni fino a 640×480', 'Porte per controller e Memory Card, uscita AV analogica', '0012');


INSERT INTO ecommerce.specifiche (CPU, RAM, Memoria, Schermo, Connettivita, Grafica, prodotto) VALUES
    ('Sharp LR35902 a 8 MHz', '32 KB', 'Slot per cartucce di gioco', 'LCD a colori da 2,3 pollici', 'Porta seriale per collegamento a cavo link', NULL, 5),
    ('ARM7TDMI a 16,8 MHz', '32 KB di RAM interna, 96 KB di VRAM', 'Slot per cartucce di gioco', 'LCD TFT da 2,9 pollici retroilluminato', 'Porta seriale per collegamento a cavo link', NULL, 6),
    ('Cell Broadband Engine a 3,2 GHz', '256 MB XDR DRAM', 'Hard disk da 20 GB a 500 GB', NULL, 'Wi-Fi 802.11b/g, Bluetooth 2.0, Ethernet', 'RSX Reality Synthesizer a 550 MHz con 256 MB di GDDR3 VRAM', 7),
    ('MIPS R4000 a 333 MHz', '32 MB / 64 MB', 'Memory Stick PRO Duo fino a 32 GB', 'LCD TFT da 4,3 pollici (480×272 pixel)', 'Wi-Fi 802.11b, USB 2.0, UMD per giochi e film', NULL, 8),
    ('Quad-core ARM Cortex-A9', '512 MB RAM, 128 MB VRAM', 'Memory Card proprietaria fino a 64 GB', 'OLED da 5 pollici (960×544 pixel) per il modello originale, LCD per il modello Slim', 'Wi-Fi 802.11b/g/n, Bluetooth 2.1', NULL, 9),
    ('IBM PowerPC Xenon a 3,2 GHz (tri-core)', '512 MB GDDR3', 'Hard disk da 20 GB a 250 GB', NULL, 'Wi-Fi (modelli Slim e E), Ethernet, USB 2.0', 'ATI Xenos a 500 MHz con 10 MB di eDRAM', 10),
    ('IBM PowerPC Broadway a 729 MHz', '88 MB (24 MB integrati + 64 MB GDDR3)', '512 MB NAND flash, espandibile con schede SD', NULL, 'Wi-Fi 802.11b/g, Bluetooth, USB 2.0', 'ATI Hollywood a 243 MHz con 3 MB di eDRAM', 11),
    ('ARM7TDMI a 16,8 MHz', '32 KB di RAM interna, 96 KB di VRAM', 'Slot per cartucce di gioco', 'LCD TFT da 2,9 pollici', 'Porta seriale per collegamento a cavo link', NULL, 12);   

create table ecommerce.utenti(
id INT primary key AUTO_INCREMENT ,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL
);
create table ecommerce.configurazione_sito(
    id INT PRIMARY KEY AUTO_INCREMENT,
    chiave VARCHAR(255) UNIQUE NOT NULL,  -- Identificatore del mio file
    valore TEXT NOT NULL                   -- Il valore in formato JSON
);


INSERT INTO ecommerce.configurazione_sito (chiave, valore)
VALUES
('logo', '<img src=\'PixelHaven_Logo_Transparent.png\' id=\'logo\'>'),
('navbar', '[{"nav-link": "index.php", "nav-text": "Home"}, {"nav-link": "archivio.php", "nav-text": "Archivio"}, {"nav-link": "carrello.php", "nav-text": "Carrello"}]'),
('title', '"PixelHaven"'),
('pageTitle', '"PixelHaven"'),
('introText', '"Benvenuti a PixelHaven!! Il paradiso per gli appassionati del retro gaming.Qui troverete una vasta gamma di giochi e console retro. Dalla famiglia Nintendo a quella della Sony e microsoft."'),
('accordion_items', '{
  "accordion-item-1": [{"question": "Cosa posso trovare?", "definition": "Come suggerisce il nome e la nostra intro, noi siamo un sito e-commerce dove potete trovare giochi e console retro di ogni tipo!"}],
  "accordion-item-2": [{"question": "Siete affidabili?", "definition": "Certo! Il nostro obiettivo è offrire un servizio di alta qualità e garantire a tutti un ottima esperienza!"}],
  "accordion-item-3": [{"question": "Che faccio se ho dei problemi o non sono soddisfatto?", "definition": "Noi offriamo 40 giorni di rimborso, e una garanzia fino a 5 anni."}],
  "accordion-item-4": [{"question": "Come posso pagare?", "definition": "Siamo abilitati a pagamenti con PayPal o Carta di Credito."}]
}'),
('types', '["--", "console", "videogame", "bundle"]'),
('footer', '{"text": "Anescu Armando 5F"}'),
('cardNumLabel', '"Numero della carta:"'),
('namesLabel', '"Nome e Cognome:"'),
('addrCity', '"Città e Indirizzo:"'),
('pcLabel', '"Codice postale:"'),
('countryLabel', '"Paese:"'),
('phoneNumber', '"Numero di telefono:"'),
('submit', '"Procedi al pagamento"'),
('personalDetails', '"Dettagli personali:"'),
('secCode', '"Codice di sicurezza (CVV):"'),
('expDate', '"Data di scadenza (MM/YY):"'),
('paymentMethod', '"Metodo di pagamento:"'),
('transaction', '"Pagamento"'),
('discountText', '"Codice sconto"'),
('applyDiscount', '"Usa codice sconto"'),
('archiveTitle', '"Prodotti"'),
('cartTitle', '"Carrello"'),
('subTitle', '"Il nostro obbiettivo"'),
('subText', '"L\'obbiettivo di noi di PixelHaven è di rendere accessibile a tutti, le vecchie console e videogiochi, noi ci occupiamo di trovare, ripristinare, imballare e inviare a te il prodotto. Noi ci assicuriamo della cura dei prodotti così che, tu e tutte le altre persone interessate possiate divertirvi senza preoccupazioni. Cerchiamo anche di rendere i nostri pezzi non solo competitivi ma anche accessibili a tutti, perchè il gaming è un privilegio di tutti."'),
('emptyCart', '"Svuota il carrello"'),
('acquista', '"Procedi all\'acquisto"'),
('returnArrow', '"<i class=\'bi bi-arrow-left\'></i>"'),
('specsTable', '"tabella specifiche"'),
('addToCart','Aggiungi al Carrello'),
('buyNow','Compra Ora');

INSERT INTO ecommerce.configurazione_sito (chiave, valore)
values ('removeItem','Rimuovi dal carrello'),('seeProduct','Vedi prodotto');
INSERT INTO ecommerce.configurazione_sito (chiave, valore)
values ('cartWarning','Il tuo carrello è vuoto');
INSERT INTO ecommerce.configurazione_sito (chiave, valore)
values ('specsTitle','Specifiche');
INSERT INTO ecommerce.configurazione_sito (chiave, valore)
VALUES
('paymentmethods', '["Visa", "Mastercard", "PayPal"]');


create table ecommerce.codici_sconto(
id int primary key auto_increment,
codice varchar(120) not null unique,
value int
);

insert into ecommerce.codici_sconto (codice,value) values
("ARMANDO",15),
("WHEREISOMNIMAN",20);

create table ecommerce.usare(
codice_sconto int,
user varchar(100),
primary key(codice_sconto,user),
foreign key (codice_sconto) references ecommerce.codici_sconto(id),
foreign key (user) references ecommerce.utenti(email)
);

create table ecommerce.carrelli(
id int primary key auto_increment,
contenuto JSON not null,
utente int,
price decimal(8,2) not null,
foreign key (utente) references ecommerce.utenti(id)
);
