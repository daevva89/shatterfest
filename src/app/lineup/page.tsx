import React from 'react';
import { client, urlFor } from '@/sanity/lib/client';
import type { SanityDocument } from 'next-sanity';
import ArtistGrid from '@/components/ArtistGrid';

// GROQ query to fetch all artists, ordered by position (then name as fallback), including position field
const ALL_ARTISTS_QUERY = `*[_type == "artist"] | order(coalesce(position, 1000), name asc) {
  _id,
  name,
  slug,
  image,
  country,
  position,
  day,
  bio,
  musicLinks
}`;

// Define the Artist type 
export interface Artist extends SanityDocument {
  name?: string;
  slug?: { current?: string };
  image?: any;
  country?: string;
  position?: number;
  day?: 'friday' | 'saturday' | 'tbc' | string;
  bio?: string;
  musicLinks?: {
    platform: string;
    url: string;
  }[];
}

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