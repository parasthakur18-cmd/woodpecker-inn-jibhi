import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import jaloriImage from "@/assets/jalori-pass.jpg";
import serolsarImage from "@/assets/serolsar-lake.jpg";

const attractions = [
  {
    name: "Jalori Pass",
    distance: "12 km",
    description: "Historic mountain pass at 3,120m with panoramic Himalayan views and ancient temples.",
    image: jaloriImage,
  },
  {
    name: "Serolsar Lake",
    distance: "15 km",
    description: "Sacred alpine lake surrounded by dense forests, a peaceful trek from Jalori Pass.",
    image: serolsarImage,
  },
];

export const AttractionsPreview = () => {
  return (
    <section className="section-padding bg-pine text-snow">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="label-caps text-wood-light mb-4 block">Explore Jibhi</span>
          <h2 className="heading-section mb-4">
            Places to Visit Near The Woodpecker Inn
          </h2>
          <p className="body-large text-snow/80 max-w-2xl mx-auto">
            Jibhi Valley is a gateway to some of the most breathtaking destinations 
            in Himachal Pradesh. Discover hidden waterfalls, ancient temples, and pristine lakes.
          </p>
        </motion.div>

        {/* Attractions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-wood-light text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {attraction.distance} from inn
                </div>
                <h3 className="font-heading text-2xl font-medium mb-2">{attraction.name}</h3>
                <p className="text-snow/80 text-sm">{attraction.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/attractions">
            <Button variant="hero" size="lg">
              Explore All Attractions
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
