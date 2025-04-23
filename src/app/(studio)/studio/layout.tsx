import React from 'react';
import { Roboto, Oswald } from 'next/font/google';
// Re-export metadata and viewport from the Sanity Studio package
export { metadata, viewport } from 'next-sanity/studio';

// Configure Roboto (Body Font)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

// Configure Oswald (Heading Font)
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// Define the layout component for the Studio route
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${oswald.variable}`}>
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
} 