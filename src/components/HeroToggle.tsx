import { motion } from "framer-motion";

interface HeroToggleProps {
  activeRegion: "india" | "abroad";
  onToggle: (region: "india" | "abroad") => void;
}

const HeroToggle = ({ activeRegion, onToggle }: HeroToggleProps) => {
  return (
    <div className="relative inline-flex rounded-full p-1 bg-muted/50 neon-border">
      <motion.div
        className="absolute top-1 bottom-1 rounded-full bg-neon-cyan/20 neon-glow-cyan"
        initial={false}
        animate={{
          left: activeRegion === "india" ? "4px" : "50%",
          width: "calc(50% - 4px)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <button
        onClick={() => onToggle("india")}
        className={`relative z-10 px-8 py-3 rounded-full font-display font-bold text-sm transition-colors duration-300 ${
          activeRegion === "india" ? "text-neon-cyan" : "text-text-dim hover:text-foreground"
        }`}
      >
        🇮🇳 Domestic — India
      </button>
      <button
        onClick={() => onToggle("abroad")}
        className={`relative z-10 px-8 py-3 rounded-full font-display font-bold text-sm transition-colors duration-300 ${
          activeRegion === "abroad" ? "text-neon-cyan" : "text-text-dim hover:text-foreground"
        }`}
      >
        🌍 International — Abroad
      </button>
    </div>
  );
};

export default HeroToggle;
