import { Zap, TrendingDown, Clock } from 'lucide-react';

export function BenchmarkPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-2">Proving Performance Benchmarks</h2>
        <p className="text-muted-foreground mb-6">
          Real-time proving performance metrics and hardware acceleration benchmarks
        </p>

        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-4 mb-6">
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Benchmarks Coming Soon
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              We&apos;re currently collecting performance data from various zkVM implementations
              and hardware configurations. This section will include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-gray-900 text-sm">Proof Generation Time</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Time to generate proofs for full Ethereum blocks across different zkVMs
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900 text-sm">Hardware Acceleration</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Performance improvements with GPU, FPGA, and specialized hardware
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900 text-sm">Progress to Sub-12s</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Tracking progress toward real-time proving (12-second block time)
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Benchmark data will be updated continuously as new
                measurements become available. Expected launch: Q1 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
