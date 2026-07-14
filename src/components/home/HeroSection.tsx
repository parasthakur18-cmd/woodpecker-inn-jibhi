import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Calendar, Users, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hotel.png.asset.json";

export const HeroSection = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ checkIn, checkOut, guests, rooms });
    navigate(`/contact?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background image with slow Ken Burns zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={heroImage.url}
          alt="Sunrise mountain view from The Woodpecker Inn balcony in Jibhi Valley"
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
        {/* Very subtle gradient — just enough for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/40" />
      </div>

      <div className="relative z-10 container-luxury text-center text-snow pt-28 pb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="label-caps text-snow/85 mb-6 inline-block"
        >
          Jibhi · Himachal Pradesh
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="font-heading font-semibold text-snow mb-5 max-w-3xl mx-auto text-balance leading-[1.1] text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Wake Up To The Mountains Of Jibhi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-snow/90 max-w-xl mx-auto mb-12 text-base sm:text-lg italic font-light"
        >
          Where every morning begins with a mountain view.
        </motion.p>

        {/* Booking widget */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mx-auto max-w-4xl rounded-2xl border border-snow/25 bg-snow/15 backdrop-blur-xl shadow-2xl p-4 sm:p-5 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <label className="flex flex-col gap-1.5 lg:col-span-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" /> Check-in
              </span>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-snow text-sm font-medium border-0 border-b border-snow/30 pb-1.5 focus:outline-none focus:border-snow [color-scheme:dark]"
              />
            </label>
            <label className="flex flex-col gap-1.5 lg:col-span-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" /> Check-out
              </span>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-snow text-sm font-medium border-0 border-b border-snow/30 pb-1.5 focus:outline-none focus:border-snow [color-scheme:dark]"
              />
            </label>
            <label className="flex flex-col gap-1.5 lg:col-span-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1.5">
                <Users className="w-3 h-3" /> Guests
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-snow text-sm font-medium border-0 border-b border-snow/30 pb-1.5 focus:outline-none focus:border-snow appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="text-charcoal">
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 lg:col-span-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1.5">
                <BedDouble className="w-3 h-3" /> Rooms
              </span>
              <select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="bg-transparent text-snow text-sm font-medium border-0 border-b border-snow/30 pb-1.5 focus:outline-none focus:border-snow appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} className="text-charcoal">
                    {n} {n === 1 ? "Room" : "Rooms"}
                  </option>
                ))}
              </select>
            </label>
            <div className="lg:col-span-1 flex items-end">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full rounded-xl tracking-wider font-semibold shadow-lg"
              >
                Check Availability
              </Button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-snow/85 hover:text-snow transition-colors"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] tracking-[0.28em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
        </motion.div>
      </motion.a>
    </section>
  );
};
