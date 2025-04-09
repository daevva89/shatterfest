import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-brand-black text-brand-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-heading text-3xl font-bold hover:text-brand-orange transition-colors">
          Shatterfest
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><Link href="/" className="hover:text-brand-green transition-colors">Home</Link></li>
            <li><Link href="/lineup" className="hover:text-brand-green transition-colors">Lineup</Link></li>
            <li><Link href="/schedule" className="hover:text-brand-green transition-colors">Schedule</Link></li>
            <li><Link href="/info" className="hover:text-brand-green transition-colors">Info</Link></li>
            <li>
              <Link href="/tickets" className="bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark text-brand-white font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity text-sm">
                Buy Tickets
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 