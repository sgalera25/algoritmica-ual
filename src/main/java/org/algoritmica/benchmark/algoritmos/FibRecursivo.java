package org.algoritmica.benchmark.algoritmos;

public class FibRecursivo {

    public long calcular(int n) {
        return fib(n);
    }

    private long fib(int n) {
        if (n <= 1) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }
}