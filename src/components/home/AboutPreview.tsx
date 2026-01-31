import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import valleyImage from "@/assets/valley-view.jpg";

export const AboutPreview = () => {
  return (
    <section className="section-padding bg-snow">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={valleyImage}
                alt="Jibhi Valley scenic view near The Woodpecker Inn"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-wood/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="label-caps text-wood mb-4 block">Our Story</span>
            <h2 className="heading-section text-pine mb-6">
              Where Mountains Meet Tranquility
            </h2>
            <div className="space-y-4 text-muted-foreground body-regular mb-8">
              <p>
                Nestled in the pristine Jibhi Valley of Himachal Pradesh, The Woodpecker Inn 
                was born from a dream to create a sanctuary where travelers could escape the 
                chaos of city life and reconnect with nature.
              </p>
              <p>
                Here, you'll wake to the sound of birds singing, the gentle rush of the nearby 
                river, and views of mist-covered mountains that stretch to the horizon. Our 
                wooden luxury rooms, crafted from local timber, offer warmth and comfort while 
                maintaining harmony with the surrounding forest.
              </p>
              <p>
                We believe in slow travel—taking time to breathe, to observe, to simply be. 
                Whether you're sipping chai on your private balcony or exploring hidden 
                waterfalls, The Woodpecker Inn is your home in the mountains.
              </p>
            </div>
            <Link to="/about">
              <Button variant="pine" size="lg">
                Our Story
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
