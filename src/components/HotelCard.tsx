import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, Wifi, UtensilsCrossed, Waves, Car, Dumbbell, Sparkles } from "lucide-react";
import type { Hotel } from "@/data/hotels";

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi size={14} />,
  "Restaurant": <UtensilsCrossed size={14} />,
  "Fine Dining": <UtensilsCrossed size={14} />,
  "Michelin Dining": <UtensilsCrossed size={14} />,
  "Pool": <Waves size={14} />,
  "Infinity Pool": <Waves size={14} />,
  "Parking": <Car size={14} />,
  "Gym": <Dumbbell size={14} />,
  "Spa": <Sparkles size={14} />,
};

interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const HotelCard = ({ hotel, isSelected, onClick, index }: HotelCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={handleClick}
      className={`group flex gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
        isSelected
          ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--neon-cyan)/0.2)]"
          : "border-border bg-card hover:border-primary/40 hover:bg-card/80"
      }`}
    >
      {/* Image */}
      <div className="relative w-28 h-28 md:w-36 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-1.5 left-1.5 bg-background/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-primary">
          {hotel.stars}★
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="font-display text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {hotel.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{hotel.destination}</p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {hotel.description}
          </p>
        </div>

        <div className="flex items-end justify-between mt-2">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-foreground">{hotel.rating}</span>
            <span className="text-[10px] text-muted-foreground">({hotel.reviews})</span>
          </div>
          {/* Price */}
          <div className="text-right">
            <span className="text-base font-display font-extrabold text-primary">
              {hotel.currency}{hotel.pricePerNight.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground block">/night</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {hotel.amenities.slice(0, 4).map((a) => (
            <span
              key={a}
              className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-full border border-border"
            >
              {amenityIcons[a] || null}
              {a}
            </span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="text-[10px] text-primary font-medium">+{hotel.amenities.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
