/*
 * Iterative Quicksort algorithm adapted from https://www.geeksforgeeks.org/iterative-quick-sort/
 */

#include "sort.h"

static int PartitionIterative(double arr[], int low, int high)
{
    double temp;
    double pivot = arr[high];
    
    // index of smaller element
    int i = (low-1); 
    for (int j = low; j <= high-1; j++)
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

void QuickSort(double arr[], int low, int high)
{
    // Create an auxiliary stack
    int stack[high-low+1];

    // initialize top of stack
    int top = -1;

    // push initial values of low and high to 
    // stack
    stack[++top] = low;
    stack[++top] = high;

    // Keep popping from stack while 
    // is not empty
    while (top >= 0)
    {
        // Pop high and low
        high = stack[top--];
        low = stack[top--];

        // Set pivot element at its 
        // correct position in 
        // sorted array
        int p = PartitionIterative(arr, low, high);

        // If there are elements on 
        // left side of pivot, then
        // push left side to stack
        if (p-1 > low)
        {
            stack[++top] = low;
            stack[++top] = p - 1;
        }

        // If there are elements on
        // right side of pivot, then 
        // push right side to stack
        if (p+1 < high)
        {
            stack[++top] = p + 1;
            stack[++top] = high;
        }
    }
}
