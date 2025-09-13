const BlogSection = () => {
  const blogPosts = [
    {
      date: "August 28, 2025",
      title: "Prover Parallelization: A New Milestone",
      excerpt: "Our latest benchmarks show significant progress in real-time proving capabilities, with new parallelization techniques reducing proof generation time by 40%..."
    },
    {
      date: "August 15, 2025", 
      title: "Deep Dive: ZK-EVM Protocol Integration",
      excerpt: "An in-depth exploration of how ZK-EVMs will integrate with existing Ethereum infrastructure, including detailed protocol specifications for client teams..."
    },
    {
      date: "July 30, 2025",
      title: "Community Update: Q2 Progress",
      excerpt: "A comprehensive overview of our Q2 achievements, upcoming milestones, and how the community can get involved in the ZK-EVM initiative..."
    }
  ];

  return (
    <section id="blog">
      <div className="section-title">
        <h2>Latest Updates & Insights</h2>
      </div>
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <div key={post.title} className="blog-card">
            <a href="#" style={{textDecoration: 'none'}}>
              <div className="blog-card-content">
                <div className="blog-date">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div style={{textAlign: 'center', marginTop: '3rem'}}>
        <a href="#" className="btn btn-primary" style={{background: 'var(--dark)'}}>View All Posts</a>
      </div>
    </section>
  );
};

export default BlogSection;