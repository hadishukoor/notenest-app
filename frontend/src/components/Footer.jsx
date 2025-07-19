import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        &copy; {currentYear}{' '}
        <a 
          href="https://www.linkedin.com/in/hadishukoor111" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          Mohammad Hadi Shukoor
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;