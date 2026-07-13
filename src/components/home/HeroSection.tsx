import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hotel.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mountain morning view from The Woodpecker Inn balcony in Jibhi Valley"
          className="w-full h-full object-cover"
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/40 to-charcoal/70" />
      </div>

      <div className="relative z-10 container-luxury text-center text-snow pt-20 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="label-caps text-snow/85 mb-6 inline-block"
        >
          Jibhi · Himachal Pradesh
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="heading-display text-snow mb-6 max-w-4xl mx-auto text-balance"
        >
          Wake Up To The<br className="hidden sm:inline" /> Mountains Of Jibhi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="body-large text-snow/90 max-w-2xl mx-auto mb-10 font-normal"
        >
          Escape the city and experience peaceful mountain mornings, forest walks,
          delicious café food, comfortable stays, and genuine Himachali hospitality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link to="/contact">
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Book Now
            </Button>
          </Link>
          <Link to="/rooms">
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
              Explore Rooms
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-6 h-10 border-2 border-snow/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-snow/80 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
