package org.algoritmica.benchmark;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.RunnerException;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
@Warmup(iterations = 2)
@Measurement(iterations = 3)
@Fork(1)
public class MiPrimerBenchmark {
@Benchmark
public void testMetodoVacio() {
// Este método no hace nada, medirá el coste puro de JMH
}
public static void main(String[] args) throws RunnerException {
Options opt = new OptionsBuilder()
.include(MiPrimerBenchmark.class.getSimpleName())
.build();
new Runner(opt).run();
}
}