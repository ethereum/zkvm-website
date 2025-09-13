import { Button } from "@/components/ui/button";

const BookSection = () => {
  return (
    <section id="book" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-slate rounded-2xl text-white text-center p-12 sm:p-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-lg rotate-12"></div>
          <div className="absolute top-20 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 border border-white/20 rounded-lg -rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-8 h-8 border border-white/20 rounded-full"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            The Complete ZK-EVM Guide
          </h2>
          <p className="text-lg sm:text-xl font-sans text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Deep dive into Zero Knowledge Ethereum Virtual Machines with our comprehensive technical guide. 
            From theoretical foundations to practical implementation strategies.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-sans font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:scale-105"
            >
              Download PDF
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-sans font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Read Online
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;