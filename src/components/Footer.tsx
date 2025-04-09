import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Import social icons

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className="bg-brand-black text-brand-gray border-t border-brand-gray/30 py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Copyright */}
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; {currentYear} ShatterFest / Final Step Productions.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a 
            href="https://www.facebook.com/finalstepproductions" // Replace with actual FB link
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook"
            className="text-brand-gray hover:text-brand-green transition-colors"
          >
            <FaFacebook size={24} />
          </a>
          <a 
            href="https://www.instagram.com/finalstepproductions/" // Replace with actual IG link
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
            className="text-brand-gray hover:text-brand-green transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Legal Links */}
        <div className="flex space-x-4 text-sm">
          <Link href="/privacy-policy" className="hover:text-brand-white transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms-of-service" className="hover:text-brand-white transition-colors">Terms of Service</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer; 