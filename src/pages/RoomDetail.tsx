import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getRoomBySlug } from "@/data/rooms";
import {
  Check,
  Users,
  Bed,
  Mountain,
  TreePine,
  Wifi,
  Bath,
  Tv,
  Flame,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  LogIn,
  LogOut,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  bed: Bed,
  mountain: Mountain,
  tree: TreePine,
  wifi: Wifi,
  tv: Tv,
  bath: Bath,
  flame: Flame,
};

const RoomDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const room = slug ? getRoomBySlug(slug) : undefined;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery = room?.gallery && room.gallery.length > 0 ? room.gallery : [];
  const heroImg = room?.heroImage ?? room?.image;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, gallery.length]);

  if (!room) return <Navigate to="/rooms" replace />;

  const highlights = room.highlights ?? [
    { icon: "users", label: `Up to ${room.capacity}` },
    { icon: "bed", label: room.bedType },
    { icon: "mountain", label: "Mountain View" },
    { icon: "wifi", label: "Free High-Speed Wi-Fi" },
    { icon: "bath", label: "Attached Bathroom" },
    { icon: "flame", label: "24×7 Hot & Cold Water" },
  ];
  const amenities = room.amenities ?? room.features;

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[75vh] min-h-[520px] bg-pine">
        <img src={heroImg} alt={room.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/10" />
        <div className="relative z-10 container-luxury h-full flex flex-col justify-end pb-16 text-snow">
          <Link to="/rooms" className="inline-flex items-center gap-1 text-sm text-snow/80 hover:text-snow mb-6">
            <ArrowLeft className="w-4 h-4" /> All rooms
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display max-w-3xl"
          >
            {room.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="body-large text-snow/90 mt-3 max-w-2xl"
          >
            {room.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <Link to="/contact">
              <Button variant="forest" size="lg">
                <Calendar className="w-4 h-4" /> Check Availability
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="section-padding bg-snow">
          <div className="container-luxury">
            <div className="text-center mb-10">
              <span className="label-caps text-wood mb-2 block">Gallery</span>
              <h2 className="heading-section text-pine">A closer look</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
                >
                  <img
                    src={src}
                    alt={`${room.name} ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
                onClick={() => setLightboxIndex(null)}
              >
                <button
                  className="absolute top-4 right-4 text-snow p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(null);
                  }}
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
                <button
                  className="absolute left-4 text-snow p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
                  }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  src={gallery[lightboxIndex]}
                  alt={`${room.name} ${lightboxIndex + 1}`}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className="absolute right-4 text-snow p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex + 1) % gallery.length);
                  }}
                  aria-label="Next"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* HIGHLIGHTS */}
      <section className="section-padding bg-mist-light">
        <div className="container-luxury">
          <div className="text-center mb-10">
            <span className="label-caps text-wood mb-2 block">Room Highlights</span>
            <h2 className="heading-section text-pine">Everything you'll love</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((h) => {
              const Icon = iconMap[h.icon] ?? Check;
              return (
                <div
                  key={h.label}
                  className="bg-card rounded-2xl p-5 shadow-card hover:shadow-elevated transition-shadow text-center"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-pine/5 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-pine" />
                  </div>
                  <p className="text-sm font-medium text-pine">{h.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="section-padding bg-snow">
        <div className="container-luxury grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <span className="label-caps text-wood mb-2 block">About the Room</span>
              <h2 className="heading-section text-pine mb-4">Your peaceful mountain escape</h2>
              <p className="text-muted-foreground body-regular whitespace-pre-line">
                {room.longDescription ?? room.description}
              </p>
            </div>

            <div>
              <h2 className="heading-card text-pine mb-5">Room Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 p-3 rounded-xl bg-mist-light">
                    <div className="w-7 h-7 rounded-full bg-pine/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-pine" />
                    </div>
                    <span className="text-sm text-foreground">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-card text-pine mb-5">Room Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { t: "Room Type", d: room.name },
                  { t: "Maximum Occupancy", d: room.capacity },
                  { t: "Bed Type", d: room.bedType },
                  { t: "Room Size", d: room.size ?? "—" },
                  { t: "Check-in", d: room.checkIn ?? "2:00 PM", icon: LogIn },
                  { t: "Check-out", d: room.checkOut ?? "11:00 AM", icon: LogOut },
                ].map((p) => (
                  <div key={p.t} className="p-4 rounded-xl border border-border/50">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{p.t}</p>
                    <p className="font-heading font-medium text-pine">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-card text-pine mb-5">Cancellation Policy</h2>
              <div className="p-5 rounded-xl bg-mist-light space-y-2 text-sm text-muted-foreground">
                <p><span className="font-medium text-pine">Free cancellation</span> up to 48 hours before check-in.</p>
                <p>Within 48 hours of check-in, one night's tariff will be charged.</p>
                <p>No-shows will be charged the full booking amount.</p>
              </div>
            </div>
          </div>

          {/* BOOKING CARD */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-elevated">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Starting from</p>
              <p className="font-heading text-3xl font-bold text-primary">
                {room.startingPrice}
                <span className="text-sm font-normal text-muted-foreground"> / night</span>
              </p>
              <p className="text-xs text-primary mt-1">Only {room.inventoryLabel} left</p>

              <div className="mt-6 space-y-2">
                <Link to="/contact" className="block">
                  <Button variant="pine" size="lg" className="w-full">
                    Book Now
                  </Button>
                </Link>
                <Link to="/contact" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    <Calendar className="w-4 h-4" /> Check Availability
                  </Button>
                </Link>
              </div>

              <div className="mt-5 pt-5 border-t border-border/50 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pine" /> Best rate guaranteed</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pine" /> Free cancellation (48h)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pine" /> Instant confirmation</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default RoomDetail;
