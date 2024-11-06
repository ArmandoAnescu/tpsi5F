#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h> //libreria per le funzioni del socket
#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>
#include <string.h>
#include <ctype.h>
#include <unistd.h>

#define SERVERPORT 1313 // definisco la porta su cui si trova il server
#define DIM 6           // definisco la lungehzza del numeri
#define STR_LEN 40      // definisco la lunghezza della stringa

void popolaArray(int array[])
{
    int n;
    for (int i = 0; i < DIM; i++)
    {
        printf("Inserisci in un numero maggiore di 0 \n"); // chiedo all'utente di inseire i dati
        scanf("%d", &n);
        if (n > 0)
        {
            array[i] = n; // se il valore che ha inserito è >0 assegno il valore
        }
        else
        {
            array[i] = 1; // altrimenti assegno di default uno
        }
    }
}
int main(int argc, char *argv[])
{
    struct sockaddr_in servizio;
    servizio.sin_family = AF_INET;                // definisco l'uso di ipv4
    servizio.sin_addr.s_addr = htonl(INADDR_ANY); // conveto in formato a 32 bit l'indirizzo ip
    servizio.sin_port = htons(SERVERPORT);        // converto a 16 bit il numero di porta del server
    int socketfd;                                 // definisco la socket descriptor
    int arrayN[DIM], arrayOrdinato[DIM];          // definisco gli array dove verranno salvati i dati
    char strRisultato[STR_LEN];
    socketfd = socket(AF_INET, SOCK_STREAM, 0); // definisco la socket
    if (socketfd == -1)                         // controllo che sia stata creata con successo
    {
        printf("Errore nella socket \n");
        exit(1);
    }
    if (connect(socketfd, (struct sockaddr *)&servizio, sizeof(servizio)) == -1) // connetto il mio client al server
    {
        printf("Errore nella connesione \n"); // se la connessione non va a buon fine termino il programma
        exit(1);
    }
    popolaArray(arrayN);                                  // chiedo all'utente i numeri che vuole inserire
    write(socketfd, arrayN, sizeof(arrayN));              // mando al server l'array
    read(socketfd, strRisultato, sizeof(strRisultato));   // leggo il risultato del conteggio
    printf("%s\n", strRisultato);                         // stampo il risultato
    read(socketfd, arrayOrdinato, sizeof(arrayOrdinato)); // leggo ora il risultato dell'ordinamento
    printf("l'array a coppie di 2 è:\n");
    for (int i = 0; i < DIM; i++) // stampo l'array ordinato
    {
        printf("%d \n", arrayOrdinato[i]);
    }
    close(socketfd); // chiudo la socket
    return 0;        // termino il programma
}
/*
Scrivere il codice di un'applicazione socket client-server in linguaggio C. L'applicazione deve consentire al client di inviare al server un vettore di numeri
interi maggiori di zero. Il server dovrà analizzare il vettore ricevuto dal client e restituire al client:
il vettore con le componenti alternate a due a due (esempio: Vettore inserito: 1,2,3,4 -  vettore alternato: 2,1,4,3 )
e la frequenza della prima componente all’interno del vettore stesso (esempio: Vettore inserito: 1,2,1,4  - la prima componente si ripete 2 volte all’interno del vettore).
*/