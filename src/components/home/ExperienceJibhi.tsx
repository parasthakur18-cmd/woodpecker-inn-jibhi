import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import jaloriImage from "@/assets/jalori-pass.jpg";
import serolsarImage from "@/assets/serolsar-lake.jpg";
import valleyImage from "@/assets/valley-view.jpg";

const attractions = [
  { name: "Mini Thailand", distance: "10 km", desc: "Emerald river pools & moss-covered rocks in a hidden forest clearing.", image: valleyImage },
  { name: "Jibhi Waterfall", distance: "3 km", desc: "A short walk through pine woods to a hidden mossy cascade.", image: valleyImage },
  { name: "Jalori Pass", distance: "12 km", desc: "Snow-capped mountain pass at 3,120m with 360° Himalayan views.", image: jaloriImage },
  { name: "Serolsar Lake", distance: "15 km", desc: "Sacred alpine lake, an easy trek from Jalori Pass.", image: serolsarImage },
  { name: "Chehni Kothi", distance: "8 km", desc: "1,500-year-old tower — one of the tallest ancient structures in Himachal.", image: valleyImage },
  { name: "River Walk", distance: "0.5 km", desc: "Follow the Tirthan tributary — perfect for morning walks.", image: valleyImage },
  { name: "Sunrise Viewpoints", distance: "1 km", desc: "Nearby ridges to catch first light on the peaks.", image: valleyImage },
  { name: "Café Hopping", distance: "0.5 km", desc: "The little valley has some surprisingly great cafés.", image: cafeSubstitute() },
  { name: "Trekking Trails", distance: "Various", desc: "Forest trails, alpine meadows, and multi-day treks.", image: jaloriImage },
];

function cafeSubstitute() { return valleyImage; }

export const ExperienceJibhi = () => {
  return (
    <section className="section-padding bg-snow">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="label-caps text-accent mb-3 block">Experience Jibhi</span>
          <h2 className="heading-section text-primary max-w-2xl mx-auto text-balance">
            The best of Jibhi Valley — just outside your door
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((a, i) => (
            <motion.article
              key={a.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-mist">
                <img
                  src={a.image}
                  alt={`${a.name} near The Woodpecker Inn, Jibhi`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="heading-card text-primary">{a.name}</h3>
                  <span className="flex items-center gap-1 text-xs text-accent font-semibold whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5" />
                    {a.distance}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{a.desc}</p>
                <Link to="/attractions" className="story-link text-primary text-sm font-semibold">
                  Explore →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/attractions">
            <Button variant="forest" size="lg">
              See All Attractions <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
