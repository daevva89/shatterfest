import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  imageUrl?: string;
  mobileImageUrl?: string;
  imageAlt?: string;
  primaryCTA?: {
    text: string;
    url: string;
    isEnabled: boolean;
    priceInfo?: string;
  };
}

const Hero = ({ 
  imageUrl, 
  mobileImageUrl,
  imageAlt = "ShatterFest", 
  primaryCTA
}: HeroProps) => {
  return (
    <section 
      className="relative w-full bg-brand-gray text-brand-white overflow-hidden
                md:aspect-[16/9] md:max-h-[calc(100vh-5rem)]"
      aria-label={imageAlt}
    >
      {/* For desktop: regular background image */}
      {imageUrl && (
        <div 
          className="absolute inset-0 hidden md:block" 
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          aria-hidden="true"
        />
      )}
      
      {/* For mobile: Use simple background image approach instead of Image component */}
      {mobileImageUrl && (
        <div 
          className="block md:hidden pt-[100%] relative w-full"
          aria-hidden="true"
        >
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `url(${mobileImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#000' 
            }}
          />
        </div>
      )}
      
      {/* Fallback to desktop image on mobile if no mobile image */}
      {!mobileImageUrl && imageUrl && (
        <div 
          className="block md:hidden pt-[56.25%] relative w-full"
          aria-hidden="true"
        >
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#000'
            }}
          />
        </div>
      )}
      
      {/* Dark overlay for better text readability over image on desktop */}
      <div className="absolute inset-0 bg-brand-black opacity-30 z-10 hidden md:block"></div>

      {/* Content container - position the CTA button at the bottom for desktop, below image for mobile */}
      <div className="relative z-20 md:absolute md:inset-0 md:flex md:flex-col md:justify-end">
        {/* CTA Button container with padding */}
        <div className="w-full px-0 py-8 text-center bg-brand-black md:container md:mx-auto md:px-4 md:bg-transparent">
          {/* CTA Button */}
          {primaryCTA?.isEnabled && (
            <a 
              href={primaryCTA.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark text-brand-white font-heading font-bold py-3 md:py-4 px-6 md:px-8 rounded text-lg md:text-2xl hover:opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              {primaryCTA.text}
              {primaryCTA.priceInfo && (
                <span className="block text-xs md:text-sm font-sans font-normal mt-1">{primaryCTA.priceInfo}</span>
              )}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero; 