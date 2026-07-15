import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getRoomBySlug, rooms } from "@/data/rooms";
import { Check, Users, Bed, Mountain, TreePine, Wifi, Bath, ArrowLeft } from "lucide-react";

const RoomDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const room = slug ? getRoomBySlug(slug) : undefined;

  if (!room) return <Navigate to="/rooms" replace />;

  const related = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <Layout>
      {/* Hero image */}
      <section className="relative h-[60vh] min-h-[400px] bg-pine">
        <img
          src={room.image}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
        <div className="relative z-10 container-luxury h-full flex flex-col justify-end pb-10 text-snow">
          <Link to="/rooms" className="inline-flex items-center gap-1 text-sm text-snow/80 hover:text-snow mb-4">
            <ArrowLeft className="w-4 h-4" /> All rooms
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display max-w-3xl"
          >
            {room.name}
          </motion.h1>
          <p className="body-large text-snow/90 mt-2 max-w-2xl">{room.tagline}</p>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding bg-snow">
        <div className="container-luxury grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="heading-card text-pine mb-3">About this room</h2>
              <p className="text-muted-foreground body-regular">{room.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-mist-light">
                <Users className="w-5 h-5 text-pine mb-2" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Capacity</p>
                <p className="text-sm font-medium text-pine">{room.capacity}</p>
              </div>
              <div className="p-4 rounded-xl bg-mist-light">
                <Bed className="w-5 h-5 text-pine mb-2" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Bed</p>
                <p className="text-sm font-medium text-pine">{room.bedType}</p>
              </div>
              <div className="p-4 rounded-xl bg-mist-light">
                <Wifi className="w-5 h-5 text-pine mb-2" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Wi-Fi</p>
                <p className="text-sm font-medium text-pine">Complimentary</p>
              </div>
              <div className="p-4 rounded-xl bg-mist-light">
                <Bath className="w-5 h-5 text-pine mb-2" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Bathroom</p>
                <p className="text-sm font-medium text-pine">
                  {room.badges.includes("Shared Bathroom") ? "Shared" : "Attached"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="heading-card text-pine mb-4">Amenities & features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-wood" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {room.badges.map((b) => (
                  <span key={b} className="text-xs px-3 py-1 bg-pine/5 text-pine rounded-full inline-flex items-center gap-1">
                    {b === "Mountain View" && <Mountain className="w-3 h-3" />}
                    {b === "Balcony" && <TreePine className="w-3 h-3" />}
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-card text-pine mb-4">Policies</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { t: "Check-in", d: "2:00 PM onwards" },
                  { t: "Check-out", d: "11:00 AM" },
                  { t: "Cancellation", d: "Free up to 48 hours before check-in" },
                  { t: "Payment", d: "Cards, UPI and cash accepted" },
                ].map((p) => (
                  <div key={p.t} className="p-4 rounded-xl border border-border/50">
                    <p className="font-heading font-medium text-pine mb-1">{p.t}</p>
                    <p className="text-sm text-muted-foreground">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking sticky card */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-elevated">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Starts at</p>
              <p className="font-heading text-2xl font-bold text-primary">
                From {room.startingPrice} <span className="text-sm font-normal text-muted-foreground">/ night</span>
              </p>
              <p className="text-xs text-primary mt-1">Only {room.inventoryLabel} left</p>

              <div className="mt-5 space-y-2">
                <Link to="/contact" className="block">
                  <Button variant="pine" size="lg" className="w-full">Book Now</Button>
                </Link>
                <Link to="/contact" className="block">
                  <Button variant="outline" size="lg" className="w-full">Check Availability</Button>
                </Link>
              </div>

              <p className="text-[11px] text-muted-foreground mt-4 text-center">
                Best rate guaranteed when you book direct
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-mist-light">
        <div className="container-luxury">
          <h2 className="heading-section text-pine mb-8 text-center">You may also like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to={`/rooms/${r.slug}`} className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={r.image} alt={r.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="heading-card text-pine mb-1">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RoomDetail;
