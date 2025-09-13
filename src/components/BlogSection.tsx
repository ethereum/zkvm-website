const BlogSection = () => {
  const blogPosts = [
    {
      date: "December 15, 2024",
      title: "Prover Parallelization: A New Milestone",
      excerpt: "We've achieved significant breakthroughs in parallel proof generation, reducing block proving time by 60% through advanced circuit optimization techniques."
    },
    {
      date: "November 28, 2024", 
      title: "Client Integration Progress Report",
      excerpt: "Latest updates on Geth and Nethermind integration, including new RPC endpoints and proof verification interfaces for seamless ZK-EVM adoption."
    },
    {
      date: "November 10, 2024",
      title: "Economic Models for Prover Markets",
      excerpt: "Exploring incentive mechanisms to ensure robust prover networks while maintaining decentralization and censorship resistance properties."
    }
  ];

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
          Latest Updates & Insights
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article 
            key={post.title}
            className="group bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/50 cursor-pointer"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="text-sm font-sans font-semibold text-primary mb-3">
                {post.date}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4 leading-snug group-hover:text-primary transition-colors duration-200">
                {post.title}
              </h3>
              
              <p className="font-sans text-gray leading-relaxed flex-grow">
                {post.excerpt}
              </p>
              
              <div className="mt-6 pt-4 border-t border-border">
                <span className="text-sm font-sans text-primary font-medium group-hover:text-primary-dark transition-colors duration-200 inline-flex items-center gap-2">
                  Read More 
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;