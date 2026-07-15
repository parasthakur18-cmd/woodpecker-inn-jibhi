import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import heroImage from "@/assets/hero-hotel.jpg";
import roomLuxury from "@/assets/room-luxury.jpg";
import roomValley from "@/assets/room-valley.jpg";
import roomFamily from "@/assets/room-family.jpg";
import cafeImageAsset from "@/assets/cafe-view.png.asset.json";
const cafeImage = cafeImageAsset.url;
import cuisineImageAsset from "@/assets/cafe-interior.jpg.asset.json";
const cuisineImage = cuisineImageAsset.url;
import valleyImage from "@/assets/valley-view.jpg";
import petImage from "@/assets/pet-friendly.jpg";
import jaloriImage from "@/assets/jalori-pass.jpg";
import serolsarImage from "@/assets/serolsar-lake.jpg";

const categories = ["All", "Property", "Rooms", "Café", "Nature", "Experiences"];

const galleryImages = [
  { src: heroImage, category: "Property", alt: "The Woodpecker Inn exterior at golden hour" },
  { src: roomLuxury, category: "Rooms", alt: "Luxury wooden room interior" },
  { src: valleyImage, category: "Nature", alt: "Jibhi Valley panoramic view" },
  { src: cafeImage, category: "Café", alt: "Mountain-view café" },
  { src: roomValley, category: "Rooms", alt: "Valley view suite" },
  { src: cuisineImage, category: "Café", alt: "Authentic Himachali cuisine" },
  { src: jaloriImage, category: "Nature", alt: "Jalori Pass snow peaks" },
  { src: roomFamily, category: "Rooms", alt: "Spacious family room" },
  { src: petImage, category: "Experiences", alt: "Pet-friendly mountain adventures" },
  { src: serolsarImage, category: "Nature", alt: "Serolsar Lake serene waters" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-pine">
        <div className="relative z-10 container-luxury text-center text-snow pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-caps text-snow/80 mb-4 block"
          >
            Visual Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-6"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/90 max-w-2xl mx-auto"
          >
            Explore the beauty of The Woodpecker Inn and the stunning Jibhi Valley 
            through our collection of photographs.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-snow">
        <div className="container-luxury">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-pine text-snow"
                    : "bg-mist-light text-pine hover:bg-pine/10"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground text-center">{image.alt}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-snow hover:bg-snow/10 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
