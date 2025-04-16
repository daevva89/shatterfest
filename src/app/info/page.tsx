import React from 'react';
import Link from 'next/link';
import { MapPinIcon, TicketIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // Example icons

// Helper component for section titles
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-brand-orange border-l-4 border-brand-orange pl-4">
    {children}
  </h2>
);

export default function InfoPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 text-brand-white/90">
      <h1 className="font-heading text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16 text-brand-white">
        Practical Info
      </h1>

      {/* Grid for layout, maybe 2 columns on desktop? */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Column 1: Venue & Getting There */}
        <div className="lg:col-span-2 space-y-12">
          {/* Venue Section */}
          <section>
            <SectionTitle>Venue: Quantic Club</SectionTitle>
            <p className="mb-2 text-lg">
              Address: <span className="font-semibold">Șoseaua Grozăvești 82, București 060752, Romania</span>
            </p>
            <p className="mb-4 text-lg">
              An indoor club venue perfect for intense shows.
            </p>
            <h3 className="font-heading text-xl font-semibold mb-2 text-brand-white">Amenities:</h3>
            <ul className="list-disc list-inside space-y-1 text-lg mb-6">
              <li>On-site Restaurant</li>
              <li>Multiple Bars</li>
              <li>Band Merch Area</li>
              <li>Large Outdoor Terrace</li>
              <li>Restrooms</li>
            </ul>
            
            {/* Map Placeholder & Link */}
            <div className="mb-4">
              <a 
                href="https://maps.app.goo.gl/x7Y3XwGq5GZz8fCf8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-brand-green hover:text-brand-orange transition-colors font-semibold text-lg"
              >
                <MapPinIcon className="h-5 w-5 mr-2" />
                View on Google Maps
              </a>
              {/* TODO: Embed Google Map iframe here later if desired */}
              {/* <iframe src="YOUR_EMBED_URL" width="100%" height="450" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
          </section>

          {/* Getting There Section */}
          <section>
            <SectionTitle>Getting There</SectionTitle>
            <h3 className="font-heading text-xl font-semibold mb-2 text-brand-white">Public Transport:</h3>
            <p className="mb-4 text-lg">
              The nearest Metro station is <span className="font-semibold">Grozăvești</span> (M1 line), a short walk from the venue. Check local bus routes for additional options.
            </p>
            <h3 className="font-heading text-xl font-semibold mb-2 text-brand-white">Parking:</h3>
            <p className="text-lg">
              Free parking is available near the venue, but space may be limited. Arrive early if driving.
            </p>
          </section>
        </div>

        {/* Column 2: Accommodation & Rules */}
        <div className="lg:col-span-1 space-y-12">
          {/* Accommodation Section */}
          <section>
            <SectionTitle>Accommodation</SectionTitle>
            <p className="mb-4 text-lg">
              Bucharest offers plenty of options. We recommend searching on platforms like Booking.com, Airbnb, or checking hotels near the Grozăvești area.
            </p>
            {/* Example nearby hotels - use with caution or remove if preferred */}
            {/* <p className="mb-4 text-lg">Examples nearby: Orhideea Residence & Spa, Ambiance Hotel.</p> */}
            <a 
              href="https://www.google.com/maps/search/hotels+near+Quantic+Club+Bucharest" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-brand-green hover:text-brand-orange transition-colors font-semibold text-lg"
            >
              <MapPinIcon className="h-5 w-5 mr-2" />
              Search Hotels Nearby
            </a>
          </section>

          {/* Rules Section */}
          <section>
            <SectionTitle>Festival Rules</SectionTitle>
            <ul className="space-y-3 text-lg">
              <li><span className="font-semibold text-brand-white">Age Limit:</span> 18+ Recommended. Minors may need guardian accompaniment (Details TBC).</li>
              <li><span className="font-semibold text-brand-white">Allowed/Prohibited Items:</span> Details coming soon.</li>
              <li><span className="font-semibold text-brand-white">Re-entry:</span> Policy details coming soon.</li>
              <li><span className="font-semibold text-brand-white">Safety & Conduct:</span> Respect the venue, artists, staff, and fellow attendees. Zero tolerance for harassment or violence.</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
}

// Optional: Add metadata specific to the Info page
export const metadata = {
  title: 'Practical Info - ShatterFest 2025',
  description: 'Find venue details, travel info, accommodation suggestions, and festival rules for ShatterFest 2025.',
}; 