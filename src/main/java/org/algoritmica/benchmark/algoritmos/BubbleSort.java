package org.algoritmica.benchmark.algoritmos;

public class BubbleSort {

    public static void bubbleSort(int[] array) {

        int n = array.length;

        boolean swapped;

        for (int i = 0; i < n - 1; i++) {

            swapped = false;

            for (int j = 0; j < n - i - 1; j++) {

                if (array[j] > array[j + 1]) {

                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    swapped = true;
                }
            }

            // Optimización:
            // si no hubo intercambios, el array ya está ordenado
            if (!swapped) {
                break;
            }
        }
    }
}