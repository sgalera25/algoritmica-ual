package org.algoritmica.benchmark.algoritmos;

public class PotenciaRecursiva {
    public double calcular(double base, int exponente) {
        if (exponente == 0) return 1.0;
        if (exponente == 1) return base;
        
        return base * calcular(base, exponente - 1);
    }
}