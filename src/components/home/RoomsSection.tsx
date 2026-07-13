import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import roomLuxury from "@/assets/room-luxury.jpg";
import roomValley from "@/assets/room-valley.jpg";
import roomFamily from "@/assets/room-family.jpg";
import cafeImage from "@/assets/cafe-view.jpg";

const rooms = [
  {
    slug: "private-deluxe",
    name: "Private Deluxe Room",
    tagline: "Cozy wooden interiors, private balcony",
    price: "From ₹2,499 / night",
    capacity: "2 guests",
    image: roomLuxury,
    features: ["Private Balcony", "Mountain View", "Attached Bathroom"],
  },
  {
    slug: "mountain-view",
    name: "Mountain View Room",
    tagline: "The best view in the house",
    price: "From ₹2,999 / night",
    capacity: "2 guests",
    image: roomValley,
    features: ["Panoramic Views", "King Bed", "Sunrise Balcony"],
  },
  {
    slug: "family-room",
    name: "Family Room",
    tagline: "Room to spread out for the whole family",
    price: "From ₹3,999 / night",
    capacity: "4 guests",
    image: roomFamily,
    features: ["Two Beds", "Family Space", "Kid Friendly"],
  },
  {
    slug: "dormitory",
    name: "Dormitory Bed",
    tagline: "Backpacker-friendly & social",
    price: "From ₹599 / bed",
    capacity: "6 beds",
    image: cafeImage,
    features: ["Shared Space", "Lockers", "Community Vibes"],
  },
];

export const RoomsSection = () => {
  return (
    <section id="rooms" className="section-padding bg-snow">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="label-caps text-accent mb-3 block">Where You'll Stay</span>
          <h2 className="heading-section text-primary max-w-2xl mx-auto text-balance">
            Rooms & dormitory for every kind of traveller
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room, i) => (
            <motion.article
              key={room.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-mist">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="heading-card text-primary mb-1">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{room.tagline}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.features.map((f) => (
                    <span key={f} className="text-[11px] px-2.5 py-1 bg-primary/6 text-primary rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{room.capacity}</span>
                  <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{room.slug === "dormitory" ? "6 beds" : "1 room"}</span>
                </div>
                <div className="mt-auto pt-4 border-t border-border/50 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Starts at</p>
                    <p className="font-heading font-bold text-primary text-sm">{room.price}</p>
                  </div>
                  <Link to="/contact">
                    <Button size="sm" variant="forest">Book</Button>
                  </Link>
                </div>
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
          <Link to="/rooms">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Rooms <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
