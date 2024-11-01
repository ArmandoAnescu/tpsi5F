/*
Esercizio 3
Scrivere il codice in C, di un applicazione Socket CLIENT-SERVER in cui il server riceve in input 1 stringa
e, dopo aver effettuato gli eventuali ed opportuni controlli (se necessari), rispedisce al Client il messaggio se
è palindroma oppure non lo è.
*/
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <string.h>
#include <errno.h>
#include <ctype.h>
#include <unistd.h>

#define DIM 512
#define SERVERPORT 1313

int main(int argc, char **argv)
{
    struct sockaddr_in servizio;
    int socketfd, cond;
    char stringa[DIM];
    servizio.sin_family = AF_INET;
    servizio.sin_addr.s_addr = htonl(INADDR_ANY);
    servizio.sin_port = htons(SERVERPORT);
    socketfd = socket(AF_INET, SOCK_STREAM, 0);
    connect(socketfd, (struct sockaddr *)&servizio, sizeof(servizio));
    printf("Inserisci la stringa\n");
    scanf("%s", stringa);
    write(socketfd,stringa,strlen(stringa));
    read(socketfd,&cond,sizeof(cond));
    if (cond)
    {
        printf("la stringa è palindroma \n");
    }else 
    {
        printf("la stringa non è palindroma\n");
    }
    
    
    close(socketfd);
    return 0;
}