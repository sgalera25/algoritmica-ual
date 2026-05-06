package org.algoritmica.benchmark.benchmarks;

import org.algoritmica.benchmark.algoritmos.PotenciaIterativa;
import org.algoritmica.benchmark.algoritmos.PotenciaRecursiva;
import org.algoritmica.benchmark.algoritmos.PotenciaTail;
import org.openjdk.jmh.annotations.*;
import java.util.concurrent.TimeUnit;

@State(Scope.Benchmark)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
public class PotenciaBenchmark {

    @Param({"2.0"})
    public double base;

    @Param({"10"})
    public int exponente;

    private PotenciaIterativa iterativo = new PotenciaIterativa();
    private PotenciaRecursiva recursivo = new PotenciaRecursiva();
    private PotenciaTail tail = new PotenciaTail();

    @Benchmark
    public double testIterativo() {
        return iterativo.calcular(base, exponente);
    }

    @Benchmark
    public double testRecursivo() {
        return recursivo.calcular(base, exponente);
    }

    @Benchmark
    public double testTail() {
        return tail.calcular(base, exponente);
    }
}