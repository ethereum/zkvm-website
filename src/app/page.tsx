import MinimalHeader from '@/components/MinimalHeader';
import MinimalHero from '@/components/MinimalHero';
import NavigationCards from '@/components/NavigationCards';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <main>
        <MinimalHero />
        <div className="container mx-auto px-4 pb-16">
          <NavigationCards />
        </div>
        <div className="container mx-auto px-4 pb-16">
          <TeamSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
