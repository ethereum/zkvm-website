'use client';

import { BenchmarkData } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BenchmarkChartProps {
  benchmarks: BenchmarkData[];
}

interface ChartDataPoint {
  date: string;
  [key: string]: number | string;
}

export default function BenchmarkChart({ benchmarks }: BenchmarkChartProps) {
  // Group benchmarks by implementation
  const implementations = Array.from(new Set(benchmarks.map(b => b.implementation)));

  // Transform data for recharts
  const chartData = benchmarks
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc, benchmark) => {
      const existingDate = acc.find(d => d.date === benchmark.date);
      if (existingDate) {
        existingDate[benchmark.implementation] = benchmark.proofTime;
      } else {
        acc.push({
          date: benchmark.date,
          [benchmark.implementation]: benchmark.proofTime
        });
      }
      return acc;
    }, [] as ChartDataPoint[]);

  // Color mapping for implementations
  const colors: Record<string, string> = {
    'SP1': '#3b82f6', // blue
    'RISC Zero': '#10b981', // green
    'Jolt': '#f59e0b', // orange
    'Valida': '#8b5cf6', // purple
    'Powdr': '#ec4899', // pink
  };

  // Get latest benchmark for each implementation
  const latestBenchmarks = implementations.map(impl => {
    const implBenchmarks = benchmarks.filter(b => b.implementation === impl);
    return implBenchmarks.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }).filter(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" aria-hidden="true" />
          Proof Generation Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Performance chart */}
          <div className="h-[300px]" role="img" aria-label="Line chart showing proof generation performance over time for different zkVM implementations">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis
                  label={{ value: 'Proof Time (seconds)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value) => {
                    if (typeof value === 'number') {
                      return [`${value.toFixed(1)}s`, 'Proof Time'];
                    }
                    return ['N/A', 'Proof Time'];
                  }}
                />
                <Legend />
                {implementations.map(impl => (
                  <Line
                    key={impl}
                    type="monotone"
                    dataKey={impl}
                    stroke={colors[impl] || '#6b7280'}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
                {/* Target line at 12 seconds */}
                <Line
                  type="monotone"
                  dataKey={() => 12}
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target (12s)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Latest performance metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            {latestBenchmarks.slice(0, 3).map((benchmark) => (
              <div key={benchmark.implementation} className="rounded-lg border bg-muted/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">{benchmark.implementation}</p>
                <p className="mt-2 text-2xl font-bold">
                  {benchmark.proofTime.toFixed(1)}s
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(benchmark.date).toLocaleDateString()}
                </p>
                {benchmark.hardware && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {benchmark.hardware}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Progress to target */}
          <div className="rounded-lg border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium">Progress to 12-Second Target</h3>
            <div className="space-y-3">
              {latestBenchmarks.map((benchmark) => {
                const percentToTarget = Math.min(100, (12 / benchmark.proofTime) * 100);
                const gapToTarget = benchmark.proofTime - 12;

                return (
                  <div key={benchmark.implementation}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{benchmark.implementation}</span>
                      <span className={gapToTarget <= 0 ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
                        {gapToTarget <= 0 ? '✓ Target achieved' : `${gapToTarget.toFixed(1)}s over target`}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full transition-all ${
                          percentToTarget >= 100 ? 'bg-green-600' : 'bg-primary'
                        }`}
                        style={{ width: `${percentToTarget}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
