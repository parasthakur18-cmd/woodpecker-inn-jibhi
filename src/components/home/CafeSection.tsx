import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Utensils, Sunrise } from "lucide-react";
import { Button } from "@/components/ui/button";
import cafeImageAsset from "@/assets/cafe-view.png.asset.json";
const cafeImage = cafeImageAsset.url;
import cuisineImageAsset from "@/assets/cafe-interior.jpg.asset.json";
const cuisineImage = cuisineImageAsset.url;

export const CafeSection = () => {
  return (
    <section className="section-padding bg-primary text-snow overflow-hidden">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-caps text-sky mb-3 block">The Café</span>
            <h2 className="heading-section mb-6 text-balance">
              Where every meal comes<br /> with a mountain view
            </h2>
            <p className="body-regular text-snow/85 mb-8">
              Freshly brewed coffee at sunrise. Warm parathas for breakfast.
              Home-cooked Himachali dishes for lunch. Snacks around the bonfire
              in the evening. Our café is honestly the reason a lot of guests
              come back.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Sunrise, label: "Sunrise\nBreakfast" },
                { icon: Utensils, label: "Local Himachali\nCuisine" },
                { icon: Coffee, label: "All-Day\nCoffee" },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-xl bg-snow/10 backdrop-blur-sm">
                  <item.icon className="w-6 h-6 text-sky mx-auto mb-2" />
                  <p className="text-[11px] text-snow/90 whitespace-pre-line font-medium leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <Link to="/cafe">
              <Button variant="hero" size="lg">
                See The Café Menu <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={cafeImage}
                  alt="Mountain-view café at The Woodpecker Inn"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated mt-10">
                <img
                  src={cuisineImage}
                  alt="Fresh Himachali cuisine served at the café"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
