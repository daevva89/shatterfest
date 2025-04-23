import type { Metadata } from "next";
import React from 'react';
import { Roboto, Oswald } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';
import { getSiteSettings } from '@/lib/sanity';

// Configure Roboto (Body Font)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Regular, Medium, and Bold
  variable: "--font-roboto", // Assign to CSS variable
  display: "swap", // Use swap for font display strategy
});

// Configure Oswald (Heading Font)
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, Semi-Bold, and Bold
  variable: "--font-oswald", // Assign to CSS variable
  display: "swap",
});

// Generate metadata from Sanity
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await getSiteSettings();
    
    if (!siteSettings) {
      return {};
    }
    
    const siteTitle = siteSettings.title || '';
    
    return {
      title: {
        default: siteTitle,
        template: `${siteTitle} | %s`
      },
      description: siteSettings.description || undefined,
      openGraph: siteSettings.title || siteSettings.description || siteSettings.ogImage ? {
        title: siteSettings.title || undefined,
        description: siteSettings.description || undefined,
        images: siteSettings.ogImage ? [siteSettings.ogImage.url] : undefined,
      } : undefined,
    };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {};
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch site settings for the header
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={`${roboto.variable} ${oswald.variable}`}>
      <body className="bg-brand-black font-sans pt-16 md:pt-20">
        <Header siteSettings={siteSettings} />
        <main className="flex-grow">{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
