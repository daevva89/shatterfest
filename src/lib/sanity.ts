import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

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