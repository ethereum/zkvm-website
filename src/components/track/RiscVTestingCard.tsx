import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, FlaskConical } from 'lucide-react';

const TEST_MONITOR_URL = 'https://eth-act.github.io/zkevm-test-monitor/';

export default function RiscVTestingCard() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Link
          href={TEST_MONITOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <FlaskConical className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">RISC-V Compliance Test Monitor</div>
              <div className="text-sm text-muted-foreground">
                View automated compliance testing results
              </div>
            </div>
          </div>
          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </CardContent>
    </Card>
  );
}
