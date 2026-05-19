import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BenchmarkVisualizer = ({ data }) => {
    if (!data || !data.primaryMetric) return null;

    const chartData = data.primaryMetric.rawData[0].map((valor, index) => ({
        iteracion: `It ${index + 1}`,
        valor: valor
    }));

    const score = data.primaryMetric.score;
    const unit = data.primaryMetric.scoreUnit;
    const error = data.primaryMetric.scoreError;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-in fade-in duration-500">

            {/* Tarjeta de Métricas */}
            <div className="border p-6 rounded-xl bg-white shadow-sm border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Métricas de JMH</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Resultado Promedio</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-mono font-bold text-blue-900">
                                {score.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-gray-500 font-medium">{unit}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 border rounded-lg bg-gray-50">
                            <p className="text-gray-500">Error (±)</p>
                            <p className="font-bold text-red-600">
                                {typeof error === 'number' && !isNaN(error)
                                    ? error.toFixed(3)
                                    : "Sin datos"}
                            </p>
                        </div>
                        <div className="p-3 border rounded-lg bg-gray-50">
                            <p className="text-gray-500">Muestras</p>
                            <p className="font-bold">{chartData.length}</p>
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 italic">
                        Benchmark: {data.benchmark}
                    </div>
                </div>
            </div>

            {/* Gráfico de Barras */}
            <div className="border p-6 rounded-xl bg-white shadow-sm border-gray-200 h-80">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Estabilidad de Iteraciones</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="iteracion" tick={{ fontSize: 12 }} />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ fill: '#f3f4f6' }}
                            formatter={(value) => [value.toLocaleString(), "Resultado"]}
                            contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="valor" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fillOpacity={0.7 + (index * 0.05)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <details className="lg:col-span-2 cursor-pointer">
                <summary className="text-sm text-gray-500 hover:text-gray-700 font-medium">Ver detalles técnicos (JVM & Params)</summary>
                <div className="mt-2 p-4 rounded-lg bg-gray-900 text-green-400 font-mono text-xs overflow-x-auto">
                    <pre>{JSON.stringify({
                        jvm: data.vmName,
                        jdk: data.jdkVersion,
                        params: data.params,
                        warmup: data.warmupIterations
                    }, null, 2)}</pre>
                </div>
            </details>
        </div>
    );
};

export default BenchmarkVisualizer;