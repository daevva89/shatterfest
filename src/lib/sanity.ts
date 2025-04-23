import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
// import { Locale } from '@/config/i18n'; // Remove import

// Define Locale type directly
type Locale = 'en' | 'ro';

// Define types for site settings
export interface SiteSettings {
  title?: string;
  description?: string;
  logo?: {
    url: string;
    alt?: string;
  };
  ticketUrl?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  ogImage?: {
    url: string;
  };
}

// Query to get site settings
export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  "logo": logo{
    "url": asset->url,
    "alt": alt
  },
  ticketUrl,
  socialLinks,
  "ogImage": ogImage{
    "url": asset->url
  }
}`;

// Function to fetch site settings data
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY);
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// === Homepage Data ===

// Define type for Homepage based on schema
// Define a simple Artist type for the reference expansion
interface FeaturedArtist {
  _id: string;
  name?: string;
  slug?: { current?: string };
  image?: { url?: string; alt?: string };
  country?: string;
  // Add other fields if needed by LineupHighlights
}

export interface Homepage {
  _type: 'homepage';
  language?: Locale;
  heroImage?: { url: string; alt?: string };
  mobileHeroImage?: { url: string; alt?: string };
  primaryCTA?: {
    text?: string;
    url?: string;
    priceInfo?: string;
    isEnabled?: boolean;
  };
  introTitle?: string;
  introText?: any[]; // Portable Text needs specific typing if handled deeply
  quickInfoTitle?: string;
  quickInfoItems?: { _key: string; title?: string; description?: string; iconType?: string }[];
  lineupHighlightsTitle?: string;
  // Update featuredArtists type to use the expanded structure
  featuredArtists?: FeaturedArtist[]; 
  pageTitle?: string;
  pageDescription?: string;
}

// Query to get homepage data for a specific locale
export const HOMEPAGE_QUERY = groq`*[_type == "homepage" && language == $locale][0]{
  _type,
  language,
  "heroImage": heroImage{
    "url": asset->url,
    alt
  },
  "mobileHeroImage": mobileHeroImage{
    "url": asset->url,
    alt
  },
  primaryCTA,
  introTitle,
  introText,
  quickInfoTitle,
  quickInfoItems,
  lineupHighlightsTitle,
  // Expand the featuredArtists references
  featuredArtists[]->{
    _id,
    name,
    slug,
    country,
    "image": image.asset->{ url, alt }
    // Add other fields if needed
  },
  pageTitle,
  pageDescription
}`;

// Function to fetch homepage data for a specific locale
export async function getHomepageData(locale: Locale): Promise<Homepage | null> {
  if (!locale) {
    console.warn('Locale is required to fetch homepage data.');
    return null;
  }
  try {
    // Ensure client is configured for perspective: 'published' if needed
    const data = await client.fetch<Homepage>(HOMEPAGE_QUERY, { locale }); 
    return data;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}

// === Artist Data ===

// Define type for Artist based on schema and usage
export interface Artist {
  _id: string;
  _type: 'artist';
  language?: Locale;
  name?: string;
  slug?: { current?: string };
  image?: any; // Keep as any for now, or define image type more strictly if needed
  country?: string;
  position?: number;
  day?: 'friday' | 'saturday' | string;
  bio?: string;
  musicLinks?: {
    _key: string;
    platform: string;
    url: string;
  }[];
}

// Query to get all artists for a specific locale, ordered by position/name
export const ALL_ARTISTS_QUERY = groq`*[_type == "artist" && language == $locale] | order(coalesce(position, 1000), name asc){
  _id,
  _type,
  language,
  name,
  slug,
  image,
  country,
  position,
  day,
  bio,
  musicLinks
}`;

// Function to fetch all artists for a specific locale
export async function getAllArtists(locale: Locale): Promise<Artist[]> {
  if (!locale) {
    console.warn('Locale is required to fetch artists data.');
    return [];
  }
  try {
    const artists = await client.fetch<Artist[]>(ALL_ARTISTS_QUERY, { locale });
    return artists || []; // Return empty array if fetch returns null/undefined
  } catch (error) {
    console.error('Error fetching all artists:', error);
    return [];
  }
} 