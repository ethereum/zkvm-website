'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, FlaskConical, Maximize2, Minimize2 } from 'lucide-react';

const TEST_MONITOR_URL = 'https://eth-act.github.io/zkevm-test-monitor/';

export default function RiscVTestingCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FlaskConical className="h-5 w-5 text-primary" />
          <div>
            <div className="font-medium">RISC-V Compliance Test Monitor</div>
            <div className="text-sm text-muted-foreground">
              Automated compliance testing results
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? (
              <Minimize2 className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          <Link
            href={TEST_MONITOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </div>

      <div className={`rounded-lg border overflow-hidden transition-all ${expanded ? 'h-[800px]' : 'h-[400px]'}`}>
        <iframe
          src={TEST_MONITOR_URL}
          className="w-full h-full"
          title="RISC-V Compliance Test Monitor"
        />
      </div>
    </div>
  );
}
