const BookSection = () => {
  return (
    <section id="book">
      <div className="book-section-container">
        <h2>Read the Book</h2>
        <p>For a complete technical overview, our book provides a top-down exploration of ZK-EVMs. It covers everything from the high-level architecture to the deep cryptographic principles of ZK-VM internals.</p>
        <a href="https://zkevm.fyi" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{background: 'white', color: 'var(--dark)'}}>
          Start Reading at zkevm.fyi
        </a>
      </div>
    </section>
  );
};

export default BookSection;