import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const StickyBookingBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-forest/95 backdrop-blur-md border-t border-snow/10 p-4"
        >
          <div className="flex gap-3">
            <a href="tel:+919317224562" className="flex-1">
              <Button variant="heroOutline" size="lg" className="w-full border-snow/30">
                <Phone className="w-4 h-4" />
                Call
              </Button>
            </a>
            <Link to="/contact" className="flex-1">
              <Button variant="hero" size="lg" className="w-full">
                <Calendar className="w-4 h-4" />
                Book Now
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
