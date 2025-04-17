import React from 'react';
import Image from 'next/image';
import { client, urlFor } from '@/sanity/lib/client';
import type { SanityDocument } from 'next-sanity';

// GROQ query to fetch all artists, ordered by name, including the 'day' field
const ALL_ARTISTS_QUERY = `*[_type == "artist"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  day
}`;

// Define the Artist type (can reuse or refine the one from LineupHighlights)
interface Artist extends SanityDocument {
  name?: string;
  slug?: { current?: string };
  image?: any;
  day?: 'friday' | 'saturday' | 'tbc' | string; // Add day to type
}

// Helper function to render a grid of artists
const ArtistGrid = ({ artists }: { artists: Artist[] }) => (
  // Grid for artists within a day column
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" // Adjusted sizes
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
);

// This is a Server Component by default, capable of async data fetching
export default async function LineupPage() {
  const allArtists: Artist[] = await client.fetch(ALL_ARTISTS_QUERY);

  // Filter artists by day (excluding TBC for this display)
  const fridayArtists = allArtists.filter(artist => artist.day === 'friday');
  const saturdayArtists = allArtists.filter(artist => artist.day === 'saturday');

  return (
    <div className="container mx-auto px-4 py-4 md:py-12 lg:py-16">
      <h1 className="font-heading text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16 text-brand-white">
        Lineup By Day
      </h1>

      {/* Main container for the two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        
        {/* Friday Column */}
        <section>
          <h2 className="font-heading text-4xl font-bold text-center mb-8 text-brand-orange">
            Friday
          </h2>
          {fridayArtists.length > 0 ? (
            <ArtistGrid artists={fridayArtists} />
          ) : (
            <p className="text-center text-brand-gray">Lineup for Friday coming soon.</p>
          )}
        </section>

        {/* Saturday Column */}
        <section>
          <h2 className="font-heading text-4xl font-bold text-center mb-8 text-brand-orange">
            Saturday
          </h2>
          {saturdayArtists.length > 0 ? (
            <ArtistGrid artists={saturdayArtists} />
          ) : (
            <p className="text-center text-brand-gray">Lineup for Saturday coming soon.</p>
          )}
        </section>

      </div>

      {/* Handle case where no artists are assigned to Friday/Saturday */}
      {fridayArtists.length === 0 && saturdayArtists.length === 0 && (
        <p className="text-center text-brand-gray text-lg mt-12">Full lineup details coming soon!</p>
      )}
    </div>
  );
}

// Add metadata specific to the Lineup page
export const metadata = {
  title: 'Lineup',
  description: 'Check out the full lineup for ShatterFest in Bucharest.',
}; 