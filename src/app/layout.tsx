import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "Shatterfest - Official Website",
  description: "The heaviest festival on the planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${oswald.variable}`}>
      <body className={`font-sans bg-brand-black text-brand-white flex flex-col min-h-screen`}>
        <Header />
        <main className="container mx-auto p-4 pt-20 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
