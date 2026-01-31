import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import roomLuxury from "@/assets/room-luxury.jpg";
import roomValley from "@/assets/room-valley.jpg";
import roomFamily from "@/assets/room-family.jpg";

const rooms = [
  {
    title: "Luxury Wooden Room",
    description: "Handcrafted wooden interiors with premium amenities and private balcony views.",
    image: roomLuxury,
    icon: Eye,
    features: ["Mountain View", "Private Balcony", "Wooden Interiors"],
  },
  {
    title: "Valley View Suite",
    description: "Wake up to panoramic views of the entire Jibhi Valley from your bed.",
    image: roomValley,
    icon: Heart,
    features: ["Panoramic Valley View", "King Bed", "Sunrise Views"],
  },
  {
    title: "Family Room",
    description: "Spacious accommodation perfect for families traveling with children.",
    image: roomFamily,
    icon: Users,
    features: ["Multiple Beds", "Extra Space", "Kid Friendly"],
  },
];

export const RoomsPreview = () => {
  return (
    <section className="section-padding bg-mist-light">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="label-caps text-wood mb-4 block">Accommodations</span>
          <h2 className="heading-section text-pine mb-4">
            Rooms & Suites
          </h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Each room is thoughtfully designed to blend rustic mountain charm with modern comfort, 
            offering you a peaceful retreat after a day of exploration.
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <room.icon className="w-5 h-5 text-wood" />
                    <h3 className="heading-card text-pine">{room.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-3 py-1 bg-pine/5 text-pine rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/rooms">
            <Button variant="pine" size="lg">
              View All Rooms
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
