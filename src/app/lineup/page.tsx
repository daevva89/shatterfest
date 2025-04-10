import React from 'react';
import Image from 'next/image';
import { client, urlFor } from '@/sanity/lib/client';
import type { SanityDocument } from 'next-sanity';

// GROQ query to fetch all artists, ordered by name
const ALL_ARTISTS_QUERY = `*[_type == "artist"] | order(name asc) {
  _id,
  name,
  slug,
  image
}`;

// Define the Artist type (can reuse or refine the one from LineupHighlights)
interface Artist extends SanityDocument {
  name?: string;
  slug?: { current?: string };
  image?: any;
}

// This is a Server Component by default, capable of async data fetching
export default async function LineupPage() {
  const artists: Artist[] = await client.fetch(ALL_ARTISTS_QUERY);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="font-heading text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16 text-brand-white">
        Full Lineup
      </h1>

      {/* Grid layout for the lineup */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {artists.map((artist) => {
          const imageUrl = artist.image ? urlFor(artist.image)?.width(300).height(300).url() : null;
          const altText = artist.image?.alt || artist.name || 'Band photo';

          return (
            <div key={artist._id} className="group relative text-center bg-brand-gray/10 p-2 rounded-lg shadow-md hover:bg-brand-gray/20 transition-colors duration-200">
              <div className="relative aspect-square mb-2 overflow-hidden rounded">
                {imageUrl ? (
                  <Image 
                    src={imageUrl}
                    alt={altText}
                    fill // Use fill to make image cover the container
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" // Provide sizes hint
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized={process.env.NODE_ENV !== 'production'}
                  />
                ) : (
                  <div className="w-full h-full bg-brand-gray flex items-center justify-center">
                    <span className="text-brand-white/50 text-sm">No Image</span>
                  </div>
                )}
                {/* Link overlay - Optional: links to individual artist page */}
                {/* 
                <Link href={`/artists/${artist.slug?.current || ''}`} className="absolute inset-0 z-10">
                   <span className="sr-only">View {artist.name}</span>
                </Link> 
                */}
              </div>
              <h3 className="font-heading text-lg font-medium text-brand-white truncate" title={artist.name}>
                {artist.name}
              </h3>
              {/* Optional: Add country or other info here */}
            </div>
          );
        })}
      </div>

      {/* Handle case where no artists are found */}
      {artists.length === 0 && (
        <p className="text-center text-brand-gray text-lg mt-12">Lineup coming soon!</p>
      )}
    </div>
  );
}

// Optional: Add metadata specific to the Lineup page
// export const metadata = {
//   title: 'Lineup - ShatterFest 2025',
//   description: 'Check out the full lineup for ShatterFest 2025 in Bucharest.',
// }; 