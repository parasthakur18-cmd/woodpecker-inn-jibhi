import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";

export const FloatingCTA = () => {
  const handleWhatsApp = () =>
    openWhatsApp("919317224562", "Hi! I'd like to know about availability at The Woodpecker Inn, Jibhi.");

  return (
    <>
      {/* Desktop side rail */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:flex fixed right-5 bottom-8 z-40 flex-col gap-3"
      >
        <a
          href="tel:+919317224562"
          aria-label="Call The Woodpecker Inn"
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
        >
          <Phone className="w-5 h-5" />
        </a>
        <button
          type="button"
          onClick={handleWhatsApp}
          aria-label="WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
        <Link
          to="/contact"
          aria-label="Book Now"
          className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
        >
          <Calendar className="w-5 h-5" />
        </Link>
      </motion.div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-snow/95 backdrop-blur-md border-t border-border shadow-elevated">
        <div className="grid grid-cols-3 gap-1 p-2">
          <a
            href="tel:+919317224562"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-primary/5 transition-colors"
          >
            <Phone className="w-5 h-5 text-primary" />
            <span className="text-[11px] font-medium text-primary">Call</span>
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-[#25D366]/10 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span className="text-[11px] font-medium text-[#25D366]">WhatsApp</span>
          </a>
          <Link
            to="/contact"
            className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg bg-accent text-accent-foreground"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[11px] font-semibold">Book Now</span>
          </Link>
        </div>
      </div>
    </>
  );
};
