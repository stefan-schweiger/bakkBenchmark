

struct StatisticResult {
    double q1;
    double median;
    double q3;
    double avg;
    double stDev;
    double mode;
    int lowerOutliers;
    int upperOutliers;
};

struct StatisticResult calculate(double *list, int n);
