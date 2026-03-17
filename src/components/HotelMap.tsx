import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Hotel, TravelRoute } from "@/data/hotels";

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const createHotelIcon = (isSelected: boolean) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 28px; height: 28px; border-radius: 50%;
      background: ${isSelected ? "hsl(185,100%,50%)" : "hsl(280,99%,53%)"};
      border: 3px solid ${isSelected ? "hsl(185,100%,70%)" : "hsl(280,99%,70%)"};
      box-shadow: 0 0 ${isSelected ? "16px" : "8px"} ${isSelected ? "hsl(185,100%,50%,0.6)" : "hsl(280,99%,53%,0.3)"};
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s;
    "><div style="width:8px;height:8px;border-radius:50%;background:white;"></div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

const routeColor: Record<string, string> = {
  flight: "#00e5ff",
  drive: "#d946ef",
  train: "#fbbf24",
};

function FlyToSelected({ hotel }: { hotel: Hotel | null }) {
  const map = useMap();
  useEffect(() => {
    if (hotel) {
      map.flyTo([hotel.lat, hotel.lng], 8, { duration: 1.2 });
    }
  }, [hotel, map]);
  return null;
}

interface HotelMapProps {
  hotels: Hotel[];
  routes: TravelRoute[];
  selectedHotel: Hotel | null;
  onSelectHotel: (hotel: Hotel) => void;
}

const HotelMap = ({ hotels, routes, selectedHotel, onSelectHotel }: HotelMapProps) => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-border shadow-[0_0_30px_hsl(var(--neon-cyan)/0.1)]">
      <MapContainer
        center={[25, 60]}
        zoom={3}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FlyToSelected hotel={selectedHotel} />

        {/* Travel routes */}
        {routes.map((route, i) => (
          <Polyline
            key={i}
            positions={[
              [route.from.lat, route.from.lng],
              [route.to.lat, route.to.lng],
            ]}
            pathOptions={{
              color: routeColor[route.mode] || "#00e5ff",
              weight: 2,
              opacity: 0.6,
              dashArray: route.mode === "flight" ? "8 6" : undefined,
            }}
          >
            <Popup>
              <div className="text-xs font-body">
                <strong>{route.from.label} → {route.to.label}</strong>
                <br />
                {route.travelTime}
              </div>
            </Popup>
          </Polyline>
        ))}

        {/* Hotel markers */}
        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={[hotel.lat, hotel.lng]}
            icon={createHotelIcon(selectedHotel?.id === hotel.id)}
            eventHandlers={{ click: () => onSelectHotel(hotel) }}
          >
            <Popup>
              <div className="text-xs font-body min-w-[160px]">
                <strong className="text-sm">{hotel.name}</strong>
                <br />
                <span className="text-muted-foreground">{hotel.destination}</span>
                <br />
                <span className="font-bold text-primary">
                  {hotel.currency}{hotel.pricePerNight.toLocaleString()}/night
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HotelMap;
