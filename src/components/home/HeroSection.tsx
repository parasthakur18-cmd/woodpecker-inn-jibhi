import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mountain, Waves, Coffee, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hotel.jpg";

const trustSignals = [
  { icon: Mountain, label: "Mountain View" },
  { icon: Waves, label: "Riverside" },
  { icon: Coffee, label: "Café & Cuisine" },
  { icon: PawPrint, label: "Pet Friendly" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="The Woodpecker Inn - Luxury Mountain Stay in Jibhi Valley"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury text-center text-snow pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="label-caps text-snow/80 mb-4 block">Jibhi Valley, Himachal Pradesh</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="heading-display text-snow mb-6 max-w-4xl mx-auto text-balance"
        >
          Luxury Mountain Stay in the Heart of Jibhi Valley
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="body-large text-snow/90 max-w-2xl mx-auto mb-10"
        >
          River-side calm, wooden luxury, valley views & warm Himachali hospitality. 
          Your perfect Himalayan escape awaits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Book Your Stay
            </Button>
          </Link>
          <a href="tel:+919317224562">
            <Button variant="heroOutline" size="xl">
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
          </a>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {trustSignals.map((signal, index) => (
            <div
              key={signal.label}
              className="flex items-center gap-2 text-snow/80"
            >
              <signal.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{signal.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-snow/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-snow/80 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
