
#include <stdio.h>      //std in-out
#include <stdlib.h>     //per utilizzo di certe funzioni:htonl,rand,....
#include <sys/socket.h> //funz. accept+bind+listen
#include <sys/types.h>  //funz. accept
#include <netinet/in.h> //definiscono la struttura degli indirizzi
#include <string.h>     //funz. stringhe
#include <errno.h>      //gestioni errori connessione
#include <ctype.h>      //bind
#include <unistd.h>     // file header che consente l'accesso alle API dello standard POSIX

#define DIM 512
#define SERVERPORT 1313
void Comparalunghezza(char str1[], char str2[], char strRis[])
{
    if (strlen(str1) > strlen(str2))
    {
        sprintf(strRis, "la stringa 1 %s è più lunga\n", str1);
    }
    else if (strlen(str1) < strlen(str2))
    {
        sprintf(strRis, "la stringa 2 %s è più lunga\n", str2);
    }
    else
    {
        sprintf(strRis, "la stringa 1 %s e la stringa 2 %s sono uguali\n", str1, str2);
    }
}
int main(int argc, char **argv)
{
    struct sockaddr_in servizio, addr_remoto; // record con i dati del server e del client
    int socketfd, soa, fromlen = sizeof(servizio);
    int len;
    char stringaRis[DIM], str1[DIM], str2[DIM];
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

        read(soa, str1, sizeof(str1));
        read(soa, str2, sizeof(str2));
        
        Comparalunghezza(str1, str2, stringaRis);
        write(soa, stringaRis, sizeof(stringaRis));
        close(soa);
    }
    return 0;
}