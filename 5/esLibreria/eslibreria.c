/*
L'obiettivo è quello di creare una rappresentazione per i e le a cui appartengono. Ogni libro avrà diverse informazioni e sarà assegnato a una categoria specifica.

Implementa un programma in linguaggio C che gestisce i libri di una libreria. Ogni libro è identificato da titolo, autore, anno di pubblicazione e prezzo. I libri sono organizzati per categoria (ad esempio, narrativa, saggistica, scienze, arte), e ogni categoria può avere più libri.
Immaginate di dover gestire questi raccolta di libri, suddivisi per categorie, e di dover trovare un modo per tenere traccia delle informazioni di ciascun libro. Ogni libro dovrà avere un titolo, che lo identificherà, un autore, che ci dirà chi ha scritto il libro, l'anno di pubblicazione, che ci permetterà di sapere quando è stato pubblicato, e infine un prezzo, per indicare quanto costa.
Dovrete anche pensare a come suddividere questi libri in categorie. Ogni categoria avrà un nome, che indicherà di che tipo di libri stiamo parlando, come "Narrativa" o "Scienze", e conterrà una lista di libri che appartengono a quella specifica categoria.
Il vostro compito sarà trovare il modo migliore per organizzare e gestire tutte queste informazioni. Inoltre, dovrete scrivere delle funzioni che vi permettano di stampare tutti i libri che appartengono a una determinata categoria, cercare un libro specifico in base al titolo e trovare tutti i libri che rientrano in una certa categoria.
Sarà vostro compito decidere come rappresentare questi dati e implementare le funzioni necessarie per far funzionare il programma.

Buon lavoro!La consegna dovrà contenere il codice (su git) e una relazione dettagliata sulla PROGETTAZIONE e sulle firme delle funzioni da realizzare

In allegato, qui, trovate il file da cui pescare i libri per popolare correttamente la libreria.
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX_CATEGORIE 20 // definisco il num max di categorie e il nome del files
#define NOME_FILE "libri.csv"
typedef struct Libro
{
    char Autore[30];
    char Titolo[40];
    char Categoria[40];
    int anno;
    float prezzo;
} Libro;
typedef struct Categoria
{
    char nomeCategoria[40];
    Libro libri[40];
    int contatore;
} Categoria;
//definisco le strutture e i loro attributi
Categoria libreria[30];//creo il mio array di categorie ovvero la mia libreria
int categorieEsitenti = 0;//tengo traccia di quante categorie ho
int Menu()
{
    int scelta;
    printf("-----------------------------------\n");
    printf("1) Inserisci libro\n");
    printf("2) Visualizza libri\n");
    printf("3) Visualizza categoria\n");
    printf("4) Cerca titolo\n");
    printf("0) Esci\n");
    printf("-----------------------------------\n");
    printf("Inserisci una scelta:\n");
    scanf("%d", &scelta);//menu dove ritorno la scelta dell'utente
    return scelta;
}

void Visualizza()
{//visualizzo i miei dati
    printf("========LIBRERIA======== \n");
    for (int i = 0; i < categorieEsitenti; i++)
    {
        printf("\n Categoria: %s \n \n", libreria[i].nomeCategoria);
        for (int j = 0; j < libreria[i].contatore; j++)
        {
            printf("\n Nome:%s Autore:%s Anno:%d Categoria:%s  Prezzo:%f \n", libreria[i].libri[j].Titolo, libreria[i].libri[j].Autore, libreria[i].libri[j].anno, libreria[i].libri[j].Categoria, libreria[i].libri[j].prezzo);
        }
    }
}
int CercaCategoria(char incognita[])//cerco la categoria fornita
{
    for (int i = 0; i < categorieEsitenti; i++)
    {
        if (strcasecmp(libreria[i].nomeCategoria, incognita) == 0)//controllo che isiano uguali e se lo sono ritorno la pos altrimenti -1
        {
            return i;
        }
    }
    return -1;
}
void VisualizzaCategoria()
{
    char ricerca[40];
    printf("Inserisci il nome della categoria che vuoi vedere\n");//chiedo la categoria
    getchar();//rimuovo le newline
    fgets(ricerca, sizeof(ricerca), stdin);
    ricerca[strcspn(ricerca, "\n")] = 0;//leggo la stringa da input e rimuovo la new line finale
    int categoria = CercaCategoria(ricerca);//cerco se la categoria esiste già
    if (categoria != -1)//se esiste stampo tutti i libri
    {
        for (int i = 0; i < libreria[categoria].contatore; i++)
        {
            printf("\n Nome:%s   Autore:%s    Anno:%d    Categoria:%s    Prezzo:%f \n", libreria[categoria].libri[i].Titolo, libreria[categoria].libri[i].Autore, libreria[categoria].libri[i].anno, libreria[categoria].libri[i].Categoria, libreria[categoria].libri[i].prezzo);
        }
    }
    else//altrimenti avverto l'utente
    {
        printf("Categoria inserita non esistente \n");
    }
}
void CercaTitolo()
{
    char titolo[40];//chiedo il titolo
    printf("Inserisci il titolo del libro da cercare \n");
    getchar();
    fgets(titolo, sizeof(titolo), stdin);//rimuovo la newline e prendo il titolo
    titolo[strcspn(titolo, "\n")] = 0;//rimuovo la new line finale
    for (int i = 0; i < categorieEsitenti; i++)
    {
        for (int j = 0; j < libreria[i].contatore; j++)
        {
            if (strcasecmp(libreria[i].libri[j].Titolo, titolo) == 0)//confronto le 2 stringhe e stampo il libro se trovato
            {
                printf("\n Nome:%s   Autore:%s    Anno:%d    Categoria:%s    Prezzo:%f \n", libreria[i].libri[j].Titolo, libreria[i].libri[j].Autore, libreria[i].libri[j].anno, libreria[i].libri[j].Categoria, libreria[i].libri[j].prezzo);
            }
        }
    }
}
void LetturaLibri()
{
    Libro librilettura[50];
    int n = 0;
    FILE *fLibri = fopen(NOME_FILE, "r");//apro il file
    if (fLibri == NULL)
    {
        printf("Errore apertura file!\n");//se non si apre termino il programma
        exit(1);
    }
    while (!feof(fLibri))//itero fino a fine file
    {
        Libro libro;
        fscanf(fLibri, "%39[^,],%29[^,],%d,%f,%39[^\n]", libro.Titolo, libro.Autore, &libro.anno, &libro.prezzo, libro.Categoria);
        //leggo i vari dati fermandomi prima delle , e del \n per le stringhe
        librilettura[n] = libro;
        n++;
    }
    fclose(fLibri);//chiudo il file
    printf("\n \n");
    int controlloCat = 0;
    for (int i = 0; i < n; i++)
    {
        controlloCat = CercaCategoria(librilettura[i].Categoria);//cerco le categorie
        if (controlloCat != -1)
        {
            libreria[controlloCat].libri[libreria[controlloCat].contatore] = librilettura[i];
            libreria[controlloCat].contatore++;//se la categoria c'è aggiungo il libro
        }
        else
        {
            strcpy(libreria[categorieEsitenti].nomeCategoria, librilettura[i].Categoria);//aggiungo la nuova categoria se non ce
            libreria[categorieEsitenti].libri[libreria[categorieEsitenti].contatore] = librilettura[i];
            libreria[categorieEsitenti].contatore++;
            categorieEsitenti++;
        }
    }
}
void Inserisci()
{
    Libro inserimento;//creo un nuovo libro
    printf("inserisci la categoria del libro \n");
    scanf("%s", inserimento.Categoria);
    printf("inserisci l'autore del libro \n");
    scanf("%s", inserimento.Autore);
    printf("inserisci il titolo del libro \n");
    scanf("%s", inserimento.Titolo);
    printf("inserisci l'anno del libro \n");
    scanf("%d", &inserimento.anno);
    printf("inserisci il prezzo del libro \n");
    scanf("%f", &inserimento.prezzo);//chiedo i vari campi del libro
    int pos = CercaCategoria(inserimento.Categoria);
    if (pos != -1)//controllo se esiste già e o aggiungo in caso
    {
        libreria[pos].libri[libreria[pos].contatore] = inserimento;
        libreria[pos].contatore++;
    }
    else//se non ce controllo che non abbia raggiunto il numero max di categorie e la aggiungo
    {
        if (categorieEsitenti < MAX_CATEGORIE)
        {
            strcpy(libreria[categorieEsitenti].nomeCategoria, inserimento.Categoria);
            libreria[categorieEsitenti].libri[libreria[categorieEsitenti].contatore] = inserimento;
            libreria[categorieEsitenti].contatore++;
            categorieEsitenti++;
        }
        else
        {
            printf("Ci dispiace ma abbiamo raggiunto il nuemro massimo di categorie \n");
        }
    }
}
void Scelta(int scelta)
{
    switch (scelta)
    {
    case 1:
        Inserisci();
        break;
    case 2:
        Visualizza();//in base alla scelta chiamo una delle funzioni
        break;
    case 3:
        VisualizzaCategoria();
        break;
    case 4:
        CercaTitolo();
        break;
    }
}

int main(int argc, char *argv[])
{
    LetturaLibri();//leggo i libri
    int risultato;
    do
    {
        risultato = Menu();
        if (risultato != 0)
        {
            Scelta(risultato);//ciclo dove continuo a mostrare il menu
        }
        else
        {
            break;
        }

    } while (1);
    return 0;
}
