#include "sequence.h"

#include <stdlib.h>
#include <stdio.h>

double *sequenceMatch(char **seq, int n, int length)
{
    double *list = malloc(sizeof(double) * n);

    for (int i = 0; i < n; i++)
    {
        char *gen = seq[i];
        int leu = 0;
        int ser = 0;

        for (int j = 0; j < length - 3; j += 3)
        {
            char c1 = gen[j];
            char c2 = gen[j + 1];
            char c3 = gen[j + 2];

            if (c1 == 'T')
            {
                if (c2 == 'T' && (c3 == 'A' || c3 == 'G'))
                {
                    leu++;
                }
                else if (c2 == 'C')
                {
                    ser++;
                }
            }
            else if (c1 == 'C')
            {
                if (c2 == 'T')
                {
                    leu++;
                }
            }
            else if (c1 == 'A')
            {
                if (c2 == 'G' && (c3 == 'T' || c3 == 'C'))
                {
                    ser++;
                }
            }
        }

        list[i] = ser == 0 ? 0 : leu / (double)ser; // ratio of leu to ser;
    }

    return list;
}
