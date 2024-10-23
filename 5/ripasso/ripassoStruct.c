#include <stdio.h>
#include <stdlib.h>
/*
Scrivere un programma in C che dopo aver dichiarato una struttura denominata Auto con i seguenti
campi: ModelloAuto, marca, cilindrata, prezzo, anno_immatricolazione, determinare:
1) Il prezzo + alto e quello + basso visualizzando anche il modello dell'auto;
2) Ordinare la lista delle auto in base all&#39;anno d&#39;immatricolazione;
3) Visualizzare il nome delle auto a partire da un prezzo scelto dall'utente.
*/
#define N 3
typedef struct Auto
{
    char modello[30];
    char marca[30];
    float cilindrata;
    double prezzo;
    int anno;
} Auto;
Auto PrezzoMaggiore(Auto macchine[])
{
    Auto support = macchine[0];
    for (int i = 1; i < N; i++)
    {
        if (support.prezzo < macchine[i].prezzo)
        {
            support = macchine[i];
        }
    }
    return support;
}
Auto PrezzoMinore(Auto macchine[])
{
    Auto support = macchine[0];
    for (int i = 1; i < N; i++)
    {
        if (support.prezzo > macchine[i].prezzo)
        {
            support = macchine[i];
        }
    }
    return support;
}
void OrdinamentoAnno(Auto array[])
{
    Auto support;
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N - i - 1; j++)
        {
            if (array[j].anno > array[j + 1].anno)
            {
                support = array[j];
                array[j] = array[j + 1];
                array[j + 1] = support;
            }
        }
    }
}

void Visualizza(Auto macchine[])
{
    for (int i = 0; i < N; i++)
    {
        printf("Marca: %s \n", macchine[i].marca);
        printf("Modello: %s \n", macchine[i].modello);
        printf("Cilindrata: %f L\n", macchine[i].cilindrata);
        printf("Prezzo: %2.f \n", macchine[i].prezzo);
        printf("Anno Immatricolazione: %d \n", macchine[i].anno);
    }
}
void VisualizzaPrezzo(Auto macchine[])
{
    double prezzo;
    printf("Prezzo dell'auto che vuoi comprare \n?");
    scanf("%f", &prezzo);
    for (int i = 0; i < N; i++)
    {
        if (macchine[i].prezzo >= prezzo)
        {
            printf("Marca: %s \n", macchine[i].marca);
            printf("Modello: %s \n", macchine[i].modello);
            printf("Cilindrata: %f L\n", macchine[i].cilindrata);
            printf("Prezzo: %2.f \n", macchine[i].prezzo);
            printf("Anno Immatricolazione: %d \n", macchine[i].anno);
        }
    }
}
int main()
{
    int n = 3;

    Auto macchine[3] = {{"Panda", "Fiat", 1.2, 15000, 2012}, {"Golf", "Volkswagen", 1.5, 25000, 2018}, {"Corolla", "Toyota", 1.8, 22000, 2019}};
    Visualizza(macchine);
    OrdinamentoAnno(macchine);
    printf("-------------\n");
    Visualizza(macchine);
    Auto aCostosa = PrezzoMaggiore(macchine);
    Auto aEconomica = PrezzoMinore(macchine);

    return 0;
}