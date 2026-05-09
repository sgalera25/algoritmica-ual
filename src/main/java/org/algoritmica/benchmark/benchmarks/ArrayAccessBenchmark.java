package org.algoritmica.benchmark.benchmarks;

import org.openjdk.jmh.annotations.*;

import java.util.concurrent.TimeUnit;


@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 3)
@Measurement(iterations = 5)
@Fork(1)
@State(Scope.Benchmark)
public class ArrayAccessBenchmark {

    @Param({"1000"})
    public int n;

    private int[] array;

    @Setup(Level.Trial)
    public void setup() {
        array = new int[n];

        for (int i = 0; i < n; i++) {
            array[i] = i;
        }
    }

    @Benchmark
    public int testAccesoConstante() {
        return array[n / 2];
    }
}