package org.algoritmica.benchmark.algoritmos;

public class Permutations {

    /**
     * Genera todas las permutaciones de un array.
     * Complejidad: O(n!)
     */
    public static void generate(int[] array) {
        permute(array, 0);
    }

    private static void permute(int[] array, int index) {

        if (index == array.length) {
            return; // aquí “se genera” una permutación
        }

        for (int i = index; i < array.length; i++) {

            swap(array, index, i);
            permute(array, index + 1);
            swap(array, index, i); // backtracking
        }
    }

    private static void swap(int[] array, int i, int j) {

        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}