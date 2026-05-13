package org.algoritmica.practica3;

import java.util.Arrays;
import java.util.Random;

public class Subsecuencia {

    private final int[] array;
    private int primer;
    private int ultimo;
    private int suma;

    public Subsecuencia(int numeroElementos) {

        this.array = new int[numeroElementos];

        Random random = new Random();

        for (int i = 0; i < numeroElementos; i++) {
            array[i] = random.nextInt(199) - 99;
        }
    }

    public Subsecuencia(int[] arrayEnteros) {
        this.array = Arrays.copyOf(arrayEnteros, arrayEnteros.length);
    }

    public int[] getArray() {
        return array;
    }

    public int getPrimer() {
        return primer;
    }

    public int getUltimo() {
        return ultimo;
    }

    public int getSuma() {
        return suma;
    }

    public void SubsecuenciaFuerzaBruta() {

        int maxSum = 0;
        int seqStart = 0;
        int seqEnd = 0;

        for (int i = 0; i < array.length; i++) {

            for (int j = i; j < array.length; j++) {

                int thisSum = 0;

                for (int k = i; k <= j; k++) {
                    thisSum += array[k];
                }

                if (thisSum > maxSum) {
                    maxSum = thisSum;
                    seqStart = i;
                    seqEnd = j;
                }
            }
        }

        this.suma = maxSum;
        this.primer = seqStart;
        this.ultimo = seqEnd;
    }

    public void SubsecuenciaMejorado() {

        int maxSum = 0;
        int seqStart = 0;
        int seqEnd = 0;

        for (int i = 0; i < array.length; i++) {

            int thisSum = 0;

            for (int j = i; j < array.length; j++) {

                thisSum += array[j];

                if (thisSum > maxSum) {
                    maxSum = thisSum;
                    seqStart = i;
                    seqEnd = j;
                }
            }
        }

        this.suma = maxSum;
        this.primer = seqStart;
        this.ultimo = seqEnd;
    }

    public void SubsecuenciaLineal() {

        int maxSum = 0;
        int thisSum = 0;
        int seqStart = 0;
        int seqEnd = 0;

        for (int i = 0, j = 0; j < array.length; j++) {

            thisSum += array[j];

            if (thisSum > maxSum) {
                maxSum = thisSum;
                seqStart = i;
                seqEnd = j;
            } else if (thisSum < 0) {
                i = j + 1;
                thisSum = 0;
            }
        }

        this.suma = maxSum;
        this.primer = seqStart;
        this.ultimo = seqEnd;
    }
}
