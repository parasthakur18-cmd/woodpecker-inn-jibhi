import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hotel.png.asset.json";

const badgeItems = [
  "Mountain View Rooms",
  "Scenic Café",
  "Bonfire Evenings",
  "Walk to Mini Thailand",
];

export const HeroSection = () => {
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
        {/* Subtle overlay — lighter at top, only enough for text readability at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/25 via-transparent to-charcoal/60" />
      </div>

      <div className="relative z-10 container-luxury text-center text-snow pt-24 pb-28 sm:pb-32">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="label-caps text-snow/85 mb-5 inline-block"
        >
          Jibhi · Himachal Pradesh
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="font-heading font-semibold text-snow mb-5 max-w-3xl mx-auto text-balance leading-[1.15] text-[2.25rem] sm:text-5xl md:text-6xl"
        >
          Wake Up To The<br className="hidden sm:inline" /> Mountains Of Jibhi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-snow/90 max-w-2xl mx-auto mb-9 text-base sm:text-lg leading-relaxed"
        >
          Stay surrounded by breathtaking mountain views, cozy rooms, delicious café food,
          evening bonfires, peaceful forest walks, and genuine Himachali hospitality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10"
        >
          <Link to="/contact">
            <Button
              variant="hero"
              size="xl"
              className="w-full sm:w-auto rounded-full px-8 shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book Your Stay
            </Button>
          </Link>
          <Link to="/rooms">
            <Button
              variant="heroOutline"
              size="xl"
              className="w-full sm:w-auto rounded-full px-8 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Rooms
            </Button>
          </Link>
        </motion.div>

        {/* Glassmorphism trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mx-auto max-w-2xl rounded-2xl border border-snow/20 bg-snow/10 backdrop-blur-md px-5 py-4 shadow-lg"
        >
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-snow tracking-wide">
              Highly Rated Mountain Stay
            </span>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[11px] sm:text-xs text-snow/85">
            {badgeItems.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                <span>{item}</span>
                {i < badgeItems.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-snow/40" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </motion.div>
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
        <span className="text-[10px] tracking-[0.28em] uppercase">Scroll to Explore</span>
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
