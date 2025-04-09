import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    // Section container: full width, adjust height as needed (e.g., h-screen or min-h-[calc(100vh-theme(spacing.20))])
    // Using min-height to ensure it fits content but can grow, minus header height (pt-20)
    <section 
      className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] w-full bg-brand-gray text-brand-white overflow-hidden"
      // Replace bg-brand-gray with background image styling later
      // style={{ backgroundImage: `url('/path/to/your/hero-image.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Optional: Dark overlay for better text readability over image */}
      <div className="absolute inset-0 bg-brand-black opacity-50 z-0"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Logo Placeholder - Replace with actual logo later */}
        <h1 className="font-heading text-6xl md:text-8xl font-bold mb-4 text-brand-white drop-shadow-lg">
          ShatterFest
        </h1>

        {/* Date & Location */}
        <p className="font-heading text-xl md:text-2xl font-medium mb-2 text-brand-white">
          May 23-24, 2025 | Quantic Club, Bucharest
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl mb-8 text-brand-white italic">
          Unleash the Chaos: ShatterFest 2025
        </p>

        {/* Main Call to Action Button */}
        <a 
          href="https://www.iabilet.ro/bilete-shatterfest-105031/" // Ensure this is the correct, updated link
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark text-brand-white font-heading font-bold py-4 px-8 rounded text-xl md:text-2xl hover:opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          BUY WEEKEND PASS NOW
          <span className="block text-sm font-sans font-normal mt-1">€46 / 230 RON - Presale</span>
        </a>

      </div>
    </section>
  );
};

export default Hero; 