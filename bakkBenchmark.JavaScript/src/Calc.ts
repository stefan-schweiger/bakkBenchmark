class Calc {
    public static calculate(list: number[]): any {
        let sum = 0.0;

        for (let i = 0; i < list.length; i++) {
            sum += list[i];
        }

        const avg = sum / list.length;

        let stDevSum = 0.0;

        for (let i = 0; i < list.length; i++) {
            stDevSum += (list[i] - avg) * (list[i] - avg);
        }

        const stDev = Math.sqrt(stDevSum / list.length);

        let q1 = list[list.length / 4];
        let median = list[list.length / 2];
        let q3 = list[list.length / 4 * 3];

        let upperOutliers = 0;
        let lowerOutliers = 0;

        for (let i = 0; i < list.length; i++)
        {
            if (list[i] > median + stDev * 2)
            {
                upperOutliers++;
            }
            else if (list[i] < median - stDev * 2)
            {
                lowerOutliers++;
            }
        }

        const mode = this.calcMode(list);

        return {
            q1,
            median,
            q3,
            upperOutliers,
            lowerOutliers,
            avg,
            stDev,
            mode
        };
    }

    private static calcMode(a: number[]): number {
        var number = a[0];
        var mode = number;
        var count = 1;
        var countMode = 1;

        for (var i = 1; i < a.length; i++) {
            if (a[i] == number) {
                count++;
            }
            else {
                if (count > countMode) {
                    countMode = count;
                    mode = number;
                }
                count = 1;
                number = a[i];
            }
        }

        return mode;
    }
}
