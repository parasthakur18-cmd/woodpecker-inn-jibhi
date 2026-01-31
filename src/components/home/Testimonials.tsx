import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi, India",
    text: "The most peaceful stay I've ever had. Waking up to those valley views with a cup of chai was magical. The wooden rooms are so cozy and the staff made us feel like family.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    text: "As a digital nomad, I've stayed at many places, but The Woodpecker Inn is special. The café is perfect for working, the WiFi is reliable, and the mountain air keeps you energized.",
    rating: 5,
  },
  {
    name: "Rahul & Anjali",
    location: "Mumbai, India",
    text: "We brought our golden retriever and were so happy they welcomed pets! The hiking trails nearby were perfect for morning walks. Already planning our next visit.",
    rating: 5,
  },
];

export const Testimonials = () => {
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
          <span className="label-caps text-wood mb-4 block">Guest Experiences</span>
          <h2 className="heading-section text-pine mb-4">
            What Our Guests Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-card relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-pine/10" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-heading font-medium text-pine">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
