import TrackSidebar from '@/components/track/TrackSidebar';

const TEST_MONITOR_URL = 'https://eth-act.github.io/zkevm-test-monitor/';

export const metadata = {
  title: 'RISC-V Compliance Test Monitor',
  description: 'Automated RISC-V compliance testing results for zkVM implementations',
};

export default function MonitorsPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <TrackSidebar activeCategory="testing-validation" activeSubpage="monitors" />

      <main className="flex-1 overflow-hidden">
        <iframe
          src={TEST_MONITOR_URL}
          className="w-full h-full"
          title="RISC-V Compliance Test Monitor"
        />
      </main>
    </div>
  );
}
