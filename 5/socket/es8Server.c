/*
Esercizio 8
crivere il codice in C, di un applicazione Socket CLIENT-SERVER in cui il server riceve in input un vettore
di numeri interi, dopo aver effettuato gli eventuali ed opportuni controlli (se necessari), rispedisce al Client il
massimo ed il minimo .
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
int Max(int arr[], int len)
{

    int MAX=arr[0];
    for (int i = 1; i < len; i++)
    {
        if (MAX<arr[i])
        {
            MAX=arr[i];
        }
    }
    return MAX;
}
int Min(int arr[], int len)
{

    int MIN=arr[0];
    for (int i = 1; i < len; i++)
    {
        if (MIN>arr[i])
        {
            MIN=arr[i];
        }
    }
    return MIN;
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
        int max = Max(array, len);
        int min = Min(array, len);
        sprintf(stringaRis, "Il massimo è %d il minimo è %d", max,min);
        write(soa, &stringaRis, strlen(stringaRis));
        close(soa);
    }
    return 0;
}