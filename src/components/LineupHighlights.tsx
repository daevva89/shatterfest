import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define interfaces for props and artist data
interface ArtistData {
  _id: string;
  name: string;
  country?: string;
  image?: {
    url: string;
    alt?: string;
  };
  slug?: { 
    current: string;
  };
  day?: string;
  position?: number;
  bio?: string;
  musicLinks?: {
    platform: string;
    url: string;
  }[];
}

interface LineupHighlightsProps {
  title: string;
  artists: ArtistData[];
}

const LineupHighlights = ({ title, artists }: LineupHighlightsProps) => {
  return (
    <section className="py-4 md:py-16 lg:py-24 bg-brand-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-brand-white">
          {title}
        </h2>

        {/* Grid for featured bands */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12">
          {/* Map over artists passed as props */}
          {artists.map((artist) => {
            return (
              <div 
                key={artist._id} 
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                {artist.image?.url ? (
                  <Image 
                    src={artist.image.url} 
                    alt={artist.image.alt || artist.name} 
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={process.env.NODE_ENV !== 'production'}
                  />
                ) : (
                  <div className="w-full h-[400px] bg-brand-gray flex items-center justify-center">
                    <span className="text-brand-white/50">No Image</span>
                  </div>
                )}
              </div>
            );
          })}
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