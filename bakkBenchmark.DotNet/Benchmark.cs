using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading;

namespace BakkBenchmark.DotNet
{
    public static class Benchmark
    {
        public static void StartAndPrint(int n = 500_000, int length = 100, bool isCsv = true) {
            Console.WriteLine($"Starting Benchmark with n={n} and length={length}");

            var result = new BenchmarkResult();

            var stopWatch = new Stopwatch();

            stopWatch.Start();
            var seq = DNAGenerator.Generate(n, length);
            stopWatch.Stop();
            result.Generate = stopWatch.Elapsed.TotalMilliseconds;

            stopWatch.Restart();
            var listPolar = Sequencer.sequenceMatchPolarity(seq);
            var listAcid = Sequencer.sequenceMatchAcidity(seq);
            stopWatch.Stop();
            result.Sequence = stopWatch.Elapsed.TotalMilliseconds;

            stopWatch.Restart();
            Sort.MergeSort(listPolar);
            Sort.MergeSort(listAcid);
            stopWatch.Stop();

            result.Sort = stopWatch.Elapsed.TotalMilliseconds;

            stopWatch.Restart();
            var resPolar = Calc.Calculate(listPolar);
            var resAcid = Calc.Calculate(listAcid);
            stopWatch.Stop();

            result.Calculate = stopWatch.Elapsed.TotalMilliseconds;

            if (!isCsv) {
                Console.WriteLine($"Generate:  {result.Generate:N2}ms");
                Console.WriteLine($"Sequence:  {result.Sequence:N2}ms");
                Console.WriteLine($"Sort:      {result.Sort:N2}ms");
                Console.WriteLine($"Calculate: {result.Calculate:N2}ms");
            } else {
                Console.WriteLine($"{result.Generate:F2},{result.Sequence:F2},{result.Sort:F2},{result.Calculate:F2}");
            }

            Console.WriteLine("----------------------------------------------");
            Console.WriteLine("Polarity");
            PrintResult(resPolar);

            Console.WriteLine("----------------------------------------------");
            Console.WriteLine("Acidity");
            PrintResult(resAcid);
        }

        public static void PrintResult(StatResult result) {
            Console.WriteLine($"Q1      {result.Q1:N3}");
            Console.WriteLine($"Median  {result.Median:N3}");
            Console.WriteLine($"Q3      {result.Q3:N3}");
            Console.WriteLine($"Mode    {result.Mode:N3}");
            Console.WriteLine($"L. Out. {result.LowerOutliers:N0}");
            Console.WriteLine($"U. Out. {result.UpperOutliers:N0}");
            Console.WriteLine($"Avg.    {result.Avg:N3}");
            Console.WriteLine($"StDev   {result.StDev:N3}");
        }
    }

    public struct BenchmarkResult {
        public double Generate { get; set; }
        public double Sequence { get; set; }
        public double Sort { get; set; }
        public double Calculate { get; set; }
    }
}
