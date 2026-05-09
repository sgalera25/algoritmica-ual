package org.algoritmica.benchmark.benchmarks;

import java.util.concurrent.TimeUnit;

import org.algoritmica.benchmark.algoritmos.BinarySearch;
import org.openjdk.jmh.annotations.*;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
public class BinarySearchBenchmark {

    @Param({"1000", "10000", "100000", "1000000"})
    private int n;

    private int[] array;

    private int target;

    @Setup(Level.Trial)
    public void setup() {

        array = new int[n];

        // Array ordenado
        for (int i = 0; i < n; i++) {
            array[i] = i;
        }

        // Buscar el último elemento
        target = n - 1;
    }

    @Benchmark
    public int testBinarySearch() {
        return BinarySearch.binarySearch(array, target);
    }
}