#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <errno.h>

int main(int argc, char *argv[]) {
    typedef struct {
        double longitudine; // Modifica il tipo da int a double
        double latitudine;  // Modifica il tipo da int a double
        char citta[30];
    } GPS;

    if (argc != 2) {
        printf("Hai inserito 0 parametri o più parametri del dovuto \n");
        exit(1);
    }

    GPS datiInseriti;

    printf("Inserisci la longitudine: \n");
    scanf("%lf", &datiInseriti.longitudine); // Modifica la formattazione a %lf
    printf("Inserisci la latitudine: \n");
    scanf("%lf", &datiInseriti.latitudine); // Modifica la formattazione a %lf
    printf("Inserisci il nome della città: \n");
    scanf("%s", datiInseriti.citta);

    int p = fork();

    if (p != 0) { // padre
        FILE *destinazione;
        destinazione = fopen(argv[1], "w");
        printf("Sono il processo padre con PID %d, mio figlio ha PID %d \n", getpid(), p);
        fwrite(&datiInseriti, sizeof(datiInseriti), 1, destinazione);
        fclose(destinazione);
        printf("Longitudine: %.2lf, latitudine: %.2lf, nome città: %s \n", datiInseriti.longitudine, datiInseriti.latitudine, datiInseriti.citta);
        wait(0);
    } else { // figlio
        FILE *destinazione;
        GPS verifica;
        destinazione = fopen(argv[1], "r");
        printf("Sono il processo figlio con PID %d, mio padre ha PID %d \n", getpid(), getppid());
        fread(&verifica, sizeof(verifica), 1, destinazione);
        fclose(destinazione);
        printf("Longitudine: %.2lf, latitudine: %.2lf, nome città: %s \n", verifica.longitudine, verifica.latitudine, verifica.citta);
    }

    return 0;
}