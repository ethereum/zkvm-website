import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}

export default function PageLayout({ title, description, children, extra }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-48 pb-36">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="mb-32">
            <h1 className="text-7xl font-black text-[#0C9FDE] mb-4 tracking-tight">{title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
            {extra}
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
