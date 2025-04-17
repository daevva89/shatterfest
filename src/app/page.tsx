import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LineupHighlights from "@/components/LineupHighlights";
import QuickInfoSection from "@/components/QuickInfoSection";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

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
  featuredArtists?: {
    _id: string;
    name: string;
    country?: string;
    image?: {
      url: string;
      alt?: string;
    };
  }[];
}

async function getData(): Promise<HomepageData | null> {
  try {
    // GROQ query to get the homepage data
    const query = groq`*[_type == "homepage"][0]{
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
      "featuredArtists": featuredArtists[]->{
        _id,
        name,
        country,
        "image": image{
          "url": asset->url,
          "alt": alt
        }
      }
    }`;
    
    // Fetch data from Sanity
    const data = await client.fetch<HomepageData>(query);
    return data;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}

export default async function Home() {
  // Get homepage data
  const homepageData = await getData();
  
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
      
      {/* Only render LineupHighlights if data exists */}
      {homepageData?.lineupHighlightsTitle && homepageData?.featuredArtists && 
       homepageData.featuredArtists.length > 0 && (
        <LineupHighlights 
          title={homepageData.lineupHighlightsTitle}
          artists={homepageData.featuredArtists}
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
