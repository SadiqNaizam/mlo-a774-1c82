import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 sm:px-6 border-t bg-muted text-muted-foreground">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm">
        <p className="mb-2 md:mb-0">
          &copy; {currentYear} SecureApp. All rights reserved.
        </p>
        <nav className="flex gap-3 sm:gap-4">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;