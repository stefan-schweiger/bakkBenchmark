#include "dna.h"

#include <stdlib.h>
#include <stdio.h>

#define IM 139968
#define IA 3877
#define IC 29573

int seed = 42;

static int Random()
{
    seed = (seed * IA + IC) % IM;
    return seed;
}

static char GetRandomCode()
{
    int r = Random();

    if (r < 0.3 * IM) {
        return 'A';
    } else if (r < 0.5 * IM) {
        return 'C';
    } else if (r < 0.7 * IM) {
        return 'G';
    } else {
        return 'T';
    }
}

char **generate(int n, int length)
{
    char **res = (char **) malloc(sizeof (char *) * n);

    for (int i = 0; i < n; i++)
    {
        res[i] = (char *) malloc(sizeof (char) * (length + 1));

        for (int j = 0; j < length; j++)
        {
            res[i][j] = GetRandomCode();
        }
    }

    return res;
}
