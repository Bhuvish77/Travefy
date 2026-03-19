import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, Hotel, Star, Quote, Globe, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";
import VenueCard from "@/components/VenueCard";
import VenueDetail from "@/components/VenueDetail";
import HeroToggle from "@/components/HeroToggle";
import type { Destination } from "@/data/destinations";
import bgSwitzerland from "@/assets/bg-switzerland.jpg";

const customerReviews = [
  {
    name: "Ananya Sharma",
    location: "Mumbai, India",
    destination: "Santorini, Greece",
    rating: 5,
    review: "Neon Explorer turned our honeymoon into a fairytale. The Santorini sunset from our cliffside villa was beyond anything we imagined. Every detail was perfectly curated — from private boat tours to hidden wine tastings. Absolutely magical!",
    avatar: "AS",
  },
  {
    name: "James Mitchell",
    location: "London, UK",
    destination: "Ladakh, India",
    rating: 5,
    review: "I've traveled to 40+ countries, but Ladakh through Neon Explorer was something else entirely. The monastery stays, the Pangong Lake camping under stars — they crafted an experience no guidebook could replicate. Life-changing.",
    avatar: "JM",
  },
  {
    name: "Priya & Rohan Kapoor",
    location: "Delhi, India",
    destination: "Seychelles",
    rating: 5,
    review: "From the moment we enquired to the day we returned, the team was exceptional. Our Seychelles trip felt like a private paradise — secluded beaches, candlelit dinners on the sand, and zero stress. Can't wait for our next adventure with them!",
    avatar: "PK",
  },
  {
    name: "Mei Lin Chen",
    location: "Singapore",
    destination: "Coorg, India",
    rating: 5,
    review: "I wanted an offbeat, soul-healing retreat and they delivered Coorg like a dream. Waking up in a coffee plantation, trekking through misty hills, and the Kodava cuisine — pure bliss. Neon Explorer understands what real travel means.",
    avatar: "MC",
  },
  {
    name: "David & Sarah Thompson",
    location: "Sydney, Australia",
    destination: "Mauritius",
    rating: 5,
    review: "Our family of four had the most incredible week in Mauritius. Kid-friendly excursions, overwater villa, dolphin watching — everything was seamless. The kids are already asking when we're booking our next trip through Neon Explorer!",
    avatar: "DT",
  },
  {
    name: "Arjun Nair",
    location: "Bengaluru, India",
    destination: "Ziro Valley",
    rating: 5,
    review: "As a solo traveler, I was blown away by how Neon Explorer curated my Northeast India itinerary. Ziro Valley was surreal — the Apatani villages, the music festival vibes, the untouched landscapes. They opened a door to a world I didn't know existed in my own country.",
    avatar: "AN",
  },
];

const taglines = [
  "Where Every Journey Becomes a Story Worth Telling",
  "Curating Dreams, One Destination at a Time",
  "Your Passport to the World's Best-Kept Secrets",
];

const Index = () => {
  const [activeRegion, setActiveRegion] = useState<"india" | "abroad">("india");
  const [selectedVenue, setSelectedVenue] = useState<Destination | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);

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
      <div className="fixed inset-0 z-0 bg-background/80 backdrop-blur-[2px]" />

      <div className="relative z-10">
        {/* Hero */}
        <header className="relative py-20 md:py-32 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, hsl(185 100% 50% / 0.3), transparent 70%)" }}
            />
            <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-5"
              style={{ background: "radial-gradient(circle, hsl(280 99% 53% / 0.4), transparent 70%)" }}
            />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-5"
              style={{ background: "radial-gradient(circle, hsl(45 100% 50% / 0.3), transparent 70%)" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 container mx-auto px-4"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Compass className="text-neon-cyan" size={28} />
              <span className="font-display text-sm font-bold tracking-[0.3em] uppercase text-neon-cyan">
                Neon Explorer
              </span>
              <Sparkles className="text-neon-purple" size={20} />
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Your Dream Holiday{" "}
              <span className="neon-text-cyan">Starts Here</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-text-dim font-body text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed"
            >
              From the misty monasteries of Tawang to the sun-kissed shores of Santorini — 
              we craft journeys that transform wanderlust into unforgettable memories.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-neon-purple/70 font-display text-sm md:text-base max-w-2xl mx-auto mb-10 italic"
            >
              ✦ Handpicked destinations ✦ Personalized itineraries ✦ Hassle-free travel ✦ 24/7 support ✦
            </motion.p>

            {/* Rotating taglines */}
            <div className="h-8 mb-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglines[Math.floor(Date.now() / 4000) % taglines.length]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-neon-cyan/60 font-body text-sm tracking-wide"
                >
                  {taglines[Math.floor(Date.now() / 4000) % taglines.length]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10"
            >
              {[
                { icon: Globe, value: "50+", label: "Destinations" },
                { icon: Heart, value: "10K+", label: "Happy Travelers" },
                { icon: Star, value: "4.9★", label: "Average Rating" },
                { icon: MapPin, value: "28+", label: "Luxury Hotels" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex flex-col items-center gap-1"
                >
                  <stat.icon size={18} className="text-neon-cyan/60" />
                  <span className="font-display text-xl font-extrabold text-foreground">{stat.value}</span>
                  <span className="text-xs text-text-dim font-body">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

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

        {/* Customer Reviews Section */}
        <section className="container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="text-neon-cyan fill-neon-cyan" size={20} />
              <span className="font-display text-sm font-bold tracking-[0.2em] uppercase text-neon-cyan">
                Traveler Stories
              </span>
              <Star className="text-neon-cyan fill-neon-cyan" size={20} />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4">
              What Our <span className="neon-text-purple">Explorers</span> Say
            </h2>
            <p className="text-text-dim font-body max-w-2xl mx-auto">
              Real stories from real travelers who trusted us with their dream holidays.
              Every review is a journey we're proud to have been part of.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerReviews.slice(0, visibleReviews).map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 rounded-xl bg-card neon-border group hover:neon-glow-cyan transition-all duration-500"
              >
                <Quote size={32} className="text-neon-cyan/15 absolute top-4 right-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, si) => (
                    <Star key={si} size={14} className="text-neon-cyan fill-neon-cyan" />
                  ))}
                </div>

                <p className="text-text-dim font-body text-sm leading-relaxed mb-5 line-clamp-5">
                  "{review.review}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-neon-cyan/10">
                  <div className="w-10 h-10 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan font-display font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-sm">{review.name}</p>
                    <p className="text-text-dim text-xs font-body">{review.location}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs text-neon-purple/70 font-body italic">{review.destination}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleReviews < customerReviews.length && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <button
                onClick={() => setVisibleReviews(customerReviews.length)}
                className="px-8 py-3 rounded-full bg-accent/10 border border-accent/30 text-accent font-display font-bold text-sm hover:bg-accent/20 hover:neon-glow-purple transition-all duration-300"
              >
                Read More Stories
              </button>
            </motion.div>
          )}
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden neon-border p-10 md:p-16 text-center bg-card"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20"
              style={{ background: "radial-gradient(ellipse at center, hsl(185 100% 50% / 0.2), transparent 70%)" }}
            />
            <h2 className="relative font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Ready to Write Your <span className="neon-text-cyan">Travel Story</span>?
            </h2>
            <p className="relative text-text-dim font-body max-w-xl mx-auto mb-8">
              Whether it's a solo soul-searching adventure, a romantic getaway, or a family expedition — 
              click on any destination above and let us craft your perfect journey.
            </p>
            <div className="relative flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-8 py-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-display font-bold text-sm hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_hsl(185_100%_50%/0.3)] transition-all duration-300"
              >
                Explore Destinations
              </button>
              <Link
                to="/hotels"
                className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-display font-bold text-sm hover:neon-glow-purple hover:brightness-110 transition-all duration-300"
              >
                Browse Luxury Hotels
              </Link>
            </div>
          </motion.div>
        </section>

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
