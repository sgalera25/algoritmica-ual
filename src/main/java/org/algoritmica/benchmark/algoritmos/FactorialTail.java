package org.algoritmica.benchmark.algoritmos;

public class FactorialTail {
	public long calcular(int n) {
        return facHelper(n, 1);
    }

    private long facHelper(int n, long acumulador) {
        if (n <= 1) return acumulador;
        return facHelper(n - 1, n * acumulador);
    }
}
