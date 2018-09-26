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

            list[i] = acid == 0 ? 0 : acid / (basic + acid); // ratio of acidic to basic
        }

        return list;
    }
}