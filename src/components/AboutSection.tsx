import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-gray/5"> {/* Light gray background to separate */}
      <div className="container mx-auto px-6 md:px-4 max-w-3xl text-center"> {/* Max width for readability */}
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-brand-white">
          Prepare for Impact!
        </h2>
        <p className="text-lg md:text-xl text-brand-white/90 mb-4 leading-relaxed">
          ShatterFest explodes onto the Bucharest scene for its debut edition on <span className="font-bold text-brand-orange">May 23-24, 2025</span>.
        </p>
        <p className="text-lg md:text-xl text-brand-white/90 mb-4 leading-relaxed">
          We're unleashing two days of pure metalcore and deathcore intensity, bringing together Romania's finest local titans alongside crushing international headliners. 
        </p>
        <p className="text-lg md:text-xl text-brand-white/90 leading-relaxed">
          More than just music, ShatterFest is about community – experience the chaos, embrace the energy, and connect with the core. Get ready.
        </p>
      </div>
    </section>
  );
};

export default AboutSection; 