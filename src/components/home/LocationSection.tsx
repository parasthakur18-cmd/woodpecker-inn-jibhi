import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { openWhatsApp } from "@/lib/whatsapp";

export const LocationSection = () => {
  const handleWhatsApp = () =>
    openWhatsApp("919317224562", "Hi! I'd like directions to The Woodpecker Inn.");
  const directionsLink = "https://www.google.com/maps/dir/?api=1&destination=The+Woodpecker+Inn,+Jibhi,+Himachal+Pradesh";

  return (
    <section className="bg-snow">
      <div className="container-luxury pt-16 md:pt-24 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label-caps text-accent mb-3 block">Find Us</span>
          <h2 className="heading-section text-primary mb-3">Located in the heart of Jibhi Valley</h2>
          <p className="body-regular text-muted-foreground max-w-xl mx-auto mb-8">
            VPO Jibhi, Road, Gadagushaini, Himachal Pradesh 175123
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <a href="tel:+919317224562">
              <Button variant="forest" size="lg"><Phone className="w-4 h-4" /> Call</Button>
            </a>
            <button type="button" onClick={handleWhatsApp}>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </Button>
            </button>
            <a href={directionsLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Navigation className="w-4 h-4" /> Directions
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="wood" size="lg"><Calendar className="w-4 h-4" /> Book Now</Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="h-[420px] w-full">
        <iframe
          title="The Woodpecker Inn location on Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13495.7!2d77.383!3d31.549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJibhi%2C%20Himachal%20Pradesh%20175123!5e0!3m2!1sen!2sin!4v1710000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};
