/*
 * MergeSort algorithm adapted from https://www.geeksforgeeks.org/iterative-merge-sort/
 */

class Sort {
    static merge(arr: number[], l: number, m: number, r: number)
    {
        let i = 0;
        let j = 0;
        let k = 0;
        let n1 = m - l + 1;
        let n2 = r - m;

        /* create temp arrays */
        var L = new Array<number>(n1);
        var R = new Array<number>(n2);

        /* Copy data to temp arrays L[] and R[] */
        for (i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];

        /* Merge the temp arrays back into arr[l..r]*/
        i = 0;
        j = 0;
        k = l;
        while (i < n1 && j < n2)
        {
            if (L[i] <= R[j])
            {
                arr[k] = L[i];
                i++;
            }
            else
            {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        /* Copy the remaining elements of L[], if there are any */
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        /* Copy the remaining elements of R[], if there are any */
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    /* l is for left index and r is right index of the sub-array
    of arr to be sorted */
    private static mergeSortInternal(arr: number[], l: number, r: number)
    {
        if (l < r)
        {
            let m = Math.floor(l + (r - l) / 2); //Same as (l+r)/2 but avoids overflow for large l & h
            Sort.mergeSortInternal(arr, l, m);
            Sort.mergeSortInternal(arr, m + 1, r);
            Sort.merge(arr, l, m, r);
        }
    }

    private static mergeSort(arr: number[])
    {
        Sort.mergeSortInternal(arr, 0, arr.length - 1);
    }
}
