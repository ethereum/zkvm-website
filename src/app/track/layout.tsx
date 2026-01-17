import MinimalHeader from '@/components/MinimalHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Track' }]} />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
