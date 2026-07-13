import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals) + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { rating: 4.8, label: "Google Reviews", reviews: "500+" },
  { rating: 4.7, label: "Booking.com", reviews: "300+" },
  { rating: 4.6, label: "MakeMyTrip", reviews: "200+" },
];

const counters = [
  { value: 12000, suffix: "+", label: "Happy Guests" },
  { value: 8, suffix: "", label: "Years of Hospitality" },
  { value: 1000, suffix: "+", label: "5-Star Reviews" },
];

export const TrustBar = () => {
  return (
    <section className="section-padding bg-snow border-b border-border/60">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label-caps text-accent mb-3 block">Loved By Travellers</span>
          <h2 className="heading-section text-primary max-w-2xl mx-auto text-balance">
            Trusted by thousands of guests across India & beyond
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 text-center shadow-card border border-border/50"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="font-heading text-4xl font-bold text-primary">
                  <Counter to={s.rating} decimals={1} />
                </span>
                <div className="flex flex-col items-start">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">out of 5</span>
                </div>
              </div>
              <p className="font-heading font-semibold text-charcoal">{s.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.reviews} reviews</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-border/60 pt-10">
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-3xl md:text-5xl font-bold text-primary mb-1">
                <Counter to={c.value} suffix={c.suffix} />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
