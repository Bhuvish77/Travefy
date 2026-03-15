import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Star, Send } from "lucide-react";
import { useState } from "react";
import type { Destination } from "@/data/destinations";

interface VenueDetailProps {
  destination: Destination | null;
  onClose: () => void;
}

const VenueDetail = ({ destination, onClose }: VenueDetailProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-background/90 backdrop-blur-md" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-5xl mx-4 my-8 rounded-xl overflow-hidden neon-border bg-card"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-card/80 backdrop-blur-sm neon-border text-foreground hover:text-neon-cyan transition-colors"
            >
              <X size={20} />
            </button>

            {/* Hero image */}
            <div className="relative h-72 md:h-96 overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
              <div className="absolute bottom-6 left-6">
                <h2 className="font-display text-3xl md:text-5xl font-extrabold neon-text-cyan">
                  {destination.name}
                </h2>
                <p className="text-text-dim font-body text-sm mt-1 italic">{destination.tagline}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: Info */}
              <div className="lg:col-span-3 space-y-6">
                <p className="text-text-dim font-body leading-relaxed">{destination.description}</p>

                <div className="flex flex-wrap gap-4 text-sm font-body">
                  <div className="flex items-center gap-2 text-neon-cyan">
                    <Calendar size={16} />
                    <span>Best Time: {destination.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neon-purple">
                    <Star size={16} />
                    <span>{destination.famousFor}</span>
                  </div>
                </div>

                {/* Must Visit */}
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-neon-cyan" />
                    Must-Visit Spots
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.mustVisit.map((spot, i) => (
                      <motion.div
                        key={spot}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 neon-border group hover:neon-glow-cyan transition-all duration-300"
                      >
                        <span className="w-7 h-7 rounded-full bg-neon-cyan/10 flex items-center justify-center text-xs font-bold text-neon-cyan font-display">
                          {i + 1}
                        </span>
                        <span className="text-sm font-body text-foreground">{spot}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Enquiry Form */}
              <div className="lg:col-span-2">
                <div className="sticky top-8 p-6 rounded-xl bg-muted/30 neon-border">
                  <h3 className="font-display text-lg font-bold neon-text-purple mb-4">
                    Enquire Now
                  </h3>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
                        <Send size={24} className="text-neon-cyan" />
                      </div>
                      <p className="font-display font-bold text-foreground">Thank You!</p>
                      <p className="text-text-dim text-sm mt-1 font-body">We'll get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-lg bg-input border border-neon-cyan/20 text-foreground placeholder:text-text-dim text-sm font-body focus:outline-none focus:border-neon-cyan focus:neon-glow-cyan transition-all"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 rounded-lg bg-input border border-neon-cyan/20 text-foreground placeholder:text-text-dim text-sm font-body focus:outline-none focus:border-neon-cyan focus:neon-glow-cyan transition-all"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-lg bg-input border border-neon-cyan/20 text-foreground placeholder:text-text-dim text-sm font-body focus:outline-none focus:border-neon-cyan focus:neon-glow-cyan transition-all"
                      />
                      <textarea
                        placeholder="Tell us about your dream trip..."
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 rounded-lg bg-input border border-neon-cyan/20 text-foreground placeholder:text-text-dim text-sm font-body focus:outline-none focus:border-neon-cyan focus:neon-glow-cyan transition-all resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-display font-bold text-sm hover:neon-glow-purple transition-all duration-300 hover:brightness-110"
                      >
                        Send Enquiry
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VenueDetail;
