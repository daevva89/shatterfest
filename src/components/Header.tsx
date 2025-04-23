'use client'; // Mark this as a Client Component

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Link from 'next/link';
import Image from 'next/image'; // Add Image import
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { SiteSettings } from '@/lib/sanity'; // Import SiteSettings type
import LanguageSwitcher from './LanguageSwitcher'; // Import the switcher
// import { Locale } from '@/config/i18n'; // Remove unused import

// Define type for the header dictionary slice
interface HeaderDict {
  home: string;
  lineup: string;
  tickets: string; // Note: The dictionary has 'tickets', but the button uses 'BUY TICKETS' - adjust dict or add key if needed
  buyTickets?: string; // Adding a potential key for the button itself
  info?: string; // Adding key for info page
}

// Define Locale type locally for Header
type Locale = 'en' | 'ro';

// Define props for the component
interface HeaderProps {
  siteSettings?: SiteSettings | null;
  locale: Locale; // Locale is still needed for links
  headerDict: HeaderDict; // Add headerDict prop
}

const Header = ({ siteSettings, locale, headerDict }: HeaderProps) => {
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

  // Determine which logo to use
  const logoUrl = siteSettings?.logo?.url;
  const logoAlt = siteSettings?.logo?.alt || 'ShatterFest';
  const siteTitle = siteSettings?.title || 'ShatterFest';
  const ticketUrl = siteSettings?.ticketUrl || 'https://www.iabilet.ro/bilete-shatterfest-105031/';

  // Decide the button text (use specific key or fallback)
  const buyTicketsText = headerDict.buyTickets || headerDict.tickets || 'BUY TICKETS'; // Fallback chain
  const infoText = headerDict.info || 'Info'; // Fallback for Info link

  return (
    // Make header sticky, full width, high z-index, add bottom border
    <header className="fixed top-0 left-0 w-full bg-brand-black text-brand-white p-4 shadow-md z-50 border-b border-brand-gray/50">
      <div className="container mx-auto flex md:justify-between items-center">
        {/* Mobile Menu Button (Left side on small screens) */}
        <div className="md:hidden order-first w-1/4">
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

        {/* Logo - Link to locale root */}
        <Link 
          href={`/${locale}/`}
          className="relative flex items-center justify-center md:justify-start hover:opacity-90 transition-opacity w-1/2 md:w-auto mx-auto md:mx-0" 
          onClick={closeMobileMenu}
        >
          {logoUrl ? (
            <div className="relative h-16 md:h-24 w-auto -translate-y-1 -mb-10 md:-mb-14 z-10">
              <Image 
                src={logoUrl}
                alt={logoAlt}
                width={240}
                height={100}
                className="object-contain h-full w-auto"
                priority
              />
            </div>
          ) : (
            <span className="font-heading text-3xl font-bold hover:text-brand-orange transition-colors">
              {siteTitle}
            </span>
          )}
        </Link>

        {/* Desktop Navigation (Hidden on small screens) */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 items-center">
            <li><Link href={`/${locale}/`} className="hover:text-brand-green transition-colors">{headerDict.home}</Link></li>
            <li><Link href={`/${locale}/lineup`} className="hover:text-brand-green transition-colors">{headerDict.lineup}</Link></li>
            <li><Link href={`/${locale}/info`} className="hover:text-brand-green transition-colors">{infoText}</Link></li>
            <li><LanguageSwitcher /></li>
            <li>
              <a 
                href={ticketUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark text-brand-white font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity text-sm"
              >
                {buyTicketsText}
              </a>
            </li>
          </ul>
        </nav>

        {/* Empty div to balance the mobile layout (right side) */}
        <div className="md:hidden order-last w-1/4"></div>
      </div>

      {/* Mobile Menu Panel - Slides in from right */}
      <div 
        className={`
          md:hidden fixed top-0 right-0 h-full w-3/4 max-w-sm bg-brand-black 
          shadow-lg p-6 transform transition-transform duration-300 ease-in-out z-40 
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="flex flex-col space-y-6 mt-10">
          <Link href={`/${locale}/`} className="text-xl hover:text-brand-green transition-colors" onClick={closeMobileMenu}>{headerDict.home}</Link>
          <Link href={`/${locale}/lineup`} className="text-xl hover:text-brand-green transition-colors" onClick={closeMobileMenu}>{headerDict.lineup}</Link>
          <Link href={`/${locale}/info`} className="text-xl hover:text-brand-green transition-colors" onClick={closeMobileMenu}>{infoText}</Link>
          <a 
            href={ticketUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center mt-6 bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark text-brand-white font-bold py-3 px-4 rounded hover:opacity-90 transition-opacity"
            onClick={closeMobileMenu}
          >
            {buyTicketsText}
          </a>
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