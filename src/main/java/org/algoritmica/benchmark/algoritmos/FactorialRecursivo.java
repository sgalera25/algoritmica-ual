package org.algoritmica.benchmark.algoritmos;

public class FactorialRecursivo {
	public long calcular(int n) {
        if (n <= 1) return 1;
        return n * calcular(n - 1);
    }
}
