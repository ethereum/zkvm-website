import MinimalHeader from '@/components/MinimalHeader';

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <main>{children}</main>
    </div>
  );
}
