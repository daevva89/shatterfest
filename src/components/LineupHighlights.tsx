import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image component

// Placeholder data for featured bands
const featuredBands = [
  {
    name: 'Siamese',
    // Replace with actual image path in /public directory
    image: '/images/bands/siamese-placeholder.jpg', 
    alt: 'Siamese Band Logo and Photo',
  },
  {
    name: 'Within Destruction',
    image: '/images/bands/within-destruction-placeholder.jpg',
    alt: 'Within Destruction Band Logo and Photo',
  },
  {
    name: 'W3 4R3 NUM83R5',
    image: '/images/bands/w34r3num83r5-placeholder.jpg',
    alt: 'W3 4R3 NUM83R5 Band Logo and Photo',
  },
  {
    name: 'For The Wicked',
    image: '/images/bands/for-the-wicked-placeholder.jpg',
    alt: 'For The Wicked Band Logo and Photo',
  },
];

const LineupHighlights = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-black"> {/* Match main background */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-brand-white">
          Lineup Highlights
        </h2>

        {/* Grid for featured bands */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {featuredBands.map((band) => (
            <div key={band.name} className="group relative overflow-hidden rounded-lg shadow-lg">
              {/* Placeholder background while images load or if missing */}
              <div className="absolute inset-0 bg-brand-gray"></div>
              <Image 
                src={band.image} 
                alt={band.alt} 
                width={400} // Adjust width as needed
                height={400} // Adjust height as needed (make it square or desired aspect ratio)
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                // Add placeholder styling if needed
                // placeholder="blur"
                // blurDataURL="..." // Generate a blurhash or use a low-res image
              />
              {/* Optional: Band name overlay */}
              {/* 
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent flex items-end p-4">
                <h3 className="font-heading text-xl text-brand-white font-bold">{band.name}</h3>
              </div>
              */}
            </div>
          ))}
        </div>

        {/* Link to full lineup page */}
        <Link 
          href="/lineup" 
          className="inline-block bg-brand-green text-brand-black font-heading font-bold py-3 px-8 rounded text-lg hover:bg-opacity-80 transition-all duration-300 shadow-md transform hover:scale-105"
        >
          See Full Lineup
        </Link>

      </div>
    </section>
  );
};

export default LineupHighlights; 