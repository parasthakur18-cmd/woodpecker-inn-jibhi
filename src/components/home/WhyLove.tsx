import { motion } from "framer-motion";
import {
  Mountain, Home, Flame, Coffee, Wifi, Bed,
  DoorOpen, Users, Leaf, Footprints, TreePine, Wind,
} from "lucide-react";

const features = [
  { icon: Mountain, title: "Mountain Views" },
  { icon: Home, title: "Private Balconies" },
  { icon: Flame, title: "Bonfire Evenings" },
  { icon: Coffee, title: "Scenic Café" },
  { icon: Wifi, title: "High-Speed WiFi" },
  { icon: Bed, title: "Dormitory" },
  { icon: DoorOpen, title: "Private Rooms" },
  { icon: Users, title: "Family Friendly" },
  { icon: Leaf, title: "Peaceful Location" },
  { icon: Footprints, title: "Walking Distance to Attractions" },
  { icon: TreePine, title: "Nature Everywhere" },
  { icon: Wind, title: "Fresh Mountain Air" },
];

export const WhyLove = () => {
  return (
    <section className="section-padding bg-mist-light">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="label-caps text-accent mb-3 block">Why Guests Love Us</span>
          <h2 className="heading-section text-primary max-w-3xl mx-auto text-balance">
            Everything you need for a peaceful mountain stay
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-2xl p-6 text-center shadow-card border border-border/40 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/8 flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" strokeWidth={1.6} />
              </div>
              <p className="font-heading font-semibold text-sm md:text-base text-charcoal">
                {f.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
