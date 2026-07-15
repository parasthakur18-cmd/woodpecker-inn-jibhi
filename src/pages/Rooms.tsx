import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Bed, Wifi, Bath, Mountain, TreePine } from "lucide-react";
import { rooms } from "@/data/rooms";

const Rooms = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-pine">
        <div className="relative z-10 container-luxury text-center text-snow pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-caps text-snow/80 mb-4 block"
          >
            Accommodations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-6"
          >
            Rooms & Dormitory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/90 max-w-2xl mx-auto"
          >
            From boutique king-view suites to social backpacker dorms — nine
            room categories, one mountain home.
          </motion.p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, i) => (
              <motion.article
                key={room.slug}
                id={room.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.06 }}
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
                    {room.badges.includes("Mountain View") && (
                      <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-snow/95 backdrop-blur text-primary shadow-sm inline-flex items-center gap-1">
                        <Mountain className="w-3 h-3" /> Mountain View
                      </span>
                    )}
                    {room.badges.includes("Balcony") && (
                      <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-snow/95 backdrop-blur text-primary shadow-sm inline-flex items-center gap-1">
                        <TreePine className="w-3 h-3" /> Balcony
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 right-3 text-[10px] font-medium px-2 py-1 rounded-full bg-primary text-primary-foreground">
                    Only {room.inventoryLabel} left
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="heading-card text-primary mb-1">{room.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{room.tagline}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{room.capacity}</span>
                    <span className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5" />{room.bedType}</span>
                    <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5" />Free Wi-Fi</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-3.5 h-3.5" />
                      {room.badges.includes("Shared Bathroom") ? "Shared Bath" : "Attached Bath"}
                    </span>
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
        </div>
      </section>

      {/* Policies */}
      <section className="section-padding bg-mist-light">
        <div className="container-luxury max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-pine mb-4">Good to Know</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Check-in", content: "2:00 PM onwards" },
              { title: "Check-out", content: "11:00 AM" },
              { title: "Cancellation", content: "Free cancellation up to 48 hours before check-in" },
              { title: "Payment", content: "All major cards accepted, UPI, and cash" },
            ].map((item) => (
              <div key={item.title} className="bg-card p-6 rounded-xl shadow-card">
                <h3 className="font-heading font-medium text-pine mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Rooms;
