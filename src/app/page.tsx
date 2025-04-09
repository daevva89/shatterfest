import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LineupHighlights from "@/components/LineupHighlights";
import QuickInfoSection from "@/components/QuickInfoSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <LineupHighlights />
      <QuickInfoSection />

      {/* Placeholder for other homepage sections */}
      <div className="container mx-auto p-4">
        <h2 className="font-heading text-4xl text-center my-16 text-brand-gray">
          {/* Additional Sections Coming Soon */}
        </h2>
        {/* 
          Example sections:
          <section className="py-16">
            <h2 className="font-heading text-4xl text-center mb-8">Featured Bands</h2>
          </section>
          <section className="py-16 bg-brand-gray/10">
            <h2 className="font-heading text-4xl text-center mb-8">Festival Info</h2>
          </section>
        */}
      </div>
    </main>
  );
}
