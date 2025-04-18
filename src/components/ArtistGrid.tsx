"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import ArtistModal from './ArtistModal';
import type { Artist } from '@/app/lineup/page';

interface ArtistGridProps {
  artists: Artist[];
}

const ArtistGrid = ({ artists }: ArtistGridProps) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  return (
    <>
      {/* Grid for artists within a day column */}
      <div className="grid grid-cols-2 gap-4">
        {artists.map((artist) => {
          const imageUrl = artist.image ? urlFor(artist.image)?.width(300).height(300).url() : null;
          const altText = artist.image?.alt || artist.name || 'Band photo';

          return (
            <div 
              key={artist._id} 
              className="group relative text-center bg-brand-gray/10 p-2 rounded-lg shadow-md hover:bg-brand-gray/20 transition-colors duration-200 cursor-pointer"
              onClick={() => setSelectedArtist(artist)}
            >
              <div className="relative aspect-square mb-2 overflow-hidden rounded">
                {imageUrl ? (
                  <Image 
                    src={imageUrl}
                    alt={altText}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw" // Adjusted sizes for 2 columns
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={process.env.NODE_ENV !== 'production'}
                  />
                ) : (
                  <div className="w-full h-full bg-brand-gray flex items-center justify-center">
                    <span className="text-brand-white/50 text-sm">No Image</span>
                  </div>
                )}
              </div>
              <h3 className="font-heading text-lg font-medium text-brand-white truncate" title={artist.name}>
                {artist.name}
              </h3>
              {artist.country && (
                <p className="text-sm text-brand-white/70">{artist.country}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Artist Modal */}
      {selectedArtist && (
        <ArtistModal 
          artist={selectedArtist} 
          onClose={() => setSelectedArtist(null)} 
        />
      )}
    </>
  );
};

export default ArtistGrid; 