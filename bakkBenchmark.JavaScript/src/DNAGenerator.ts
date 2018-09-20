class DNAGenerator
{
    private static readonly IM = 139968;
    private static readonly IA = 3877;
    private static readonly IC = 29573;
    private static seed = 42;

    public static generate(n: number, length: number): string[]
    {
        var res = new Array<string>();

        for (let i = 0; i < n; i++)
        {
            var arr = new Array<string>(length);

            for (let j = 0; j < length; j++)
            {
                arr.push(DNAGenerator.getRandomCode());
            }

            res[i] = arr.join('');
        }

        return res;
    }

    private static getRandomCode(): string
    {
        var r = DNAGenerator.random();

        if (r < 0.3 * DNAGenerator.IM) {
            return 'A';
        } else if (r < 0.5 * DNAGenerator.IM) {
            return 'C';
        } else if (r < 0.7 * DNAGenerator.IM) {
            return 'G';
        } else {
            return 'T';
        }
    }

    private static random(): number
    {
        DNAGenerator.seed = (DNAGenerator.seed * DNAGenerator.IA + DNAGenerator.IC) % DNAGenerator.IM;
        return DNAGenerator.seed;
    }
}
