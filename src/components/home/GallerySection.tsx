import { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-hotel.jpg";
import roomLuxury from "@/assets/room-luxury.jpg";
import roomValley from "@/assets/room-valley.jpg";
import roomFamily from "@/assets/room-family.jpg";
import cafeImage from "@/assets/cafe-view.jpg";
import cuisineImage from "@/assets/local-cuisine.jpg";
import valleyImage from "@/assets/valley-view.jpg";
import jaloriImage from "@/assets/jalori-pass.jpg";
import serolsarImage from "@/assets/serolsar-lake.jpg";
import petImage from "@/assets/pet-friendly.jpg";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

// Masonry gallery — placeholders for real property photos.
const images = [
  { src: heroImage, alt: "Sunrise over Jibhi Valley", size: "tall" },
  { src: roomLuxury, alt: "Cozy wooden private room", size: "square" },
  { src: cafeImage, alt: "Mountain-view café" },
  { src: valleyImage, alt: "The forest around the property" },
  { src: roomValley, alt: "Mountain-view room" },
  { src: cuisineImage, alt: "Fresh Himachali food from our café" },
  { src: jaloriImage, alt: "Snow on Jalori Pass" },
  { src: roomFamily, alt: "Family room" },
  { src: petImage, alt: "Guests exploring the trails" },
  { src: serolsarImage, alt: "Serolsar Lake trek" },
];

export const GallerySection = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="section-padding bg-snow">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label-caps text-accent mb-3 block">Gallery</span>
          <h2 className="heading-section text-primary max-w-2xl mx-auto text-balance">
            A peek into Woodpecker life
          </h2>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.button
              key={img.src + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setOpen(img.src)}
              className="break-inside-avoid w-full rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all block group"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-snow hover:bg-snow/10 rounded-full"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </button>
            <img
              src={open}
              alt="Gallery"
              className="max-w-full max-h-[85vh] rounded-lg shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
