package org.algoritmica.benchmark.benchmarks;

import java.util.concurrent.TimeUnit;

import org.algoritmica.benchmark.algoritmos.Permutations;
import org.openjdk.jmh.annotations.*;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@State(Scope.Thread)
public class PermutationsBenchmark {

    @Param({"6", "7", "8", "9"})
    private int n;

    private int[] array;

    @Setup(Level.Trial)
    public void setup() {

        array = new int[n];

        for (int i = 0; i < n; i++) {
            array[i] = i;
        }
    }

    @Benchmark
    public void testPermutations() {
        Permutations.generate(array);
    }
}