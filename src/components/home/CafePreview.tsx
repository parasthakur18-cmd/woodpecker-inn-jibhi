import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Sunrise, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import cafeImage from "@/assets/cafe-view.jpg";
import cuisineImage from "@/assets/local-cuisine.jpg";

export const CafePreview = () => {
  return (
    <section className="section-padding bg-snow">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="label-caps text-wood mb-4 block">Café & Dining</span>
            <h2 className="heading-section text-pine mb-6">
              Mountain-View Café with Himachali Flavors
            </h2>
            <p className="body-regular text-muted-foreground mb-8">
              Start your morning with freshly brewed coffee overlooking the valley, enjoy 
              wholesome meals throughout the day, and savor authentic Himachali cuisine 
              prepared with locally sourced ingredients. Our café is the perfect spot for 
              sunrise breakfasts and sunset dinners.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Sunrise, title: "Sunrise Breakfast", desc: "Valley views with your morning chai" },
                { icon: UtensilsCrossed, title: "Local Cuisine", desc: "Authentic Himachali dishes" },
                { icon: Coffee, title: "All-Day Coffee", desc: "Fresh brews & mountain air" },
              ].map((item) => (
                <div key={item.title} className="text-center p-4 rounded-xl bg-pine/5">
                  <item.icon className="w-8 h-8 text-wood mx-auto mb-3" />
                  <h4 className="font-heading font-medium text-pine text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/cafe">
              <Button variant="pine" size="lg">
                Explore Our Menu
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={cafeImage}
                  alt="Mountain view café at The Woodpecker Inn"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated mt-8">
                <img
                  src={cuisineImage}
                  alt="Authentic Himachali cuisine"
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
