#include "calc.h"

#include <math.h>

double calcMode(double a[], int n) {
    double number = a[0];
    double mode = number;
    int count = 1;
    int countMode = 1;

    for (int i = 1; i < n; i++)
    {
        if (a[i] == number) 
        {
            count++;
        }
        else
        {
            if (count > countMode) 
            {
                countMode = count;
                mode = number;
            }
            count = 1;
            number = a[i];
        }
    }

    return mode;
}

struct StatisticResult calculate(double *list, int n) {
    struct StatisticResult res;
    res.lowerOutliers = 0;
    res.upperOutliers = 0;

    double sum = 0.0;

    for (int i = 0; i < n; i++) {
        sum += list[i];
    }

    res.avg = sum / n;

    double stDevSum = 0.0;

    for (int i = 0; i < n; i++) {
        stDevSum += (list[i] - res.avg) * (list[i] - res.avg);
    }

    res.stDev = sqrt(stDevSum / n);

    res.q1 = list[n/4];
    res.median = list[n/2];
    res.q3 = list[(n/4)*3];

    for (int i = 0; i < n; i++) {
        if (list[i] > res.median + res.stDev * 2) {
            res.upperOutliers++;
        } else if (list[i] < res.median - res.stDev * 2) {
            res.lowerOutliers++;
        }
    }

    res.mode = calcMode(list, n);

    return res;
}
