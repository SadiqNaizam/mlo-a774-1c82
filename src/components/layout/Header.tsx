import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="py-4 px-4 sm:px-6 border-b bg-background shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-12">
        <Link to="/" className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
          <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />
          <span>SecureApp</span>
        </Link>
        {/* Minimal header for auth pages, no extensive navigation */}
      </div>
    </header>
  );
};

export default Header;