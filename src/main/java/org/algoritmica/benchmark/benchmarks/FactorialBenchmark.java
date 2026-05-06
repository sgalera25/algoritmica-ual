package org.algoritmica.benchmark.benchmarks;

import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.State;

import org.algoritmica.benchmark.algoritmos.FactorialIterativo;
import org.algoritmica.benchmark.algoritmos.FactorialRecursivo;
import org.algoritmica.benchmark.algoritmos.FactorialTail;
import org.openjdk.jmh.annotations.*;
import java.util.concurrent.TimeUnit;

@State(Scope.Benchmark)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
public class FactorialBenchmark {

    @Param({"20"})
    public int n;

    private FactorialIterativo iterativo = new FactorialIterativo();
    private FactorialRecursivo recursivo = new FactorialRecursivo();
    private FactorialTail tail = new FactorialTail();

    @Benchmark
    public long testIterativo() {
        return iterativo.calcular(n);
    }

    @Benchmark
    public long testRecursivo() {
        return recursivo.calcular(n);
    }

    @Benchmark
    public long testTail() {
        return tail.calcular(n);
    }
}