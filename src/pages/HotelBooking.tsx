import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Star, Wifi, UtensilsCrossed, Waves, Car, Dumbbell, Sparkles,
  MapPin, Users, Calendar as CalendarIcon, CreditCard, Smartphone, Wallet,
  Shield, Check, ChevronDown, Bed, Coffee, Mountain, Gem, Clock,
  BadgeCheck, Heart
} from "lucide-react";
import { format } from "date-fns";
import { hotels } from "@/data/hotels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi size={16} />,
  Restaurant: <UtensilsCrossed size={16} />,
  "Fine Dining": <UtensilsCrossed size={16} />,
  "Michelin Dining": <UtensilsCrossed size={16} />,
  Pool: <Waves size={16} />,
  "Infinity Pool": <Waves size={16} />,
  Parking: <Car size={16} />,
  Gym: <Dumbbell size={16} />,
  Spa: <Sparkles size={16} />,
  "Mountain View": <Mountain size={16} />,
  "Lake View": <Mountain size={16} />,
  "Canal View": <Mountain size={16} />,
  "River View": <Mountain size={16} />,
  "City View": <Mountain size={16} />,
  "Beach Access": <Waves size={16} />,
  "Private Beach": <Waves size={16} />,
  "Butler Service": <Gem size={16} />,
  Concierge: <Gem size={16} />,
  "Room Service": <Coffee size={16} />,
  Bar: <Coffee size={16} />,
  Heater: <Sparkles size={16} />,
  Bonfire: <Sparkles size={16} />,
  Garden: <Mountain size={16} />,
  Golf: <Mountain size={16} />,
  Casino: <Gem size={16} />,
  Shopping: <Gem size={16} />,
  SkyPark: <Mountain size={16} />,
  Helipad: <Gem size={16} />,
  "Underwater Restaurant": <UtensilsCrossed size={16} />,
  "Rooftop Terrace": <Mountain size={16} />,
  "Onsen Spa": <Sparkles size={16} />,
  Yoga: <Heart size={16} />,
};

const roomTypes = [
  { id: "deluxe", name: "Deluxe Room", multiplier: 1, icon: <Bed size={18} />, desc: "Elegant room with premium furnishings and city views" },
  { id: "suite", name: "Executive Suite", multiplier: 1.8, icon: <Gem size={18} />, desc: "Spacious suite with separate living area and panoramic views" },
  { id: "premium", name: "Premium Villa", multiplier: 2.5, icon: <Mountain size={18} />, desc: "Private villa with exclusive amenities and personal butler" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const HotelBooking = () => {
  const { id } = useParams<{ id: string }>();
  const hotel = hotels.find((h) => h.id === id);
  const { toast } = useToast();

  const [selectedRoom, setSelectedRoom] = useState("deluxe");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [step, setStep] = useState(0); // 0: room, 1: guest, 2: payment

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const diff = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const roomMultiplier = roomTypes.find((r) => r.id === selectedRoom)?.multiplier ?? 1;
  const roomCost = hotel ? hotel.pricePerNight * roomMultiplier * nights : 0;
  const taxes = Math.round(roomCost * 0.18);
  const serviceFee = Math.round(roomCost * 0.05);
  const total = roomCost + taxes + serviceFee;

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Hotel not found</h1>
          <Link to="/hotels">
            <Button variant="outline">
              <ArrowLeft size={16} /> Back to Hotels
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!guestName || !guestEmail) {
      toast({ title: "Please fill in guest details", variant: "destructive" });
      return;
    }
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your stay at ${hotel.name} has been booked for ${nights} night${nights > 1 ? "s" : ""}.`,
    });
  };

  const steps = ["Room & Dates", "Guest Details", "Payment"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[50vh] min-h-[360px] overflow-hidden"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button */}
        <Link
          to="/hotels"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border text-foreground hover:border-primary transition-all text-sm font-display"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        {/* Hotel info overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
        >
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} size={14} className="fill-primary text-primary" />
              ))}
              <span className="text-xs text-muted-foreground ml-2">
                {hotel.rating} ({hotel.reviews} reviews)
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-1">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin size={14} className="text-primary" />
              {hotel.destination}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Booking Flow */}
          <div className="flex-1 space-y-6">
            {/* Description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="bg-card rounded-xl border border-border p-6"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-3">About This Property</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{hotel.description}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Experience world-class hospitality with meticulously designed rooms, award-winning dining,
                and exclusive privileges that make every moment unforgettable. From personalized concierge
                services to curated local experiences, we ensure your stay transcends expectations.
              </p>
            </motion.div>

            {/* Amenities & Privileges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="bg-card rounded-xl border border-border p-6"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Amenities & Privileges</h2>
              <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((amenity, i) => (
                  <motion.div
                    key={amenity}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ scale: 1.05, borderColor: "hsl(185, 100%, 50%)" }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-sm text-foreground transition-colors"
                  >
                    <span className="text-primary">{amenityIcons[amenity] || <BadgeCheck size={16} />}</span>
                    {amenity}
                  </motion.div>
                ))}
                {/* Extra privileges */}
                {["24/7 Room Service", "Airport Transfer", "Welcome Drink"].map((priv, i) => (
                  <motion.div
                    key={priv}
                    variants={fadeUp}
                    custom={hotel.amenities.length + i}
                    whileHover={{ scale: 1.05, borderColor: "hsl(280, 99%, 53%)" }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-sm text-foreground transition-colors"
                  >
                    <span className="text-secondary">{i === 0 ? <Clock size={16} /> : i === 1 ? <Car size={16} /> : <Coffee size={16} />}</span>
                    {priv}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Step Indicator */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="flex items-center gap-2">
              {steps.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStep(i)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-bold transition-all border",
                    step === i
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_hsl(var(--neon-cyan)/0.4)]"
                      : step > i
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-card text-muted-foreground border-border hover:border-primary/40"
                  )}
                >
                  {step > i ? <Check size={12} /> : <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px]">{i + 1}</span>}
                  {s}
                </button>
              ))}
            </motion.div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Room Selection */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
                      <Bed size={18} className="text-primary" /> Select Your Room
                    </h3>
                    <div className="space-y-3">
                      {roomTypes.map((room) => (
                        <motion.div
                          key={room.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedRoom(room.id)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                            selectedRoom === room.id
                              ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--neon-cyan)/0.15)]"
                              : "border-border bg-card hover:border-primary/40"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                            selectedRoom === room.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            {room.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-display font-bold text-sm text-foreground">{room.name}</p>
                            <p className="text-xs text-muted-foreground">{room.desc}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-extrabold text-primary">
                              {hotel.currency}{Math.round(hotel.pricePerNight * room.multiplier).toLocaleString()}
                            </p>
                            <p className="text-[10px] text-muted-foreground">/night</p>
                          </div>
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                            selectedRoom === room.id ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedRoom === room.id && <Check size={12} className="text-primary-foreground" />}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
                      <CalendarIcon size={18} className="text-primary" /> Select Dates
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <label className="text-xs text-muted-foreground mb-1.5 block font-display">Check-in</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}>
                              <CalendarIcon size={14} />
                              {checkIn ? format(checkIn, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkIn}
                              onSelect={setCheckIn}
                              disabled={(date) => date < new Date()}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <label className="text-xs text-muted-foreground mb-1.5 block font-display">Check-out</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !checkOut && "text-muted-foreground")}>
                              <CalendarIcon size={14} />
                              {checkOut ? format(checkOut, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkOut}
                              onSelect={setCheckOut}
                              disabled={(date) => date < (checkIn || new Date())}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    {/* Guests */}
                    <div className="mt-4">
                      <label className="text-xs text-muted-foreground mb-1.5 block font-display">Guests</label>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={() => setGuests(Math.max(1, guests - 1))} className="h-9 w-9">-</Button>
                        <span className="font-display font-bold text-foreground w-8 text-center">{guests}</span>
                        <Button variant="outline" size="icon" onClick={() => setGuests(Math.min(6, guests + 1))} className="h-9 w-9">+</Button>
                        <Users size={14} className="text-muted-foreground ml-1" />
                        <span className="text-xs text-muted-foreground">{guests} Guest{guests > 1 ? "s" : ""}</span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => setStep(1)} className="w-full neon-glow-cyan font-display font-bold">
                    Continue to Guest Details
                  </Button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card rounded-xl border border-border p-6 space-y-4"
                >
                  <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <Users size={18} className="text-primary" /> Guest Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-display">Full Name</label>
                      <Input
                        placeholder="Enter your full name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="bg-muted/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-display">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="bg-muted/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-display">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="bg-muted/30"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={() => setStep(0)} className="font-display">Back</Button>
                    <Button onClick={() => setStep(2)} className="flex-1 neon-glow-cyan font-display font-bold">
                      Continue to Payment
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card rounded-xl border border-border p-6 space-y-4"
                >
                  <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <Shield size={18} className="text-primary" /> Secure Payment
                  </h3>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    {[
                      { value: "card", label: "Credit / Debit Card", icon: <CreditCard size={18} />, desc: "Visa, Mastercard, Amex" },
                      { value: "upi", label: "UPI", icon: <Smartphone size={18} />, desc: "Google Pay, PhonePe, Paytm" },
                      { value: "wallet", label: "Digital Wallet", icon: <Wallet size={18} />, desc: "Apple Pay, Samsung Pay" },
                    ].map((opt) => (
                      <motion.label
                        key={opt.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                          paymentMethod === opt.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <RadioGroupItem value={opt.value} />
                        <span className="text-primary">{opt.icon}</span>
                        <div className="flex-1">
                          <p className="font-display font-bold text-sm text-foreground">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </motion.label>
                    ))}
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3 pt-2"
                    >
                      <Input placeholder="Card Number" className="bg-muted/30" />
                      <div className="flex gap-3">
                        <Input placeholder="MM/YY" className="bg-muted/30 flex-1" />
                        <Input placeholder="CVV" className="bg-muted/30 w-24" />
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "upi" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-2">
                      <Input placeholder="your-upi@bank" className="bg-muted/30" />
                    </motion.div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                    <Shield size={12} className="text-primary" />
                    <span>256-bit SSL encrypted • PCI DSS compliant • Your data is secure</span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={() => setStep(1)} className="font-display">Back</Button>
                    <Button onClick={handleBooking} className="flex-1 neon-glow-cyan font-display font-bold text-base py-5">
                      Confirm Booking — {hotel.currency}{total.toLocaleString()}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Price Breakdown Sticky */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="lg:w-[360px] flex-shrink-0"
          >
            <div className="sticky top-6 space-y-4">
              {/* Mini Card */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="font-display font-bold text-sm text-foreground">{hotel.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={10} /> {hotel.destination}
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bed size={14} className="text-primary" />
                    <span>{roomTypes.find((r) => r.id === selectedRoom)?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon size={14} className="text-primary" />
                    <span>{nights} night{nights > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={14} className="text-primary" />
                    <span>{guests} guest{guests > 1 ? "s" : ""}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-display text-base font-bold text-foreground mb-4">Price Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Room ({nights} night{nights > 1 ? "s" : ""} × {hotel.currency}{Math.round(hotel.pricePerNight * roomMultiplier).toLocaleString()})</span>
                    <span className="text-foreground font-medium">{hotel.currency}{roomCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes & GST (18%)</span>
                    <span className="text-foreground font-medium">{hotel.currency}{taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Service Fee (5%)</span>
                    <span className="text-foreground font-medium">{hotel.currency}{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between">
                    <span className="font-display font-bold text-foreground">Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.2, color: "hsl(185, 100%, 50%)" }}
                      animate={{ scale: 1 }}
                      className="font-display font-extrabold text-lg text-primary"
                    >
                      {hotel.currency}{total.toLocaleString()}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Shield size={12} className="text-primary" /> Secure</span>
                <span className="flex items-center gap-1"><BadgeCheck size={12} className="text-primary" /> Verified</span>
                <span className="flex items-center gap-1"><Check size={12} className="text-primary" /> Free Cancel</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
