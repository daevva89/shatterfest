import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaTwitter } from 'react-icons/fa'; // Import social icons
import { SiteSettings } from '@/lib/sanity'; // Import SiteSettings type

// Add props for social links
interface FooterProps {
  siteSettings?: SiteSettings | null;
}

// Get icon component based on platform
const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'facebook': return FaFacebook;
    case 'instagram': return FaInstagram;
    case 'youtube': return FaYoutube;
    case 'tiktok': return FaTiktok;
    case 'twitter': return FaTwitter;
    default: return FaFacebook;
  }
};

const Footer = ({ siteSettings }: FooterProps) => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically
  const siteTitle = siteSettings?.title || 'ShatterFest';
  const hasSocialLinks = siteSettings?.socialLinks && siteSettings.socialLinks.length > 0;

  return (
    <footer className="bg-brand-black text-brand-gray border-t border-brand-gray/30 py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Copyright */}
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; {currentYear} {siteTitle} / Final Step Productions.</p>
        </div>

        {/* Social Media Links */}
        {hasSocialLinks && (
          <div className="flex space-x-6 mb-4 md:mb-0">
            {siteSettings?.socialLinks?.map((link) => {
              const SocialIcon = getSocialIcon(link.platform);
              return (
                <a 
                  key={link.platform}
                  href={link.url}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.platform}
                  className="text-brand-gray hover:text-brand-green transition-colors"
                >
                  <SocialIcon size={24} />
                </a>
              );
            })}
          </div>
        )}

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