package org.algoritmica.benchmark.benchmarks;

import org.algoritmica.benchmark.algoritmos.FibIterativo;
import org.algoritmica.benchmark.algoritmos.FibRecursivo;
import org.algoritmica.benchmark.algoritmos.FibTail;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.State;

@State(Scope.Benchmark)
public class FibonacciBenchmark {

    // JMH buscará este parámetro. El valor por defecto puede ser cualquiera.
    @Param({"10"}) 
    public int n;

    private FibIterativo iterativo = new FibIterativo();
    private FibRecursivo recursivo = new FibRecursivo();
    private FibTail tail = new FibTail();

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
