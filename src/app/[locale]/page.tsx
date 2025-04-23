import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LineupHighlights from "@/components/LineupHighlights";
import QuickInfoSection from "@/components/QuickInfoSection";
import { Metadata } from "next";
// import { Locale } from "@/config/i18n"; // Remove import
import { getHomepageData, Homepage } from "@/lib/sanity"; 
// import { type Artist } from './lineup/page'; // Remove this line

// Define Locale type directly
type Locale = 'en' | 'ro';

// Define a compatible type locally based on LineupHighlights requirements
// (Matches FeaturedArtist structure but with required fields for the component)
type LineupArtist = {
  _id: string;
  name: string; // Required
  slug?: { current: string }; // Required if slug exists
  image?: { url: string; alt?: string }; // Required if image exists
  country?: string; // Add optional country
  // Add other fields matching ArtistData if necessary
};

// Helper function to randomly select N items from an array - REMOVE
/* // Comment out or remove if not used for featured artists
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
*/

// Generate metadata for the homepage - Update signature and fetching
export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  // Fetch data using the locale
  const homepageData = await getHomepageData(params.locale);
  
  // If no homepage data, return empty object
  if (!homepageData) {
    return {};
  }
  
  // Use fetched data - property names might differ slightly from old HomepageData
  return {
    title: homepageData.pageTitle || undefined, 
    description: homepageData.pageDescription || undefined,
    // Add openGraph etc. if needed, using homepageData properties
  };
}

// Update component signature to accept params
export default async function Home({ params }: { params: { locale: Locale } }) {
  // Get homepage data using the locale
  const homepageData = await getHomepageData(params.locale);
  
  // Handle case where data for the specific locale might be missing
  if (!homepageData) {
    return (
      <div className="container mx-auto p-12 text-center">
        <h1 className="text-4xl font-heading text-brand-orange mb-4">Welcome / Bun venit</h1>
        <p className="text-xl text-brand-white">
          {/* Basic fallback message - could be localized later */}
          Homepage content for the selected language ({params.locale.toUpperCase()}) is not available yet.
        </p>
      </div>
    );
  }

  // TODO: Artist fetching needs to be adapted for locale as well - DONE via query expansion
  // If HOMEPAGE_QUERY doesn't expand featuredArtists, this won't work directly.
  // You might need to query artists separately using the locale.
  // const featuredArtistsData = []; // Remove placeholder
  
  // Filter quick info items to ensure required fields are present for the component
  const validQuickInfoItems = homepageData.quickInfoItems?.filter(
    item => typeof item.title === 'string' && typeof item.description === 'string' && typeof item.iconType === 'string'
  ) as { title: string; description: string; iconType: string; _key: string; }[] ?? []; // Type assertion after filtering
  
  // Prepare valid CTA data if it exists and meets Hero component requirements
  let validPrimaryCTA: { text: string; url: string; isEnabled: boolean; priceInfo?: string } | undefined = undefined;
  if (
    homepageData.primaryCTA &&
    typeof homepageData.primaryCTA.text === 'string' &&
    typeof homepageData.primaryCTA.url === 'string' &&
    typeof homepageData.primaryCTA.isEnabled === 'boolean'
  ) {
    validPrimaryCTA = {
      text: homepageData.primaryCTA.text,
      url: homepageData.primaryCTA.url,
      isEnabled: homepageData.primaryCTA.isEnabled,
      priceInfo: homepageData.primaryCTA.priceInfo, // Keep optional field
    };
  }

  // Filter featured artists and assert type for LineupHighlights
  const validFeaturedArtists = homepageData.featuredArtists?.filter(
    // Use type predicate with the locally defined LineupArtist type
    (artist): artist is LineupArtist => 
      typeof artist?.name === 'string' &&
      // Ensure nested properties exist AND have the correct type
      (artist.slug ? typeof artist.slug.current === 'string' : true) && 
      (artist.image ? typeof artist.image.url === 'string' : true)
      // Add other checks if LineupHighlights requires more non-optional fields
  ) ?? [];

  return (
    <main>
      {/* Render Hero using fetched data, pass validated CTA */}
      {(homepageData?.heroImage?.url || validPrimaryCTA?.isEnabled) && (
        <Hero 
          imageUrl={homepageData.heroImage?.url}
          mobileImageUrl={homepageData.mobileHeroImage?.url}
          imageAlt={homepageData.heroImage?.alt || "ShatterFest Hero Image"}
          primaryCTA={validPrimaryCTA} // Pass the validated CTA object or undefined
        />
      )}
      
      {/* Render AboutSection using fetched data */} 
      {homepageData?.introTitle && homepageData?.introText && (
        <AboutSection 
          title={homepageData.introTitle}
          content={homepageData.introText}
        />
      )}
      
      {/* Render LineupHighlights using filtered featuredArtists */}
      {homepageData?.lineupHighlightsTitle && validFeaturedArtists.length > 0 && (
        <LineupHighlights 
          title={homepageData.lineupHighlightsTitle}
          artists={validFeaturedArtists} // Pass filtered artists
        />
      )}
      
      {/* Render QuickInfoSection using filtered data */} 
      {homepageData?.quickInfoTitle && validQuickInfoItems.length > 0 && (
        <QuickInfoSection 
          title={homepageData.quickInfoTitle}
          infoItems={validQuickInfoItems} // Pass the filtered array
        />
      )}

    </main>
  );
}
