import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="relative h-[100svh] flex items-end justify-center overflow-hidden">
      {/* Background image with slow Ken Burns zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/hero-hotel.webp"
          alt="Sunrise mountain view from The Woodpecker Inn balcony in Jibhi Valley"
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
        {/* Ultra-light gradient — only enough for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 via-transparent via-40% to-charcoal/70" />
      </div>

      <div className="relative z-10 container-luxury h-full flex flex-col justify-end text-center text-snow pt-8 pb-28 sm:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="label-caps text-snow/85 mb-3 inline-block text-shadow-hero"
        >
          Jibhi · Himachal Pradesh
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="font-heading font-semibold text-snow mb-3 max-w-[700px] mx-auto text-balance leading-[1.05] text-[1.875rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] text-shadow-hero"
        >
          Wake Up To The Mountains Of Jibhi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="text-snow/90 max-w-xl mx-auto mb-6 text-xs sm:text-base italic font-light text-shadow-hero"
        >
          Where every morning begins with a mountain view.
        </motion.p>

        {/* Booking widget */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mx-auto max-w-4xl rounded-xl border border-snow/10 bg-charcoal/25 backdrop-blur-xl shadow-xl p-3 text-left"
        >
          {/* Mobile layout */}
          <div className="grid grid-cols-2 gap-2 sm:hidden">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Check-in
              </span>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-snow text-xs font-medium border-0 border-b border-snow/30 pb-1 focus:outline-none focus:border-snow [color-scheme:dark]"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Check-out
              </span>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-snow text-xs font-medium border-0 border-b border-snow/30 pb-1 focus:outline-none focus:border-snow [color-scheme:dark]"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1">
                <Users className="w-3 h-3" /> Guests
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-snow text-xs font-medium border-0 border-b border-snow/30 pb-1 focus:outline-none focus:border-snow appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="text-charcoal">
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1">
                <BedDouble className="w-3 h-3" /> Rooms
              </span>
              <select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full bg-transparent text-snow text-xs font-medium border-0 border-b border-snow/30 pb-1 focus:outline-none focus:border-snow appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} className="text-charcoal">
                    {n} {n === 1 ? "Room" : "Rooms"}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-2 sm:hidden">
            <Button
              type="submit"
              variant="hero"
              className="w-full h-12 rounded-lg tracking-wider font-semibold shadow-lg"
            >
              Check Availability
            </Button>
          </div>

          {/* Desktop layout */}
          <div className="hidden sm:grid grid-cols-5 gap-2 items-end">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Check-in
              </span>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-snow text-xs font-medium border-0 border-b border-snow/30 pb-1 focus:outline-none focus:border-snow [color-scheme:dark]"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Check-out
              </span>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-snow text-xs font-medium border-0 border-b border-snow/30 pb-1 focus:outline-none focus:border-snow [color-scheme:dark]"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1">
                <Users className="w-3 h-3" /> Guests
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-snow text-xs font-medium border-0 border-b border-snow/30 pb-1 focus:outline-none focus:border-snow appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="text-charcoal">
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-snow/80 flex items-center gap-1">
                <BedDouble className="w-3 h-3" /> Rooms
              </span>
              <select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full bg-transparent text-snow text-xs font-medium border-0 border-b border-snow/30 pb-1 focus:outline-none focus:border-snow appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} className="text-charcoal">
                    {n} {n === 1 ? "Room" : "Rooms"}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end">
              <Button
                type="submit"
                variant="hero"
                className="w-full h-12 rounded-lg tracking-wider font-semibold shadow-lg"
              >
                Check Availability
              </Button>
            </div>
          </div>
        </motion.form>
      </div>

    </section>
  );
};
