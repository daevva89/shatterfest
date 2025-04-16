import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  imageUrl?: string;
  imageAlt?: string;
  primaryCTA?: {
    text: string;
    url: string;
    isEnabled: boolean;
  };
}

const Hero = ({ 
  imageUrl, 
  imageAlt = "ShatterFest", 
  primaryCTA
}: HeroProps) => {
  return (
    // Use aspect ratio for desktop but keep full height on mobile
    <section 
      className="relative w-full bg-brand-gray text-brand-white overflow-hidden
                min-h-[calc(100vh-5rem)] md:min-h-0 md:aspect-[16/9] md:max-h-[calc(100vh-5rem)]"
      style={imageUrl ? { 
        backgroundImage: `url(${imageUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      } : undefined}
      aria-label={imageAlt}
    >
      {/* Dark overlay for better text readability over image */}
      <div className="absolute inset-0 bg-brand-black opacity-30 z-0"></div>

      {/* Content container - position the CTA button at the bottom */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        {/* CTA Button container with bottom padding */}
        <div className="container mx-auto px-4 pb-8 text-center mb-0">
          {/* CTA Button */}
          {primaryCTA?.isEnabled && (
            <a 
              href={primaryCTA.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark text-brand-white font-heading font-bold py-4 px-8 rounded text-xl md:text-2xl hover:opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              {primaryCTA.text}
              <span className="block text-sm font-sans font-normal mt-1">€46 / 230 RON - Presale</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero; 