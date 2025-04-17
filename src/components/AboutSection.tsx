import React from 'react';
import { PortableText } from '@portabletext/react';
import type { PortableTextReactComponents } from '@portabletext/react';

interface AboutSectionProps {
  title: string;
  content: any; // Sanity's rich text content
}

// Custom components for the Portable Text renderer
const portableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    strong: ({children}) => <span className="font-bold text-brand-orange">{children}</span>,
  },
  block: {
    normal: ({children}) => <p className="text-lg md:text-xl text-brand-white/90 mb-4 leading-relaxed">{children}</p>,
  },
};

const AboutSection = ({ title, content }: AboutSectionProps) => {
  console.log("About section rendering with:", { title, content });
  
  return (
    <section className="py-4 md:py-16 lg:py-24 bg-brand-gray/5"> {/* Light gray background to separate */}
      <div className="container mx-auto px-6 md:px-4 max-w-3xl text-center"> {/* Max width for readability */}
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-brand-white">
          {title}
        </h2>
        
        {/* Render Sanity content using PortableText */}
        <div className="text-lg md:text-xl text-brand-white/90 leading-relaxed">
          {content && Array.isArray(content) ? (
            <PortableText 
              value={content} 
              components={portableTextComponents}
            />
          ) : (
            <p className="text-brand-orange">Content is being loaded...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 