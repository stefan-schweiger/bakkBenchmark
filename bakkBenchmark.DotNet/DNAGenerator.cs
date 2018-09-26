using System;
using System.Collections.Generic;
using System.Text;

namespace BakkBenchmark.DotNet
{
    public static class DNAGenerator
    {
        private const int IM = 139968;
        private const int IA = 3877;
        private const int IC = 29573;
        private static int seed = 42;

        public static string[] Generate(int n, int length)
        {
            var res = new string[n];

            for (int i = 0; i < n; i++)
            {
                var str = new char[length];

                for (int j = 0; j < length; j++)
                {
                    str[j] = GetRandomCode();
                }

                res[i] = new string(str);
            }

            return res;
        }

        private static char GetRandomCode()
        {
            var r = Random();

            if (r < 0.25 * IM)
                return 'A';
            else if (r < 0.5 * IM)
                return 'C';
            else if (r < 0.75 * IM)
                return 'G';
            else
                return 'T';
        }

        private static int Random()
        {
            seed = (seed * IA + IC) % IM;
            return seed;
        }
    }
}