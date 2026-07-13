import { motion } from "framer-motion";
import {
  Car, Wifi, Coffee, Flame, BellRing, Zap, Droplets,
  Map as MapIcon, CarTaxiFront, UserCheck, Shirt, Mountain, Trees, Users, Bed,
} from "lucide-react";

const amenities = [
  { icon: Car, label: "Free Parking" },
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Coffee, label: "In-house Café" },
  { icon: Flame, label: "Bonfire Evenings" },
  { icon: BellRing, label: "Room Service" },
  { icon: Zap, label: "Power Backup" },
  { icon: Droplets, label: "24/7 Hot Water" },
  { icon: MapIcon, label: "Travel Assistance" },
  { icon: CarTaxiFront, label: "Taxi Booking" },
  { icon: UserCheck, label: "Local Guides" },
  { icon: Shirt, label: "Laundry Service" },
  { icon: Mountain, label: "Mountain View" },
  { icon: Trees, label: "Garden Seating" },
  { icon: Users, label: "Family Friendly" },
  { icon: Bed, label: "Dormitory Beds" },
];

export const Amenities = () => {
  return (
    <section className="section-padding bg-mist-light">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label-caps text-accent mb-3 block">What's Included</span>
          <h2 className="heading-section text-primary max-w-2xl mx-auto text-balance">
            Property Amenities
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {amenities.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/40 hover:border-primary/40 transition-colors"
            >
              <a.icon className="w-6 h-6 text-primary" strokeWidth={1.6} />
              <span className="text-xs md:text-sm font-medium text-charcoal text-center">{a.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
