import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Hotel } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";
import VenueCard from "@/components/VenueCard";
import VenueDetail from "@/components/VenueDetail";
import HeroToggle from "@/components/HeroToggle";
import type { Destination } from "@/data/destinations";
import bgSwitzerland from "@/assets/bg-switzerland.jpg";

const Index = () => {
  const [activeRegion, setActiveRegion] = useState<"india" | "abroad">("india");
  const [selectedVenue, setSelectedVenue] = useState<Destination | null>(null);

  const filteredDestinations = useMemo(
    () => destinations.filter((d) => d.region === activeRegion),
    [activeRegion]
  );

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgSwitzerland})` }}
      />
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 z-0 bg-background/80 backdrop-blur-[2px]" />
      {/* All content above background */}
      <div className="relative z-10">
      {/* Hero */}
      <header className="relative py-16 md:py-24 text-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, hsl(185 100% 50% / 0.3), transparent 70%)" }}
          />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, hsl(280 99% 53% / 0.4), transparent 70%)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 container mx-auto px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="text-neon-cyan" size={28} />
            <span className="font-display text-sm font-bold tracking-[0.3em] uppercase text-neon-cyan">
              Neon Explorer
            </span>
            <Sparkles className="text-neon-purple" size={20} />
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-4 leading-tight">
            Discover the{" "}
            <span className="neon-text-cyan">Extraordinary</span>
          </h1>

          <p className="text-text-dim font-body text-base md:text-lg max-w-2xl mx-auto mb-10">
            Explore breathtaking destinations across India and around the world.
            Click any venue to uncover must-visit spots and send us your enquiry.
          </p>

          <HeroToggle activeRegion={activeRegion} onToggle={setActiveRegion} />

          <div className="mt-6 flex flex-col items-center gap-3">
            <span className="text-sm text-text-dim font-body">
              {filteredDestinations.length} destinations to explore
            </span>
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-display font-bold text-sm hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)] transition-all duration-300"
            >
              <Hotel size={16} />
              Hotels & Itinerary Map
            </Link>
          </div>
        </motion.div>
      </header>

      {/* Venue Grid */}
      <main className="container mx-auto px-4 pb-20">
        <motion.div
          key={activeRegion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredDestinations.map((dest, i) => (
            <VenueCard
              key={dest.id}
              destination={dest}
              onClick={() => setSelectedVenue(dest)}
              index={i}
            />
          ))}
        </motion.div>
      </main>

      {/* Detail Overlay */}
      <VenueDetail
        destination={selectedVenue}
        onClose={() => setSelectedVenue(null)}
      />

      {/* Footer */}
      <footer className="border-t border-neon-cyan/10 py-8 text-center">
        <p className="text-text-dim text-sm font-body">
          © 2026 <span className="neon-text-cyan font-display font-bold">Neon Explorer</span> — Your Gateway to Extraordinary Travel
        </p>
      </footer>
      </div>
    </div>
  );
};

export default Index;
