import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Configure Roboto (Body Font)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular and Bold
  variable: "--font-roboto", // Assign to CSS variable
  display: "swap", // Use swap for font display strategy
});

// Configure Oswald (Heading Font)
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "700"], // Medium and Bold
  variable: "--font-oswald", // Assign to CSS variable
  display: "swap",
});

// Default metadata as fallback
const defaultMetadata = {
  title: "Shatterfest - Official Website",
  description: "The heaviest festival on the planet.",
};

// Generate metadata from Sanity
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch SEO settings from Sanity
    const query = groq`*[_type == "homepage"][0].seo {
      metaTitle,
      metaDescription,
      "shareImage": shareImage.asset->url
    }`;
    
    const seoData = await client.fetch(query);
    
    if (!seoData || !seoData.metaTitle) {
      return defaultMetadata;
    }
    
    return {
      title: seoData.metaTitle,
      description: seoData.metaDescription || defaultMetadata.description,
      openGraph: seoData.shareImage ? {
        images: [seoData.shareImage],
      } : undefined,
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return defaultMetadata;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${oswald.variable}`}>
      <body className={`font-sans bg-brand-black text-brand-white flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
