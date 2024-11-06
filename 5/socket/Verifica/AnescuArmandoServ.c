#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h> //libreria per le funzioni del socket
#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>
#include <string.h>
#include <ctype.h>
#include <unistd.h>

#define SERVERPORT 1313 // definisco la porta su cui il server ascolta
#define DIM 6           // definisco la dimensione dell'array di numeri
#define STR_LEN 40      // definisco la lunghezza della stringa risultato

void OrdinamentoDueADue(int array[])
{
    int support;                     // definsco la var di supporto
    for (int i = 0; i < DIM; i += 2) // incremento 2 a 2
    {
        support = array[i];      // assegno a support il valore corrente di array alla pos i
        array[i] = array[i + 1]; // assegno all pos i il valore succesivo
        array[i + 1] = support;  // al valore succesivo gli assegno tramite support il valore precedente
        // printf("%d %d \n", array[i], array[i + 1]);
    }
}
int FrequenzaPrimaComponente(int array[])
{
    int cont = 1, val = array[0];  // creo il contatore inizializzato a 1 perchè il primo valore sarà sempre uguale alla prima occorenza e al valore da controllar assegno la prima istanza
    for (int i = 1; i <= DIM; i++) // parto da 1 perchè conto già il primo valore
    {
        if (val == array[i]) // se il valore è uguale incremento il contatore
        {
            cont++;
        }
    }
    return cont; // ritorno il contatore
}
int main(int argc, char *argv[])
{
    struct sockaddr_in servizio, addr_remoto;
    servizio.sin_family = AF_INET;                 // definisco l'uso di ipv4
    servizio.sin_addr.s_addr = htonl(INADDR_ANY);  // assegno l'indirizzo onvertondolo a un formato di 32 bit
    servizio.sin_port = htons(SERVERPORT);         // assegno la porta del server in un formato da 16 bit
    int socketfd, soa, fromlen = sizeof(servizio); // creo il socket descriptor la lunghezza e la variabile quando accetta la richiesta
    char strRisultato[STR_LEN];                    // definisco la stringa risultato
    socketfd = socket(AF_INET, SOCK_STREAM, 0);    // creo la socket
    if (socketfd == -1)                            // controllo che non ci siano errori nella creazione se ci sono avverto il l'utene ed esco dal programma
    {
        printf("Errore nella socket \n");
        exit(1);
    }
    int arrayNum[DIM]; // definisco l'array di numeri
    if (bind(socketfd, (struct sockaddr *)&servizio, sizeof(servizio)) == -1)
    {                                           // lego il mio server alla socket
        printf("collegamento non risucito \n"); // se il collegamento non riesce termino il programma
        exit(1);
    }
    listen(socketfd, 10); // dico al server di ascoltare al massimo 10 client
    for (;;)              // ciclo for infinto perchè il servizio deve essere always on e disponibile
    {
        printf("\nServer in ascolto \n");                                       // informo che il server è acceso
        soa = accept(socketfd, (struct sockaddr *)&addr_remoto, &fromlen);      // accetto le connesioni in arrivo
        if(soa==-1)//controllo che ilcollegamento avvenga con successo
        {
            printf("errore nella connesione col client\n"); // nel caso il collegamento non vada stampo a video e termino il programma
            exit(1);
        }
        read(soa, arrayNum, sizeof(arrayNum));                                  // leggo l'array di dati
        int n = FrequenzaPrimaComponente(arrayNum);                             // chiamo il metodo per contare l'istanza
        sprintf(strRisultato, "il numero %d compare %d volte", arrayNum[0], n); // scrivo il risultato in formato stringa
        write(soa, strRisultato, sizeof(strRisultato));                         // mando al client il risultato
        OrdinamentoDueADue(arrayNum);                                           // chiamo il metodo ordinamento
        write(soa, arrayNum, sizeof(arrayNum));                                 // mando al client l'arary ordinato
        close(soa);                                                             // chiudo la connessione col client ma non la socket
    }
    return 0;
}