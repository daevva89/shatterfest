import React from 'react';
import { CalendarDaysIcon, MapPinIcon, TicketIcon, UsersIcon } from '@heroicons/react/24/outline'; // Or use react-icons if preferred

const infoItems = [
  {
    icon: CalendarDaysIcon,
    text: 'May 23-24, 2025',
    label: 'Date',
  },
  {
    icon: MapPinIcon,
    text: 'Quantic Club, Bucharest',
    label: 'Location',
  },
  {
    icon: UsersIcon, // Using UsersIcon as a proxy for 'bands'
    text: '12+ Bands', // Update number as needed
    label: 'Lineup Size',
  },
  {
    icon: TicketIcon,
    text: 'Tickets Available Now',
    label: 'Tickets Status',
  },
];

const QuickInfoSection = () => {
  return (
    <section className="bg-brand-gray/10 py-8 md:py-12"> {/* Subtle background */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {infoItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.label} className="flex flex-col items-center">
                <IconComponent className="h-8 w-8 md:h-10 md:w-10 mb-3 text-brand-green" aria-hidden="true" />
                <p className="text-md md:text-lg font-semibold text-brand-white">{item.text}</p>
                {/* Optional: Add label below text */}
                {/* <p className="text-sm text-brand-gray">{item.label}</p> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickInfoSection; 