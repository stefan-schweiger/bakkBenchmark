#include "calc.h"

#include <math.h>

double calcMode(double *list, int n)
{
    double number = list[0];
    double mode = number;
    int count = 1;
    int countMode = 1;

    for (int i = 1; i < n; i++)
    {
        if (list[i] == number)
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
            number = list[i];
        }
    }

    return mode;
}

struct StatisticResult calculate(double *list, int n)
{
    double q1 = list[n / 4];
    double median = list[n / 2];
    double q3 = list[(n / 4) * 3];

    double sum = 0.0;
    for (int i = 0; i < n; i++)
    {
        sum += list[i];
    }

    double avg = sum / n;

    double stDevSum = 0.0;
    for (int i = 0; i < n; i++)
    {
        stDevSum += (list[i] - avg) * (list[i] - avg);
    }

    double stDev = sqrt(stDevSum / n);

    double upperOutliers = 0;
    double lowerOutliers = 0;

    for (int i = 0; i < n; i++)
    {
        if (list[i] > median + stDev * 2)
        {
            upperOutliers++;
        }
        else if (list[i] < median - stDev * 2)
        {
            lowerOutliers++;
        }
    }

    double mode = calcMode(list, n);

    struct StatisticResult res;
    res.q1 = q1;
    res.median = median;
    res.q3 = q3;
    res.upperOutliers = upperOutliers;
    res.lowerOutliers = lowerOutliers;
    res.avg = avg;
    res.stDev = stDev;
    res.mode = mode;

    return res;
}
