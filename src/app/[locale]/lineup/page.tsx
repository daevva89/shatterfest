import React from 'react';
// import { client, urlFor } from '@/sanity/lib/client'; // Client no longer needed directly
// import type { SanityDocument } from 'next-sanity'; // Likely not needed if Artist type is used
import ArtistGrid from '@/components/ArtistGrid';
import { getAllArtists, Artist } from '@/lib/sanity'; // Import new function and type
import { Metadata } from 'next'; // Import Metadata if not already present
import { getDictionary } from '@/lib/dictionaries'; // Import the dictionary helper

// Define Locale type locally for params
type Locale = 'en' | 'ro';

// GROQ query to fetch all artists - REMOVE (moved to sanity.ts)
// const ALL_ARTISTS_QUERY = `...`;

// Define the Artist type - REMOVE (imported from sanity.ts)
// export interface Artist extends SanityDocument { ... }

// Update component signature to accept params
export default async function LineupPage({ params }: { params: { locale: Locale } }) {
  // Fetch dictionary based on locale
  const dict = await getDictionary(params.locale);

  // Fetch artists using the locale
  const allArtists: Artist[] = await getAllArtists(params.locale);

  // Filter artists by day (excluding TBC for this display)
  const fridayArtists = allArtists.filter(artist => artist.day === 'friday');
  const saturdayArtists = allArtists.filter(artist => artist.day === 'saturday');

  return (
    <div className="container mx-auto px-4 py-4 md:py-12 lg:py-16">
      <h1 className="font-heading text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16 text-brand-white">
        {dict.lineupPage.title}
      </h1>

      {/* Main container for the two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        
        {/* Friday Column */}
        <section>
          <h2 className="font-heading text-4xl font-bold text-center mb-8 text-brand-orange">
            {dict.lineupPage.friday}
          </h2>
          {fridayArtists.length > 0 ? (
            <ArtistGrid artists={fridayArtists} />
          ) : (
            <p className="text-center text-brand-gray">{dict.lineupPage.comingSoonFriday}</p>
          )}
        </section>

        {/* Saturday Column */}
        <section>
          <h2 className="font-heading text-4xl font-bold text-center mb-8 text-brand-orange">
            {dict.lineupPage.saturday}
          </h2>
          {saturdayArtists.length > 0 ? (
            <ArtistGrid artists={saturdayArtists} />
          ) : (
            <p className="text-center text-brand-gray">{dict.lineupPage.comingSoonSaturday}</p>
          )}
        </section>

      </div>

      {/* Handle case where no artists are assigned to Friday/Saturday */}
      {fridayArtists.length === 0 && saturdayArtists.length === 0 && (
        <p className="text-center text-brand-gray text-lg mt-12">{dict.lineupPage.comingSoonFull}</p>
      )}
    </div>
  );
}

// Update metadata function to use the dictionary
export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return {
    title: dict.lineupPage.title,
    description: dict.lineupPage.description,
  };
} 