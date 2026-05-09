package org.algoritmica.benchmark.benchmarks;

import java.util.concurrent.TimeUnit;
import java.util.Random;

import org.algoritmica.benchmark.algoritmos.MergeSort;
import org.openjdk.jmh.annotations.*;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
public class MergeSortBenchmark {

    @Param({"1000", "5000", "10000", "50000"})
    private int n;

    private int[] array;

    private int[] input;

    @Setup(Level.Trial)
    public void setup() {

        array = new int[n];
        input = new int[n];

        Random random = new Random(123);

        for (int i = 0; i < n; i++) {
            input[i] = random.nextInt();
        }
    }

    @Setup(Level.Invocation)
    public void beforeEach() {
        System.arraycopy(input, 0, array, 0, n);
    }

    @Benchmark
    public void testMergeSort() {
        MergeSort.mergeSort(array);
    }
}