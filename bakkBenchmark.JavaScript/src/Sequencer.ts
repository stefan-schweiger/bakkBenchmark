class Sequencer {
    public static sequenceMatchPolarity(seq: string[]): number[]
    {
        var n = seq.length;
        var length = seq[0].length;
        var list = new Array<number>(n);

        for (var i = 0; i < n; i++)
        {
            var gen = seq[i];
            var nonpolar = 0;
            var polar = 0;

            for (var j = 0; j < length - 3; j += 3)
            {
                var c1 = gen[j];
                var c2 = gen[j + 1];
                var c3 = gen[j + 2];

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

            list[i] = polar == 0 ? 0 : polar / (nonpolar + polar); // ratio of polar to nonpolar
        }

        return list;
    }

    public static sequenceMatchAcidity(seq: string[]): number[]
    {
        var n = seq.length;
        var length = seq[0].length;
        var list = new Array<number>(n);

        for (var i = 0; i < n; i++)
        {
            var gen = seq[i];
            var basic = 0;
            var acid = 0;

            for (var j = 0; j < length - 3; j += 3)
            {
                var c1 = gen[j];
                var c2 = gen[j + 1];
                var c3 = gen[j + 2];

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

            list[i] = acid == 0 ? 0 : acid / (basic + acid); // ratio of basic to acidic
        }

        return list;
    }
}