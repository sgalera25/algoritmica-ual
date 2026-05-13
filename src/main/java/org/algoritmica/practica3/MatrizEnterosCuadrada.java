package org.algoritmica.practica3;

import java.util.Random;

public class MatrizEnterosCuadrada {

    private final int[][] matriz;

    public MatrizEnterosCuadrada(int numeroFilasCol) {

        this.matriz = new int[numeroFilasCol][numeroFilasCol];

        Random random = new Random();

        for (int i = 0; i < numeroFilasCol; i++) {
            for (int j = 0; j < numeroFilasCol; j++) {
                matriz[i][j] = random.nextInt(100);
            }
        }
    }

    public MatrizEnterosCuadrada(int[][] m) {

        int n = m.length;

        this.matriz = new int[n][];

        for (int i = 0; i < n; i++) {
            this.matriz[i] = m[i].clone();
        }
    }

    public int[][] getMatriz() {
        return matriz;
    }

    public static void ordenaSeleccion(int[] array) {

        int n = array.length;

        for (int i = 0; i < n - 1; i++) {

            int idxMin = i;

            for (int j = i + 1; j < n; j++) {
                if (array[j] < array[idxMin]) {
                    idxMin = j;
                }
            }

            if (idxMin != i) {
                int tmp = array[i];
                array[i] = array[idxMin];
                array[idxMin] = tmp;
            }
        }
    }

    public MatrizEnterosCuadrada matrizOrdenadaPorFilas() {

        MatrizEnterosCuadrada salida = new MatrizEnterosCuadrada(this.matriz);

        for (int i = 0; i < salida.matriz.length; i++) {
            ordenaSeleccion(salida.matriz[i]);
        }

        return salida;
    }

    @Override
    public String toString() {

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < matriz.length; i++) {
            sb.append('[');
            for (int j = 0; j < matriz[i].length; j++) {
                sb.append(matriz[i][j]);
                if (j < matriz[i].length - 1) sb.append(", ");
            }
            sb.append("]\n");
        }

        return sb.toString();
    }
}
