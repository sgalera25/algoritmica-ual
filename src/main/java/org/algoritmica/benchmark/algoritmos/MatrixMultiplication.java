package org.algoritmica.benchmark.algoritmos;

public class MatrixMultiplication {

    public static int[][] multiply(int[][] A, int[][] B) {

        int n = A.length;
        int[][] C = new int[n][n];

        for (int i = 0; i < n; i++) {

            for (int j = 0; j < n; j++) {

                int sum = 0;

                for (int k = 0; k < n; k++) {
                    sum += A[i][k] * B[k][j];
                }

                C[i][j] = sum;
            }
        }

        return C;
    }
}