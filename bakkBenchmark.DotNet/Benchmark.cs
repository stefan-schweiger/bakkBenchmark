using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading;

namespace BakkBenchmark.DotNet
{
    public static class Benchmark
    {
        public static void StartAndPrint(int n = 100000, int length = 1000, bool isCsv = false) {
            var result = Start(n, length);

            Console.WriteLine(isCsv);

            if (!isCsv) {
                Console.WriteLine($"Generate:  {result.Generate:N2}ms");
                Console.WriteLine($"Sequence:  {result.Sequence:N2}ms");
                Console.WriteLine($"Sort:      {result.Sort:N2}ms");
                Console.WriteLine($"Calculate: {result.Calculate:N2}ms");

                Console.WriteLine("----------------------------------------------");

                Console.WriteLine($"Q1     {result.CalculationResult.Q1:N3}");
                Console.WriteLine($"Median {result.CalculationResult.Median:N3}");
                Console.WriteLine($"Q3     {result.CalculationResult.Q3:N3}");
                Console.WriteLine($"Avg.   {result.CalculationResult.Avg:N3}");
                Console.WriteLine($"StDev  {result.CalculationResult.StDev:N3}");
            } else {
                Console.WriteLine($"{result.Generate:F2},{result.Sequence:F2},{result.Sort:F2},{result.Calculate:F2}");
            }
        }

        public static BenchmarkResult Start(int n, int length)
        {
            Console.WriteLine($"Starting Benchmark with n={n} and length={length}");

            var result = new BenchmarkResult();

            var stopWatch = new Stopwatch();

            stopWatch.Start();
            var seq = DNAGenerator.Generate(n, length);
            stopWatch.Stop();
            result.Generate = stopWatch.Elapsed.TotalMilliseconds;

            Console.WriteLine("Generate finished");

            // deactivate with DNAGenerator
            stopWatch.Restart();
            var list = Sequencer.SequenceMatch(seq);
            stopWatch.Stop();
            result.Sequence = stopWatch.Elapsed.TotalMilliseconds;

            Console.WriteLine($"Sequence finished");

            stopWatch.Restart();
            Sort.QuickSort(list);
            stopWatch.Stop();

            result.Sort = stopWatch.Elapsed.TotalMilliseconds;

            Console.WriteLine("Sort finished");

            stopWatch.Restart();
            var res = Calc.Calculate(list);
            stopWatch.Stop();

            result.Calculate = stopWatch.Elapsed.TotalMilliseconds;
            result.CalculationResult = res;

            Console.WriteLine("Calc finished");

            return result;
        }
    }

    public struct BenchmarkResult {
        public double Generate { get; set; }
        public double Sequence { get; set; }
        public double Sort { get; set; }
        public double Calculate { get; set; }
        public StatResult CalculationResult { get; set; }
    }
}
