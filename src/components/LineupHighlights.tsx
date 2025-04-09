import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image component
import { client, urlFor } from '@/sanity/lib/client'; // Import client and urlFor
import type { SanityDocument } from 'next-sanity'; // Import type for fetched data

// GROQ query to fetch the first 4 artists, ordered by name
// Select only the necessary fields
const ARTISTS_QUERY = `*[_type == "artist"] | order(name asc) [0...4] {
  _id,
  name,
  slug,
  image
}`;

// Define an interface for the expected artist data structure
interface ArtistHighlight extends SanityDocument {
  name?: string;
  slug?: { current?: string };
  image?: any; // Use 'any' for simplicity or define a more specific image type
}

// Make the component async to fetch data
const LineupHighlights = async () => {
  // Fetch the artists data
  const artists: ArtistHighlight[] = await client.fetch(ARTISTS_QUERY);

  return (
    <section className="py-16 md:py-24 bg-brand-black"> {/* Match main background */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-brand-white">
          Lineup Highlights
        </h2>

        {/* Grid for featured bands */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {/* Map over fetched artists */}
          {artists.map((artist) => {
            const imageUrl = artist.image ? urlFor(artist.image)?.width(400).height(400).url() : null;
            const altText = artist.image?.alt || artist.name || 'Band photo';
            
            return (
              <div key={artist._id} className="group relative overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-brand-gray"></div>
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={altText} 
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={process.env.NODE_ENV !== 'production'} // Helpful for external image URLs if not using Sanity CDN directly
                  />
                ) : (
                  <div className="w-full h-[400px] bg-brand-gray flex items-center justify-center">
                    <span className="text-brand-white/50">No Image</span>
                  </div>
                )}
                {/* Optional: Link wrapper or name overlay */}
                {/* Example: Link wrapper to artist page (if you create those) */}
                {/* 
                <Link href={`/artists/${artist.slug?.current || ''}`} className="absolute inset-0 z-10">
                   <span className="sr-only">View {artist.name}</span>
                </Link> 
                */}
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