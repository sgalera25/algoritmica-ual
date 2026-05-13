package org.algoritmica.practica3;

public class TiemposMatrizEnterosCuadradaApp {

    private static final int[] TAMANOS = {32, 64, 128, 256, 512, 1024, 2048, 4096, 8192};
    private static final int REPETICIONES = 10;

    public static void main(String[] args) {

        System.out.println("n,tiempoMedio_ns");

        for (int n : TAMANOS) {

            MatrizEnterosCuadrada original = new MatrizEnterosCuadrada(n);

            long[] tiempos = new long[REPETICIONES];

            for (int i = 0; i < REPETICIONES; i++) {

                long inicio = System.nanoTime();
                original.matrizOrdenadaPorFilas();
                long fin = System.nanoTime();

                tiempos[i] = fin - inicio;
            }

            long media = mediaDescartandoMaximo(tiempos);

            System.out.println(n + "," + media);
        }
    }

    private static long mediaDescartandoMaximo(long[] tiempos) {

        long max = Long.MIN_VALUE;
        int idxMax = 0;

        for (int i = 0; i < tiempos.length; i++) {
            if (tiempos[i] > max) {
                max = tiempos[i];
                idxMax = i;
            }
        }

        long suma = 0;

        for (int i = 0; i < tiempos.length; i++) {
            if (i != idxMax) suma += tiempos[i];
        }

        return suma / (tiempos.length - 1);
    }
}
