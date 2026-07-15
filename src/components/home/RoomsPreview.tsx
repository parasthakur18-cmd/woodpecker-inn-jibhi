import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/rooms";

const preview = rooms.slice(0, 3);

export const RoomsPreview = () => {
  return (
    <section className="section-padding bg-mist-light">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="label-caps text-wood mb-4 block">Accommodations</span>
          <h2 className="heading-section text-pine mb-4">Rooms & Dormitory</h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Nine room categories across boutique privates, cozy balcony rooms and
            social dorms — each with mountain calm and easy comforts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preview.map((room, index) => (
            <motion.div
              key={room.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="heading-card text-pine mb-2">{room.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{room.tagline}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{room.capacity}</span>
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{room.bedType}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {room.badges.slice(0, 3).map((b) => (
                      <span key={b} className="text-xs px-3 py-1 bg-pine/5 text-pine rounded-full">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
