import React from 'react';
import { CalendarDaysIcon, MapPinIcon, TicketIcon, UsersIcon, InformationCircleIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

interface InfoItem {
  title: string;
  description: string;
  iconType: string;
}

interface QuickInfoSectionProps {
  title?: string;
  infoItems: InfoItem[];
}

// Map iconType strings to actual icon components
const getIconComponent = (iconType: string) => {
  switch (iconType.toLowerCase()) {
    case 'calendar':
      return CalendarDaysIcon;
    case 'location':
      return MapPinIcon;
    case 'ticket':
      return TicketIcon;
    case 'music':
      return MusicalNoteIcon;
    case 'info':
      return InformationCircleIcon;
    default:
      return InformationCircleIcon; // Default icon
  }
};

const QuickInfoSection = ({ title, infoItems }: QuickInfoSectionProps) => {
  return (
    <section className="bg-brand-gray/10 py-4 md:py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="font-heading text-3xl text-center mb-8 text-brand-white">{title}</h2>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {infoItems.map((item) => {
            const IconComponent = getIconComponent(item.iconType);
            return (
              <div key={item.title} className="flex flex-col items-center">
                <IconComponent className="h-8 w-8 md:h-10 md:w-10 mb-3 text-brand-green" aria-hidden="true" />
                <p className="text-md md:text-lg font-semibold text-brand-white">{item.title}</p>
                <p className="text-sm text-brand-white/70">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickInfoSection; 