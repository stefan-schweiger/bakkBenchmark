#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "dna.h"
#include "sequence.h"
#include "sort.h"
#include "calc.h"

#define CSV_OUT 1

#define N 1000000
#define LENGTH 100

void printRes(struct StatisticResult res) {
    printf("Q1      %.3f\n", res.q1);
    printf("Median  %.3f\n", res.median);
    printf("Q3      %.3f\n", res.q3);
    printf("Mode    %.3f\n", res.mode);
    printf("L. Out. %d\n", res.lowerOutliers);
    printf("U. Out.  %d\n", res.upperOutliers);
    printf("Avg.    %.3f\n", res.avg);
    printf("StDev.  %.3f\n", res.stDev);
}

int main()
{
    char **seq;
    double *listPolar;
    double *listAcid;

    double results[4];

    // GENERATE
    clock_t t = clock();
    seq = generate(N, LENGTH);
    t = clock() - t;

    results[0] = (double)t / CLOCKS_PER_SEC * 1000;

    // SEQUENCE
    t = clock();
    listPolar = sequenceMatchPolarity(seq, N, LENGTH);
    listAcid = sequenceMatchAcidity(seq, N, LENGTH);
    t = clock() - t;

    results[1] = (double)t / CLOCKS_PER_SEC * 1000;

    // SORT
    t = clock();
    mergeSort(listPolar, 0, N - 1);
    mergeSort(listAcid, 0, N - 1);
    t = clock() - t;

    results[2] = (double)t / CLOCKS_PER_SEC * 1000;

    // CALCULATE
    t = clock();
    struct StatisticResult resPolar = calculate(listPolar, N);
    struct StatisticResult resAcid = calculate(listAcid, N);
    t = clock() - t;

    results[3] = (double)t / CLOCKS_PER_SEC * 1000;

    // PRINT RESULTS
    if (CSV_OUT == 0) {
        printf("Generate:  %.2fms\n", results[0]);
        printf("Sequence:  %.2fms\n", results[1]);
        printf("Sort:      %.2fms\n", results[2]);
        printf("Calculate: %.2fms\n", results[3]);
    } else {
        printf("%.2f,%.2f,%.2f,%.2f\n", results[0], results[1], results[2], results[3]);
    }

    printf("----------------------------------------------\n");
    printf("Polarity\n");
    printRes(resPolar);

    printf("----------------------------------------------\n");
    printf("Acidity\n");
    printRes(resAcid);

    return 0;
}
