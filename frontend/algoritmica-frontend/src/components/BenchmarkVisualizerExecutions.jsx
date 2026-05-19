import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const formatValue = (val) => {
  if (val === 0 || !val) return "0";
  return val < 0.0001 ? val.toExponential(4) : val.toLocaleString();
};

export const BenchmarkVisualizerExecutions = ({ data, metricMode }) => {
  const firstUnit = data?.[0]?.scoreUnit || "ns/op";
  const isThroughput = firstUnit.includes("ops");

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    console.log("Datos a evaluar: ", data)
    return data.map(item => {
      const paramKey = Object.keys(item.paramsUsados)[0];
      const rawError = item.scoreError;

      const parsedError = Number(rawError);

      const cleanError = Number.isFinite(parsedError)
        ? parsedError
        : 0;

      return {
        valor: Number(item.paramsUsados[paramKey]),
        score: item.score,
        error: cleanError,
        unit: item.scoreUnit
      };
    }).sort((a, b) => a.valor - b.valor);
  }, [data]);

  if (chartData.length === 0) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 768 ? '300px 1fr' : '1fr',
        gap: '24px',
        width: '100%',
        alignItems: 'start'
      }}
    >
      <div style={{ minWidth: '300px', width: '300px' }} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500">
            <tr>
              <th className="px-1 py-3 text-center border-r">n</th>
              <th className="px-1 py-3 text-center border-r">Métrica</th>
              <th className="px-1 py-3 text-center">Error</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-mono text-[11px]">
            {chartData.map((item, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                <td className="px-1 py-2 text-center text-gray-600 bg-gray-50/30 border-r">
                  {item.valor.toLocaleString()}
                </td>
                <td className="px-1 py-2 text-center font-bold text-blue-600 border-r">
                  {formatValue(item.score)}
                </td>
                <td className="px-1 py-2 text-center text-gray-400">
                  {formatValue(item.error)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          minWidth: 0,
          height: '450px',
          width: '100%'
        }}
        className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="valor" tick={{ fontSize: 11 }} tickFormatter={(v) => v.toLocaleString()}>
              <Label value="Parámetro (n)" offset={-20} position="insideBottom" style={{ fontWeight: 600, fill: '#666' }} />
            </XAxis>
            <YAxis tick={{ fontSize: 11 }} width={60}>
              <Label value={firstUnit} angle={-90} position="insideLeft" style={{ fontWeight: 600, fill: '#666' }} />
            </YAxis>
            <Tooltip formatter={(value) => [formatValue(value), firstUnit]} />
            <Line
              type="monotone"
              dataKey="score"
              stroke={isThroughput ? "#10b981" : "#3b82f6"}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};