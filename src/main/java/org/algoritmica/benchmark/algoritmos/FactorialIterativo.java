package org.algoritmica.benchmark.algoritmos;

public class FactorialIterativo {
   public long calcular(int n) {
        long resultado = 1;
        for (int i = 1; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }
}
