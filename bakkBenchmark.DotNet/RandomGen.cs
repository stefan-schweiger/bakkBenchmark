using System;

namespace BakkBenchmark.DotNet
{
    public class RandomGen {
        private const int IM = 139968;
        private const double dIM = 139968.0;
        private const int IA = 3877;
        private const int IC = 29573;
        private int seed = 42;

        public RandomGen() {

        }

        public RandomGen(int seed) {
            this.seed = seed;
        }

        public int GetNext()
        {
            seed = (seed * IA + IC) % IM;
            return seed;
        }

        public double GetNextDouble() {
            seed = (seed * IA + IC) % IM;
            return seed / dIM;
        }
    }
}