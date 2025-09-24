import { Button } from '@/components/ui/button';

const BookSection = () => {
  return (
    <section id="book" className="section">
      <div className="book-section-container">
        <h2 style={{fontSize: '1.5rem'}}>Read the Book</h2>
        <p>For a complete technical overview, our book provides a top-down exploration of ZK-EVMs. It covers everything from the high-level architecture to the deep cryptographic principles of ZK-VM internals.</p>
        <Button 
          variant="book-primary" 
          size="legacy"
          asChild
        >
          <a href="https://zkevm.fyi" target="_blank" rel="noopener noreferrer">
            Start Reading
          </a>
        </Button>
      </div>
    </section>
  );
};

export default BookSection;