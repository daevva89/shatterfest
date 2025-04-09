'use client'; // Mark this as a Client Component

import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'; // Import icons

// Later, we'll add state for the mobile menu

const Header = () => {
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close mobile menu (useful for link clicks)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    // Make header sticky, full width, high z-index, add bottom border
    <header className="fixed top-0 left-0 w-full bg-brand-black text-brand-white p-4 shadow-md z-50 border-b border-brand-gray/50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-heading text-3xl font-bold hover:text-brand-orange transition-colors" onClick={closeMobileMenu}>
          Shatterfest
        </Link>

        {/* Desktop Navigation (Hidden on small screens) */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 items-center">
            <li><Link href="/" className="hover:text-brand-green transition-colors">Home</Link></li>
            <li><Link href="/lineup" className="hover:text-brand-green transition-colors">Lineup</Link></li>
            <li><Link href="/schedule" className="hover:text-brand-green transition-colors">Schedule</Link></li>
            <li><Link href="/info" className="hover:text-brand-green transition-colors">Info</Link></li>
            <li>
              {/* External Link to Tickets - use <a> tag */}
              <a 
                href="https://www.iabilet.ro/bilete-shatterfest-105031/" // Replace with actual ticket link
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark text-brand-white font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity text-sm"
              >
                BUY TICKETS
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button (Visible only on small screens) */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="text-brand-white focus:outline-none p-2 rounded hover:bg-brand-gray/50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-brand-white" /> // Close Icon
            ) : (
              <Bars3Icon className="h-6 w-6 text-brand-white" /> // Hamburger Icon
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel - Slides in from right */}
      <div 
        className={`
          md:hidden fixed top-0 right-0 h-full w-3/4 max-w-sm bg-brand-black 
          shadow-lg p-6 transform transition-transform duration-300 ease-in-out z-40 
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        // Add pt equal to header height if menu starts below header
        // style={{ paddingTop: 'calc(4rem + 1px)' }} // Adjust based on actual header height
      >
        <nav className="flex flex-col space-y-6 mt-10"> {/* Added mt-10 for spacing */}
          <Link href="/" className="text-xl hover:text-brand-green transition-colors" onClick={closeMobileMenu}>Home</Link>
          <Link href="/lineup" className="text-xl hover:text-brand-green transition-colors" onClick={closeMobileMenu}>Lineup</Link>
          <Link href="/schedule" className="text-xl hover:text-brand-green transition-colors" onClick={closeMobileMenu}>Schedule</Link>
          <Link href="/info" className="text-xl hover:text-brand-green transition-colors" onClick={closeMobileMenu}>Info</Link>
          <a 
            href="https://www.iabilet.ro/bilete-shatterfest-2024-97983/"
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center mt-6 bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark text-brand-white font-bold py-3 px-4 rounded hover:opacity-90 transition-opacity"
            onClick={closeMobileMenu}
          >
            BUY TICKETS
          </a>
          {/* Optional: Close button inside panel */}
          {/* <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-brand-white"> <XMarkIcon className="h-6 w-6" /> </button> */}
        </nav>
      </div>

      {/* Optional: Overlay for darkening background when menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
          onClick={closeMobileMenu} // Close menu when clicking overlay
        ></div>
      )}

    </header>
  );
};

export default Header; 