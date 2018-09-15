using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace BakkBenchmark.DotNet
{
    public static class Sequencer
    {
        public static double[] sequenceMatchPolarity(string[] seq)
        {
            int n = seq.Length;
            int length = seq[0].Length;
            var list = new double[n];

            for (int i = 0; i < n; i++)
            {
                string gen = seq[i];
                int nonpolar = 0;
                int polar = 0;

                for (int j = 0; j < length - 3; j += 3)
                {
                    char c1 = gen[j];
                    char c2 = gen[j + 1];
                    char c3 = gen[j + 2];

                    // Stop codon
                    if ((c1 == 'U' && c2 == 'A' && c3 == 'A') ||
                        (c1 == 'U' && c2 == 'A' && c3 == 'G') ||
                        (c1 == 'U' && c2 == 'G' && c3 == 'A')
                    ) {
                        break;
                    }

                    if (c2 == 'U') {
                        nonpolar++;
                    } else if (c2 == 'C') {
                        if (c1 == 'C' || c1 == 'G') {
                            nonpolar++;
                        } else {
                            polar++;
                        }
                    } else if (c2 == 'G') {
                        if (c1 == 'G') {
                            polar++;
                        } else if (c1 == 'U' && c3 == 'G') {
                            nonpolar++;
                        }
                    }
                }

                list[i] = polar == 0 ? 0 : polar / (double)(nonpolar + polar); // ratio of polar to nonpolar
            }

            return list;
        }

        public static double[] sequenceMatchAcidity(string[] seq)
        {
            int n = seq.Length;
            int length = seq[0].Length;
            var list = new double[n];

            for (int i = 0; i < n; i++)
            {
                string gen = seq[i];
                int basic = 0;
                int acid = 0;

                for (int j = 0; j < length - 3; j += 3)
                {
                    char c1 = gen[j];
                    char c2 = gen[j + 1];
                    char c3 = gen[j + 2];

                    // Stop codon
                    if ((c1 == 'U' && c2 == 'A' && c3 == 'A') ||
                        (c1 == 'U' && c2 == 'A' && c3 == 'G') ||
                        (c1 == 'U' && c2 == 'G' && c3 == 'A')
                    ) {
                        break;
                    }

                    if (c1 == 'G' && c2 == 'A') {
                        basic++;
                    } else if (c2 == 'G') {
                        if (c1 == 'C') {
                            acid++;
                        } else if (c1 == 'A' && (c3 == 'A' || c3 == 'G')) {
                            acid++;
                        }
                    } else if (c2 == 'A') {
                        if (c1 == 'C' && (c3 == 'U' || c3 == 'C')) {
                            acid++;
                        } else if (c1 == 'A' && (c3 == 'A' || c3 == 'G')) {
                            acid++;
                        }
                    }
                }

                list[i] = acid == 0 ? 0 : acid / (double)(basic + acid); // ratio of basic to acidic
            }

            return list;
        }
    }
}