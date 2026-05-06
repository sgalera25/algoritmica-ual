package org.algoritmica.benchmark.algoritmos;

public class PotenciaIterativa {
    public double calcular(double base, int exponente) {
        double resultado = 1.0;
        for (int i = 0; i < exponente; i++) {
            resultado *= base;
        }
        return resultado;
    }
}