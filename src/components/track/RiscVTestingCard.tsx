import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, CheckCircle2, FlaskConical } from 'lucide-react';

const TEST_MONITOR_URL = 'https://eth-act.github.io/zkevm-test-monitor/';

// Data from the RISC-V ZKVM Compliance Test Monitor
const testResults = [
  { name: 'SP1', isa: 'rv32im', passed: 46, total: 47, lastRun: '2026-01-15' },
  { name: 'Jolt', isa: 'rv64imac', passed: 124, total: 124, lastRun: '2026-01-18' },
  { name: 'OpenVM', isa: 'rv32im', passed: 46, total: 47, lastRun: '2026-01-17' },
  { name: 'Pico', isa: 'rv32im', passed: 46, total: 47, lastRun: '2026-01-19' },
  { name: 'R0VM', isa: 'rv32im', passed: 46, total: 47, lastRun: '2026-01-16' },
  { name: 'Zisk', isa: 'rv64imafdczicsr', passed: 661, total: 673, lastRun: '2026-01-18' },
];

export default function RiscVTestingCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            RISC-V Compliance Testing
          </CardTitle>
          <Link
            href={TEST_MONITOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View Test Monitor
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Automated compliance testing against the RISC-V specification
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {testResults.map((result) => {
            const passRate = (result.passed / result.total) * 100;
            const isPerfect = result.passed === result.total;

            return (
              <Link
                key={result.name}
                href={TEST_MONITOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="font-medium">{result.name}</div>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{result.isa}</code>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {isPerfect && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    <span className={`text-sm font-medium ${isPerfect ? 'text-green-600' : 'text-foreground'}`}>
                      {result.passed}/{result.total}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({passRate.toFixed(0)}%)
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
          Data from{' '}
          <Link
            href="https://github.com/eth-act/zkevm-test-monitor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            eth-act/zkevm-test-monitor
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
