class Sequencer {
    public static sequenceMatch(seq: string[]): number[] {
        var n = seq.length;
        var list = new Array<number>(n);

        for (let i = 0; i < n; i++)
        {
            var gen = seq[i];
            var leu = 0;
            var ser = 0;

            for (let j = 0; j < gen.length - 3; j += 3)
            {
                var c1 = gen[j];
                var c2 = gen[j + 1];
                var c3 = gen[j + 2];

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

            list[i] = ser == 0 ? 0 : leu / ser; // ratio of leu to ser
        }

        return list;
    }
}