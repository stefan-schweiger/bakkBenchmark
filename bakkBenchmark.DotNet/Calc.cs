using System;
using System.Linq;
using System.Collections.Generic;

namespace BakkBenchmark.DotNet
{
    public static class Calc
    {
        public static StatResult Calculate(double[] list)
        {
            var q1 = list[list.Length / 4];
            var median = list[list.Length / 2];
            var q3 = list[list.Length / 4 * 3];

            var sum = 0.0;
            for (int i = 0; i < list.Length; i++)
            {
                sum += list[i];
            }

            var avg = sum / list.Length;

            var stDevSum = 0.0;
            for (int i = 0; i < list.Length; i++)
            {
                stDevSum += (list[i] - avg) * (list[i] - avg);
            }

            var stDev = Math.Sqrt(stDevSum / list.Length);

            var upperOutliers = 0;
            var lowerOutliers = 0;

            for (int i = 0; i < list.Length; i++)
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

            var mode = CalcMode(list);

            return new StatResult()
            {
                Q1 = q1,
                Median = median,
                Q3 = q3,
                UpperOutliers = upperOutliers,
                LowerOutliers = lowerOutliers,
                Avg = avg,
                StDev = stDev,
                Mode = mode
            };
        }

        private static double CalcMode(double[] a)
        {
            double number = a[0];
            double mode = number;
            int count = 1;
            int countMode = 1;

            for (int i = 1; i < a.Length; i++)
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
    }

    public struct StatResult
    {
        public double Q1 { get; set; }
        public double Median { get; set; }
        public double Q3 { get; set; }
        public double UpperOutliers { get; set; }
        public double LowerOutliers { get; set; }
        public double Avg { get; set; }
        public double StDev { get; set; }
        public double Mode { get; set; }
    }
}