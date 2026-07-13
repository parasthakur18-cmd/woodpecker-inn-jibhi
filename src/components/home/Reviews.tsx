import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const themes = [
  "Amazing mountain views",
  "Friendly hospitality",
  "Helpful staff",
  "Clean rooms",
  "Peaceful surroundings",
  "Excellent food",
  "Great café",
  "Comfortable beds",
  "Perfect location",
  "Budget-friendly",
];

export const Reviews = () => {
  return (
    <section className="section-padding bg-mist-light">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label-caps text-accent mb-3 block">Guest Voices</span>
          <h2 className="heading-section text-primary mb-4 max-w-2xl mx-auto text-balance">
            What our guests keep telling us
          </h2>
          <p className="body-regular text-muted-foreground max-w-xl mx-auto">
            Recurring themes from real Google, Booking.com & MakeMyTrip reviews.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-14"
        >
          {themes.map((theme, i) => (
            <motion.span
              key={theme}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 bg-card rounded-full border border-border/50 text-sm font-medium text-primary shadow-card"
            >
              ✓ {theme}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-elevated border border-border/40 text-center"
        >
          <Quote className="w-10 h-10 text-primary/20 mx-auto mb-4" />
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
          <p className="font-heading text-lg md:text-xl text-charcoal leading-relaxed mb-6 italic">
            Read what real guests say on Google, Booking.com and MakeMyTrip.
            We're proud that most reviews mention the same things — the views,
            the food, and the warmth of our staff.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.google.com/search?q=The+Woodpecker+Inn+Jibhi+reviews"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="forest" size="lg">Read Google Reviews</Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Book Your Stay
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
