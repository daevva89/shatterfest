'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
// Note: Direct import from next.config might be tricky depending on setup.
// If this fails, we'll need to pass locales as props or define them elsewhere.
// import { i18n } from '../../next.config.mjs' 
import React, { useState, useEffect, useRef } from 'react'

// Define i18n config directly within LanguageSwitcher
const i18nConfig = {
  locales: ['en', 'ro'] as const,
  defaultLocale: 'en' as const,
};

// Define Locale type based on the local config
type Locale = (typeof i18nConfig)['locales'][number];

export default function LanguageSwitcher() {
  const pathName = usePathname()
  const params = useParams(); // Get params including locale
  const currentLocale = params.locale as Locale; // Use locally defined Locale

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for detecting outside clicks

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    // Pathname includes the current locale, so we need to replace it
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/') || '/' // Ensure root path works
  }

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-md border bg-transparent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-gray/20 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-black"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {currentLocale?.toUpperCase() || '--'}
        <svg className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-brand-gray shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {i18nConfig.locales.map((locale) => (
              <Link
                key={locale}
                href={redirectedPathName(locale)}
                className={`block px-4 py-2 text-sm font-medium transition-colors ${ 
                  currentLocale === locale 
                  ? 'bg-brand-orange text-brand-white cursor-default' 
                  : 'text-brand-white/80 hover:bg-brand-gray/50 hover:text-white'
                }`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                aria-current={currentLocale === locale ? 'page' : undefined}
              >
                {locale.toUpperCase()} 
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 