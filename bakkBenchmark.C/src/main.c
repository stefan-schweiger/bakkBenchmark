#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>

#include "dna.h"
#include "sequence.h"
#include "sort.h"

#define CSV_OUT 0

int main()
{
    const int N = 100000;
    const int LENGTH = 1000;

    char **seq;
    double *list;

    double results[4];

    // GENERATE
    clock_t t = clock();
    seq = generate(N, LENGTH);
    t = clock() - t;

    results[0] = (double)t / CLOCKS_PER_SEC * 1000;

    // SEQUENCE
    t = clock();
    list = sequenceMatch(seq, N, LENGTH);
    t = clock() - t;

    results[1] = (double)t / CLOCKS_PER_SEC * 1000;

    // SORT
    t = clock();
    QuickSort(list, 0, N - 1);
    t = clock() - t;

    results[2] = (double)t / CLOCKS_PER_SEC * 1000;

    // CALCULATE
    t = clock();
    double sum = 0.0;
    double avg = 0.0;

    for (int i = 0; i < N; i++) {
        sum += list[i];
    }

    avg = sum / N;

    double stDevSum = 0.0;

    for (int i = 0; i < N; i++) {
        stDevSum += (list[i] - avg) * (list[i] - avg);
    }

    double stDev = sqrt(stDevSum / N);
    t = clock() - t;

    results[3] = (double)t / CLOCKS_PER_SEC * 1000;

    // PRINT RESULTS
    if (CSV_OUT == 0) {
        printf("Generate:  %.2fms\n", results[0]);
        printf("Sequence:  %.2fms\n", results[1]);
        printf("Sort:      %.2fms\n", results[2]);
        printf("Calculate: %.2fms\n", results[3]);

        printf("----------------------------------------------\n");

        printf("Q1     %.3f\n", list[N/4]);
        printf("Median %.3f\n", list[N/2]);
        printf("Q3     %.3f\n", list[(N/4)*3]);
        printf("Avg.   %.3f\n", avg);
        printf("StDev. %.3f\n", stDev);
    } else {
        printf("%.2f,%.2f,%.2f,%.2f\n", results[0], results[1], results[2], results[3]);
    }

    return 0;
}
