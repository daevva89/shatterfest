import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LineupHighlights from "@/components/LineupHighlights";
import QuickInfoSection from "@/components/QuickInfoSection";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Metadata } from "next";

// Define the type for homepage data
interface HomepageData {
  heroImage?: {
    url: string;
    alt?: string;
  };
  mobileHeroImage?: {
    url: string;
    alt?: string;
  };
  primaryCTA?: {
    text: string;
    url: string;
    isEnabled: boolean;
    priceInfo?: string;
  };
  introTitle?: string;
  introText?: any; // Rich text content
  quickInfoTitle?: string;
  quickInfoItems?: {
    title: string;
    description: string;
    iconType: string;
  }[];
  lineupHighlightsTitle?: string;
  allArtists?: {
    _id: string;
    name: string;
    country?: string;
    image?: {
      url: string;
      alt?: string;
    };
  }[];
  pageTitle?: string;
  pageDescription?: string;
}

// Helper function to randomly select N items from an array
function getRandomItems<T>(array: T[], n: number): T[] {
  // Clone array to avoid modifying the original
  const shuffled = [...array];
  
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the first n elements (or less if array is smaller)
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

async function getData(): Promise<HomepageData | null> {
  try {
    // GROQ query to get the homepage data - always fetch the document with ID 'homepage'
    const homepageQuery = groq`*[_type == "homepage" && _id == "homepage"][0]{
      heroImage{
        "url": asset->url,
        "alt": alt
      },
      mobileHeroImage{
        "url": asset->url,
        "alt": alt
      },
      primaryCTA,
      introTitle,
      introText,
      quickInfoTitle,
      quickInfoItems[]{
        title,
        description,
        iconType
      },
      lineupHighlightsTitle,
      pageTitle,
      pageDescription
    }`;
    
    // GROQ query to fetch all artists
    const artistsQuery = groq`*[_type == "artist"] | order(coalesce(position, 1000), name asc) {
      _id,
      name,
      country,
      position,
      day,
      bio,
      "musicLinks": musicLinks[]{
        platform,
        url
      },
      "image": image {
        "url": asset->url,
        "alt": alt
      }
    }`;
    
    // Fetch data from Sanity
    const homepageData = await client.fetch<HomepageData>(homepageQuery);
    const allArtists = await client.fetch<any[]>(artistsQuery);
    
    // Combine the data
    return {
      ...homepageData,
      allArtists
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}

// Generate metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await getData();
  
  // If no homepage data, return empty object
  if (!homepageData) {
    return {};
  }
  
  return {
    title: homepageData.pageTitle || undefined,
    description: homepageData.pageDescription || undefined,
  };
}

export default async function Home() {
  // Get homepage data
  const homepageData = await getData();
  
  // Randomly select 4 artists (if we have artists)
  const randomArtists = homepageData?.allArtists 
    ? getRandomItems(homepageData.allArtists, 4)
    : [];
  
  return (
    <main>
      {/* Only render Hero if image or CTA exists */}
      {(homepageData?.heroImage?.url || homepageData?.primaryCTA?.isEnabled) && (
        <Hero 
          imageUrl={homepageData.heroImage?.url}
          mobileImageUrl={homepageData.mobileHeroImage?.url}
          imageAlt={homepageData.heroImage?.alt || "ShatterFest Hero Image"}
          primaryCTA={homepageData.primaryCTA}
        />
      )}
      
      {/* Only render AboutSection if data exists */}
      {homepageData?.introTitle && homepageData?.introText && (
        <AboutSection 
          title={homepageData.introTitle}
          content={homepageData.introText}
        />
      )}
      
      {/* Display random artists in LineupHighlights */}
      {homepageData?.lineupHighlightsTitle && randomArtists.length > 0 && (
        <LineupHighlights 
          title={homepageData.lineupHighlightsTitle}
          artists={randomArtists}
        />
      )}
      
      {/* Only render QuickInfoSection if data exists */}
      {homepageData?.quickInfoTitle && homepageData?.quickInfoItems && 
       homepageData.quickInfoItems.length > 0 && (
        <QuickInfoSection 
          title={homepageData.quickInfoTitle}
          infoItems={homepageData.quickInfoItems}
        />
      )}

      {/* Message when no homepage is configured yet */}
      {!homepageData && (
        <div className="container mx-auto p-12 text-center">
          <h1 className="text-4xl font-heading text-brand-orange mb-4">Welcome to ShatterFest</h1>
          <p className="text-xl text-brand-white">
            The homepage is being configured in the CMS. Please check back later or create a Homepage document in Sanity Studio.
          </p>
        </div>
      )}
    </main>
  );
}
