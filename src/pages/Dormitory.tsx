import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bed, Users, Wifi, Lock, Coffee, Check } from "lucide-react";
const dormImage = "/rooms/mixed-dorm-hero.webp";

const features = [
  { icon: Bed, title: "6 Beds Per Room", desc: "Bunk-style beds with fresh linens & personal reading lights." },
  { icon: Lock, title: "Personal Lockers", desc: "Store your gear safely — bring your own lock or rent one." },
  { icon: Wifi, title: "Free WiFi", desc: "High-speed internet in the dorm and common areas." },
  { icon: Coffee, title: "Café Access", desc: "Coffee, breakfast and hot meals right downstairs." },
  { icon: Users, title: "Meet Fellow Travellers", desc: "Bonfire evenings and shared trail plans — the vibe is friendly." },
];

const included = [
  "Fresh linens & pillow",
  "24/7 hot water",
  "Personal power socket",
  "Reading light",
  "Common shower & WC",
  "Bonfire access (evenings)",
];

const Dormitory = () => {
  return (
    <Layout>
      <section className="relative min-h-[50vh] flex items-center justify-center bg-primary text-snow">
        <div className="container-luxury text-center pt-24 pb-16 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-caps text-sky mb-3 block"
          >
            Backpacker Friendly
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-4"
          >
            Dormitory Beds in Jibhi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/85 max-w-2xl mx-auto"
          >
            Affordable, comfortable, and just steps away from the mountains.
            Perfect for solo travellers, backpackers, and long-stay explorers.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={cafeImage}
                  alt="Dormitory at The Woodpecker Inn, Jibhi"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-heading font-bold text-primary">₹599</span>
                <span className="text-muted-foreground">/ bed / night</span>
              </div>
              <h2 className="heading-section text-primary mb-6">Sleep well without stretching your budget</h2>
              <p className="body-regular text-muted-foreground mb-6">
                Our dormitory is a clean, well-lit 6-bed room with all the essentials —
                a real bed (not a bunk cell), fresh linens, personal power sockets, a reading
                light, and secure lockers. It's the kind of dorm we always wished existed
                on our own backpacking trips.
              </p>
              <div className="space-y-2 mb-8">
                <p className="font-heading font-semibold text-primary text-sm mb-3">What's included</p>
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/contact">
                <Button variant="forest" size="lg">Book a Dorm Bed</Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-primary mb-4">Why backpackers pick us</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-6 bg-card rounded-2xl border border-border/40 shadow-card"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-primary text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-snow text-center">
        <div className="container-luxury max-w-2xl">
          <h2 className="heading-section mb-4">Come stay with us</h2>
          <p className="body-regular text-snow/85 mb-8">
            Dorm beds fill up fast in peak season (April–June & October).
            Book ahead to secure your spot.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button variant="hero" size="xl">Book Your Dorm Bed</Button>
            </Link>
            <a href="tel:+919317224562">
              <Button variant="heroOutline" size="xl">Call Us</Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dormitory;
