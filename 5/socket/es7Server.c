/*
Scrivere il codice in C, di un applicazione Socket CLIENT-SERVER in cui il server riceve in input un
vettore di numeri interi, dopo aver effettuato gli eventuali ed opportuni controlli (se necessari), rispedisce al
Client la somma e la media dei numeri pari e la somma e la media dei numeri dispari.
*/
#include <stdio.h>      //std in-out
#include <stdlib.h>     //per utilizzo di certe funzioni:htonl,rand,....
#include <sys/socket.h> //funz. accept+bind+listen
#include <sys/types.h>  //funz. accept
#include <netinet/in.h> //definiscono la struttura degli indirizzi
#include <string.h>     //funz. stringhe
#include <errno.h>      //gestioni errori connessione
#include <ctype.h>      //bind
#include <unistd.h>     // file header che consente l'accesso alle API dello standard POSIX

#define DIM 60
#define SERVERPORT 1313
int Somma(int arr[], int *len)
{
    int somma = 0,cont=0;
    for (int i = 0; i < *len; i++)
    {
        if (arr[i] %2 != 0)
        {
            somma = somma + arr[i];
            cont++;
        }
    }
    *len=cont;
    return somma;
}
int main(int argc, char **argv)
{
    struct sockaddr_in servizio, addr_remoto; // record con i dati del server e del client
    int socketfd, soa, fromlen = sizeof(servizio);
    int len;
    char stringaRis[DIM];
    servizio.sin_family = AF_INET;
    servizio.sin_addr.s_addr = htonl(INADDR_ANY);
    servizio.sin_port = htons(SERVERPORT);
    socketfd = socket(AF_INET, SOCK_STREAM, 0);
    bind(socketfd, (struct sockaddr *)&servizio, sizeof(servizio));
    // poniamo il server in ascolto delle richieste dei client
    listen(socketfd, 10);
    for (;;)
    {
        printf("\n\nServer in ascolto... \n");
        fflush(stdout);
        soa = accept(socketfd, (struct sockaddr *)&addr_remoto, &fromlen);
        // legge dal client
        read(soa, &len, sizeof(len));
        int array[len];
        read(soa, array, sizeof(array));
        int somma = Somma(array, &len);
        float media = somma / len;
        sprintf(stringaRis, "La somma dei numeri dispari è %d la media è %.1f", somma, media);
        write(soa, &stringaRis, strlen(stringaRis));
        close(soa);
    }
    return 0;
}