package org.algoritmica.benchmark.benchmarks;

import java.util.concurrent.TimeUnit;
import java.util.Random;

import org.algoritmica.benchmark.algoritmos.MatrixMultiplication;
import org.openjdk.jmh.annotations.*;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@State(Scope.Thread)
public class MatrixMultiplicationBenchmark {

    @Param({"50", "100", "200", "300"})
    private int n;

    private int[][] A;
    private int[][] B;

    @Setup(Level.Trial)
    public void setup() {

        Random random = new Random(123);

        A = new int[n][n];
        B = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                A[i][j] = random.nextInt(10);
                B[i][j] = random.nextInt(10);
            }
        }
    }

    @Benchmark
    public int[][] testMatrixMultiplication() {
        return MatrixMultiplication.multiply(A, B);
    }
}