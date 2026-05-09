package org.algoritmica.benchmark.benchmarks;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.algoritmica.benchmark.algoritmos.BubbleSort;
import org.openjdk.jmh.annotations.*;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@State(Scope.Thread)
public class BubbleSortBenchmark {

    @Param({"100", "500", "1000", "5000"})
    private int n;

    private int[] original;

    private int[] array;

    @Setup(Level.Trial)
    public void setup() {

        original = new int[n];

        Random random = new Random(123);

        for (int i = 0; i < n; i++) {
            original[i] = random.nextInt();
        }
    }

    @Setup(Level.Invocation)
    public void beforeEach() {

        array = new int[n];

        System.arraycopy(original, 0, array, 0, n);
    }

    @Benchmark
    public void testBubbleSort() {
        BubbleSort.bubbleSort(array);
    }
}