import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Hotel as HotelIcon, Map, ArrowLeft, Plane, Car, TrainFront } from "lucide-react";
import { Link } from "react-router-dom";
import { hotels, travelRoutes } from "@/data/hotels";
import HotelCard from "@/components/HotelCard";
import type { Hotel } from "@/data/hotels";

const HotelMap = lazy(() => import("@/components/HotelMap"));

const modeIcons = {
  flight: <Plane size={14} />,
  drive: <Car size={14} />,
  train: <TrainFront size={14} />,
};

const Hotels = () => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [filter, setFilter] = useState<"all" | "india" | "abroad">("all");

  const indiaDestinations = ["Ladakh", "Manali", "Shimla", "Kashmir Valley", "Goa", "Jaipur"];
  const filteredHotels = hotels.filter((h) => {
    if (filter === "all") return true;
    if (filter === "india") return indiaDestinations.includes(h.destination);
    return !indiaDestinations.includes(h.destination);
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <HotelIcon className="text-primary" size={22} />
            <h1 className="font-display text-xl font-bold text-foreground">
              Hotels & <span className="text-primary">Itinerary</span>
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 border border-border">
            {(["all", "india", "abroad"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-display font-bold transition-all capitalize ${
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--neon-cyan)/0.4)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f === "india" ? "India" : "Abroad"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
          {/* Hotel List - Left */}
          <div className="lg:w-[420px] flex-shrink-0 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            <div className="flex items-center gap-2 mb-4">
              <Map size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground font-body">
                {filteredHotels.length} properties found
              </span>
            </div>
            {filteredHotels.map((hotel, i) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isSelected={selectedHotel?.id === hotel.id}
                onClick={() => setSelectedHotel(hotel)}
                index={i}
              />
            ))}
          </div>

          {/* Map - Right */}
          <div className="flex-1 min-h-[400px] lg:min-h-0 relative">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-card rounded-xl border border-border"><span className="text-muted-foreground font-body text-sm">Loading map…</span></div>}>
              <HotelMap
                hotels={filteredHotels}
                routes={travelRoutes}
                selectedHotel={selectedHotel}
                onSelectHotel={setSelectedHotel}
              />
            </Suspense>

            {/* Route Legend */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-md border border-border rounded-lg px-4 py-3 z-[1000]">
              <p className="text-[10px] text-muted-foreground font-display uppercase tracking-wider mb-2">Travel Routes</p>
              <div className="flex flex-col gap-1.5">
                {(["flight", "drive", "train"] as const).map((mode) => (
                  <div key={mode} className="flex items-center gap-2 text-xs text-foreground">
                    <span className="text-primary">{modeIcons[mode]}</span>
                    <div
                      className="w-6 h-0.5"
                      style={{
                        background: mode === "flight" ? "#00e5ff" : mode === "drive" ? "#d946ef" : "#fbbf24",
                        borderTop: mode === "flight" ? "2px dashed" : undefined,
                      }}
                    />
                    <span className="capitalize font-body">{mode}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
