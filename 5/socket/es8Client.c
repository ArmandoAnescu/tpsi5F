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
void LeggiNum(int array[], int len)
{
    for (int i = 0; i < len; i++)
    {
        printf("inserisci il %d numero \n", i + 1);
        scanf("%d", &array[i]);
    }
}
int main(int argc, char **argv)
{
    struct sockaddr_in servizio;
    int socketfd, cond;
    int len;
    char strRisultato[DIM];
    servizio.sin_family = AF_INET;
    servizio.sin_addr.s_addr = htonl(INADDR_ANY);
    servizio.sin_port = htons(SERVERPORT);
    socketfd = socket(AF_INET, SOCK_STREAM, 0);
    connect(socketfd, (struct sockaddr *)&servizio, sizeof(servizio));
    printf("Quanti numeri vuoi inserire?\n");
    scanf("%d", &len);
    int array[len];
    LeggiNum(array,len);
    write(socketfd, &len, sizeof(len));
    write(socketfd, array, sizeof(array));
    read(socketfd, strRisultato, sizeof(strRisultato));
    printf("%s\n", strRisultato);
    close(socketfd);
    return 0;
}