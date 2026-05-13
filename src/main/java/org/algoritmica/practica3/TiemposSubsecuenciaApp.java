package org.algoritmica.practica3;

public class TiemposSubsecuenciaApp {

    private static final int[] TAMANOS = {64, 128, 256, 512, 1024, 2048, 4096, 8192};
    private static final int REPETICIONES = 10;

    public static void main(String[] args) {

        System.out.println("n,tFuerzaBruta_ns,tMejorado_ns,tLineal_ns");

        for (int n : TAMANOS) {

            Subsecuencia s = new Subsecuencia(n);

            long tFB = medirTiempo(s, Algoritmo.FUERZA_BRUTA);
            long tMej = medirTiempo(s, Algoritmo.MEJORADO);
            long tLin = medirTiempo(s, Algoritmo.LINEAL);

            System.out.println(n + "," + tFB + "," + tMej + "," + tLin);
        }
    }

    private enum Algoritmo { FUERZA_BRUTA, MEJORADO, LINEAL }

    private static long medirTiempo(Subsecuencia s, Algoritmo alg) {

        long[] tiempos = new long[REPETICIONES];

        for (int i = 0; i < REPETICIONES; i++) {

            long inicio = System.nanoTime();

            switch (alg) {
                case FUERZA_BRUTA -> s.SubsecuenciaFuerzaBruta();
                case MEJORADO    -> s.SubsecuenciaMejorado();
                case LINEAL      -> s.SubsecuenciaLineal();
            }

            long fin = System.nanoTime();

            tiempos[i] = fin - inicio;
        }

        return mediaDescartandoMaximo(tiempos);
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
