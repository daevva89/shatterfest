import React from 'react';
// Re-export metadata and viewport from the layout file
export { metadata, viewport } from 'next-sanity/studio';

// Define the layout component for the Studio route
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Basic layout that just renders the page children
  // You could add specific layout elements for the studio here if needed,
  // but usually it's just the <NextStudio /> component itself.
  return <>{children}</>; 
} 