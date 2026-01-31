import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Leaf, Heart, Mountain, Users } from "lucide-react";
import valleyImage from "@/assets/valley-view.jpg";
import heroImage from "@/assets/hero-hotel.jpg";

const values = [
  {
    icon: Leaf,
    title: "Sustainable Living",
    description: "We believe in harmony with nature. Our property uses local materials, minimizes waste, and supports the surrounding ecosystem.",
  },
  {
    icon: Heart,
    title: "Warm Hospitality",
    description: "Every guest is family. We take pride in offering genuine Himachali warmth and personalized attention to make your stay special.",
  },
  {
    icon: Mountain,
    title: "Authentic Experiences",
    description: "From local cuisine to guided treks, we help you experience the real Himalayan culture and natural beauty.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We employ local staff, source ingredients from nearby farms, and support community initiatives in Jibhi Valley.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="The Woodpecker Inn exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/60" />
        </div>
        <div className="relative z-10 container-luxury text-center text-snow pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-caps text-snow/80 mb-4 block"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-6"
          >
            About The Woodpecker Inn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/90 max-w-2xl mx-auto"
          >
            A sanctuary born from a love for mountains and a dream to share it with the world.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section text-pine mb-6">
                Where It All Began
              </h2>
              <div className="space-y-4 text-muted-foreground body-regular">
                <p>
                  The Woodpecker Inn wasn't born in a boardroom—it was born on a misty morning 
                  in Jibhi, when the first rays of sun broke through the pine trees and painted 
                  the valley in gold. That moment of pure magic sparked a vision: to create a 
                  place where others could experience this same sense of wonder.
                </p>
                <p>
                  We chose the name "Woodpecker" not just for the beautiful birds that grace 
                  our property, but because they represent the spirit of this place—persistent, 
                  vibrant, and perfectly at home in the mountains. Like the woodpecker, we've 
                  carved out our own little haven in this ancient forest.
                </p>
                <p>
                  Every beam of our wooden rooms was sourced locally, every dish in our café 
                  tells a story of Himachali tradition, and every sunrise view from our terrace 
                  reminds us why we fell in love with Jibhi in the first place.
                </p>
                <p>
                  Today, The Woodpecker Inn stands as more than just a place to stay—it's a 
                  invitation to slow down, breathe deeply, and reconnect with what truly matters. 
                  Whether you're here for adventure or escape, we're honored to be part of your journey.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={valleyImage}
                  alt="Jibhi Valley views"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-wood/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-mist-light">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="label-caps text-wood mb-4 block">Our Values</span>
            <h2 className="heading-section text-pine mb-4">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-pine/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-pine" />
                </div>
                <h3 className="font-heading text-xl font-medium text-pine mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-padding bg-pine text-snow">
        <div className="container-luxury max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <blockquote className="font-heading text-2xl md:text-3xl italic leading-relaxed mb-6">
              "In the mountains, we find not just peace, but pieces of ourselves we forgot existed."
            </blockquote>
            <p className="text-snow/60">— The Woodpecker Inn Philosophy</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
