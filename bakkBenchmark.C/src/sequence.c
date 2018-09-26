#include "sequence.h"

#include <stdlib.h>
#include <stdio.h>

double *sequenceMatchPolarity(char **seq, int n, int length)
{
    double *list = malloc(sizeof(double) * n);

    for (int i = 0; i < n; i++)
    {
        char *gen = seq[i];
        int nonpolar = 0;
        int polar = 0;

        for (int j = 0; j < length - 3; j += 3)
        {
            char c1 = gen[j];
            char c2 = gen[j + 1];
            char c3 = gen[j + 2];

            // NOTE: Transcription is hardcoded in the following if-statements
            // A -> U, C -> G, G -> C, T -> A
            // Stop codon
            /*
            if ((c1 == 'A' && c2 == 'T' && c3 == 'T') ||
                (c1 == 'A' && c2 == 'T' && c3 == 'C') ||
                (c1 == 'A' && c2 == 'C' && c3 == 'T'))
            {
                break;
            }
            */

            if (c2 == 'A')
            {
                nonpolar++;
            }
            else if (c2 == 'G')
            {
                if (c1 == 'G' || c1 == 'C')
                    nonpolar++;
                else
                    polar++;
            }
            else if (c2 == 'C')
            {
                if (c1 == 'C')
                    polar++;
                else if (c1 == 'A' && c3 == 'C')
                    nonpolar++;
            }
        }

        list[i] = polar == 0 ? 0 : polar / (double)(nonpolar + polar); // ratio of polar to nonpolar
    }

    return list;
}

double *sequenceMatchAcidity(char **seq, int n, int length)
{
    double *list = malloc(sizeof(double) * n);

    for (int i = 0; i < n; i++)
    {
        char *gen = seq[i];
        int basic = 0;
        int acid = 0;

        for (int j = 0; j < length - 3; j += 3)
        {
            char c1 = gen[j];
            char c2 = gen[j + 1];
            char c3 = gen[j + 2];

            // NOTE: Transcription is hardcoded in the following if-statements
            // A -> U, C -> G, G -> C, T -> A
            // Stop codon
            /*
            if ((c1 == 'A' && c2 == 'T' && c3 == 'T') ||
                (c1 == 'A' && c2 == 'T' && c3 == 'C') ||
                (c1 == 'A' && c2 == 'C' && c3 == 'T'))
            {
                break;
            }
            */

            if (c1 == 'C' && c2 == 'T')
            {
                basic++;
            }
            else if (c2 == 'C') {
                if (c1 == 'G')
                    acid++;
                else if (c1 == 'T' && (c3 == 'T' || c3 == 'C'))
                    acid++;
            }
            else if (c2 == 'T')
            {
                if (c1 == 'G' && (c3 == 'A' || c3 == 'G'))
                    acid++;
                else if (c1 == 'T' && (c3 == 'T' || c3 == 'C'))
                    acid++;
            }
        }

        list[i] = acid == 0 ? 0 : acid / (double)(basic + acid); // ratio of basic to acidic
    }

    return list;
}
