import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/rooms";

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, i) => (
            <motion.article
              key={room.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[calc(100%-1.5rem)]">
                  {room.badges.slice(0, 2).map((b) => (
                    <span key={b} className="text-[10px] font-medium px-2 py-1 rounded-full bg-snow/95 backdrop-blur text-primary shadow-sm">
                      {b}
                    </span>
                  ))}
                </div>
                <span className="absolute bottom-3 right-3 text-[10px] font-medium px-2 py-1 rounded-full bg-primary text-primary-foreground">
                  Only {room.inventoryLabel} left
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="heading-card text-primary mb-1">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{room.tagline}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{room.capacity}</span>
                  <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{room.bedType}</span>
                </div>
                <div className="mt-auto pt-4 border-t border-border/50 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Starts at</p>
                    <p className="font-heading font-bold text-primary text-sm">From {room.startingPrice} / night</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/rooms/${room.slug}`}>
                      <Button size="sm" variant="outline">Details</Button>
                    </Link>
                    <Link to="/contact">
                      <Button size="sm" variant="forest">Book</Button>
                    </Link>
                  </div>
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
