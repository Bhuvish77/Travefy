import { motion } from "framer-motion";
import type { Destination } from "@/data/destinations";

interface VenueCardProps {
  destination: Destination;
  onClick: () => void;
  index: number;
}

const VenueCard = ({ destination, onClick, index }: VenueCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3 },
      }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-lg overflow-hidden neon-border bg-card"
    >
      {/* Neon glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"
        style={{
          boxShadow: "0 0 20px hsl(185 100% 50% / 0.3), 0 0 40px hsl(185 100% 50% / 0.15), inset 0 0 20px hsl(185 100% 50% / 0.05)",
        }}
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-foreground group-hover:neon-text-cyan transition-all duration-300">
          {destination.name}
        </h3>
        <p className="text-sm text-text-dim mt-1 font-body italic">
          {destination.tagline}
        </p>
        <p className="text-xs text-text-dim mt-3 line-clamp-2 font-body">
          {destination.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-body">
          <span className="text-neon-cyan">Explore</span>
          <span className="text-neon-cyan group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VenueCard;
