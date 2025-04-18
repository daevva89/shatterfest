"use client";

import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { 
  SparklesIcon, 
  GlobeAltIcon, 
  MusicalNoteIcon, 
  XMarkIcon,
  LinkIcon,
  PlayCircleIcon 
} from '@heroicons/react/24/outline';

// Define the artist type
interface Artist {
  _id: string;
  name?: string;
  slug?: { current?: string };
  image?: any;
  country?: string;
  position?: number;
  day?: 'friday' | 'saturday' | string;
  bio?: string;
  musicLinks?: {
    platform: string;
    url: string;
  }[];
}

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
}

// Platform Icon component
const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconClass = "w-5 h-5";
  
  switch (platform.toLowerCase()) {
    case 'spotify':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#FF0000">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          <path d="M16.671 15.564l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.513V4.996s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.672H7.078v3.47h3.047v8.385c.61.088 1.234.138 1.87.138.644 0 1.276-.051 1.895-.141v-8.382h2.782z" fill="#FFFFFF"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <defs>
            <radialGradient id="instaGradient" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#FFDD55" />
              <stop offset="50%" stopColor="#FF543E" />
              <stop offset="100%" stopColor="#C837AB" />
            </radialGradient>
          </defs>
          <path fill="url(#instaGradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#000000">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      );
    case 'bandcamp':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#629AA9">
          <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
        </svg>
      );
    case 'website':
      return <GlobeAltIcon className={`${iconClass} text-blue-400`} />;
    default:
      return <LinkIcon className={`${iconClass} text-gray-400`} />;
  }
};

const ArtistModal: React.FC<ArtistModalProps> = ({ artist, onClose }) => {
  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on ESC key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!artist) return null;

  const imageUrl = artist.image ? urlFor(artist.image)?.width(500).height(500).url() : null;
  const altText = artist.image?.alt || artist.name || 'Band photo';
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-brand-gray w-full max-w-2xl rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white/80 hover:text-white z-10"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="flex flex-col">
                {/* Square artist image */}
                <div className="w-full pb-[100%] relative bg-brand-gray/30 rounded-lg overflow-hidden">
                  {imageUrl ? (
                    <Image 
                      src={imageUrl}
                      alt={altText}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized={process.env.NODE_ENV !== 'production'}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-brand-white/50">No Image</span>
                    </div>
                  )}
                </div>
                
                {/* Listen & Follow section */}
                {artist.musicLinks && artist.musicLinks.length > 0 && (
                  <div className="w-full mt-4">
                    <h3 className="text-lg font-heading font-bold text-brand-white mb-2">
                      Listen & Follow
                    </h3>
                    {/* Grid on mobile (3 columns), Stack on desktop */}
                    <div className="grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-2">
                      {artist.musicLinks.map((link, index) => (
                        <a 
                          key={index} 
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-start px-2 py-1.5 rounded-lg bg-brand-gray/20 text-brand-white hover:bg-brand-gray/40 transition-colors text-sm md:text-base truncate"
                        >
                          <span className="mr-1.5 md:mr-2 flex-shrink-0">
                            <PlatformIcon platform={link.platform} />
                          </span>
                          <span className="capitalize truncate">{link.platform}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Artist details */}
            <div className="w-full md:w-2/3">
              <h2 className="font-heading text-3xl font-bold text-brand-white mb-2">
                {artist.name}
              </h2>
              
              {/* Quick info - country, day */}
              <div className="flex flex-wrap gap-4 mb-4">
                {artist.country && (
                  <div className="flex items-center text-brand-white/80">
                    <GlobeAltIcon className="w-5 h-5 mr-1 text-brand-green" />
                    <span>{artist.country}</span>
                  </div>
                )}
                
                {artist.day && (
                  <div className="flex items-center text-brand-white/80">
                    <SparklesIcon className="w-5 h-5 mr-1 text-brand-orange" />
                    <span className="capitalize">{artist.day}</span>
                  </div>
                )}
                
                {artist.position === 1 && (
                  <div className="flex items-center text-brand-white/80">
                    <MusicalNoteIcon className="w-5 h-5 mr-1 text-brand-green" />
                    <span>Headliner</span>
                  </div>
                )}
              </div>
              
              {/* Bio */}
              {artist.bio && (
                <div>
                  <p className="text-brand-white/90 whitespace-pre-wrap">{artist.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistModal; 