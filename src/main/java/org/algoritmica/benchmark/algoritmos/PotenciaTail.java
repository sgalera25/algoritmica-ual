package org.algoritmica.benchmark.algoritmos;

public class PotenciaTail {
    public double calcular(double base, int exponente) {
        return potenciaHelper(base, exponente, 1.0);
    }

    private double potenciaHelper(double base, int exponente, double acumulador) {
        if (exponente == 0) return acumulador;
        return potenciaHelper(base, exponente - 1, acumulador * base);
    }
}