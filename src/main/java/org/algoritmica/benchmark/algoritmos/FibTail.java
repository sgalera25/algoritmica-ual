package org.algoritmica.benchmark.algoritmos;

public class FibTail {

    public long calcular(int n) {
        return fibHelper(n, 0, 1);
    }

    private long fibHelper(int n, long a, long b) {
        if (n == 0) return a;
        if (n == 1) return b;
        return fibHelper(n - 1, b, a + b);
    }
}