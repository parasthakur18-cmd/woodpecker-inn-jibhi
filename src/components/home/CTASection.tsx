import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/lib/whatsapp";

export const CTASection = () => {
  const handleWhatsApp = () =>
    openWhatsApp("919317224562", "Hi! I'm interested in booking a stay at The Woodpecker Inn.");

  return (
    <section className="section-padding bg-gradient-pine text-snow">
      <div className="container-luxury text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label-caps text-snow/70 mb-4 block">Ready to Escape?</span>
          <h2 className="heading-section mb-6 max-w-2xl mx-auto">
            Book Your Mountain Retreat Today
          </h2>
          <p className="body-large text-snow/80 max-w-xl mx-auto mb-10">
            Whether you're planning a romantic getaway, a family vacation, or a solo 
            adventure, we're here to make your Himalayan dream come true.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                <Calendar className="w-5 h-5" />
                Book Your Stay
              </Button>
            </Link>
            <a href="tel:+919317224562">
              <Button variant="heroOutline" size="xl">
                <Phone className="w-5 h-5" />
                +91 93172 24562
              </Button>
            </a>
            <button type="button" onClick={handleWhatsApp}>
              <Button variant="heroOutline" size="xl" asChild={false}>
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
