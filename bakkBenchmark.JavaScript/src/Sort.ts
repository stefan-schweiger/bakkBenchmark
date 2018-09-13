class Sort {
    static quickSort(list: number[]) {
        this.quickSortInternal(list, 0, list.length - 1);
    }

    static partition(arr: number[], low: number, high:number)
    {
        let temp;
        let pivot = arr[high];
        
        // index of smaller element
        let i = (low-1); 
        for (let j = low; j <= high-1; j++)
        {
            // If current element is smaller
            // than or equal to pivot
            if (arr[j] <= pivot)
            {
                i++;

                // swap arr[i] and arr[j]
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // swap arr[i+1] and arr[high] 
        // (or pivot)

        temp = arr[i+1];
        arr[i+1] = arr[high];
        arr[high] = temp;

        return i+1;
    }

    static quickSortInternal(arr: number[], l: number, h:number)
    {
        // Create an auxiliary stack
        let stack = new Array<number>(h-l+1);

        // initialize top of stack
        let top = -1;

        // push initial values of l and h to 
        // stack
        stack[++top] = l;
        stack[++top] = h;

        // Keep popping from stack while 
        // is not empty
        while (top >= 0)
        {
            // Pop h and l
            h = stack[top--];
            l = stack[top--];

            // Set pivot element at its 
            // correct position in 
            // sorted array
            let p = Sort.partition(arr, l, h);

            // If there are elements on 
            // left side of pivot, then
            // push left side to stack
            if (p-1 > l)
            {
                stack[++top] = l;
                stack[++top] = p - 1;
            }

            // If there are elements on
            // right side of pivot, then 
            // push right side to stack
            if (p+1 < h)
            {
                stack[++top] = p + 1;
                stack[++top] = h;
            }
        }
    }
}
