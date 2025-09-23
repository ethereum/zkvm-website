const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        <a href="#" className="logo">
          <img 
            src="/logo.png" 
            alt="Ethereum Foundation zkEVM" 
            className="h-12 w-auto"
          />
        </a>
      </div>
      <div className="footer-copy">
        &copy; 2025 zkEVM team — Ethereum Foundation. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;