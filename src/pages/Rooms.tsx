import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Eye, Users, Heart, Wifi, Coffee, Mountain, Sparkles } from "lucide-react";
import roomLuxury from "@/assets/room-luxury.jpg";
import roomValley from "@/assets/room-valley.jpg";
import roomFamily from "@/assets/room-family.jpg";

const rooms = [
  {
    id: "luxury-wooden",
    name: "Luxury Wooden Room",
    tagline: "Handcrafted Comfort",
    description: "Experience the warmth of traditional Himalayan craftsmanship in our signature wooden rooms. Floor-to-ceiling wood paneling, locally crafted furniture, and large windows that frame the mountain landscape create an atmosphere of rustic elegance.",
    image: roomLuxury,
    icon: Eye,
    capacity: "2 Adults",
    size: "250 sq ft",
    features: [
      "Premium wooden interiors",
      "Private balcony with mountain view",
      "King-size bed with premium linens",
      "En-suite bathroom with hot water",
      "Room heater for winters",
      "Complimentary breakfast",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Coffee, label: "Tea/Coffee maker" },
      { icon: Mountain, label: "Mountain View" },
      { icon: Sparkles, label: "Daily Housekeeping" },
    ],
  },
  {
    id: "valley-view",
    name: "Valley View Suite",
    tagline: "Panoramic Paradise",
    description: "Wake up to the most breathtaking views in Jibhi. Our Valley View Suites offer unobstructed panoramas of the entire Jibhi Valley, from the river below to the snow-capped peaks on the horizon. Perfect for couples seeking a romantic escape.",
    image: roomValley,
    icon: Heart,
    capacity: "2 Adults",
    size: "300 sq ft",
    features: [
      "180° panoramic valley views",
      "Romantic setting for couples",
      "King-size bed facing the view",
      "Private sit-out balcony",
      "Premium bathroom amenities",
      "Complimentary breakfast",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Coffee, label: "Tea/Coffee maker" },
      { icon: Mountain, label: "Valley View" },
      { icon: Sparkles, label: "Daily Housekeeping" },
    ],
  },
  {
    id: "family-room",
    name: "Family Room",
    tagline: "Space for Everyone",
    description: "Designed with families in mind, our spacious Family Rooms comfortably accommodate parents and children. Extra floor space for play, multiple beds, and a cozy atmosphere make this the perfect base for your family's mountain adventure.",
    image: roomFamily,
    icon: Users,
    capacity: "2 Adults + 2 Children",
    size: "400 sq ft",
    features: [
      "Spacious layout for families",
      "Multiple beds (1 King + 1 Twin)",
      "Extra floor space",
      "Mountain view windows",
      "Connected to nature trails",
      "Complimentary breakfast for all",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Coffee, label: "Tea/Coffee maker" },
      { icon: Mountain, label: "Mountain View" },
      { icon: Sparkles, label: "Daily Housekeeping" },
    ],
  },
];

const Rooms = () => {
  return (
    <Layout>
      {/* Hero Section */}
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
            Rooms & Suites
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/90 max-w-2xl mx-auto"
          >
            Each room is a sanctuary of comfort, blending rustic mountain charm 
            with modern amenities for the perfect Himalayan retreat.
          </motion.p>
        </div>
      </section>

      {/* Rooms List */}
      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="space-y-24">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                id={room.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <room.icon className="w-6 h-6 text-wood" />
                    <span className="label-caps text-wood">{room.tagline}</span>
                  </div>
                  <h2 className="heading-section text-pine mb-4">{room.name}</h2>
                  <p className="text-muted-foreground body-regular mb-6">{room.description}</p>

                  {/* Meta */}
                  <div className="flex gap-6 mb-6 text-sm">
                    <span className="text-pine font-medium">{room.capacity}</span>
                    <span className="text-muted-foreground">{room.size}</span>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {room.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-wood flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity.label}
                        className="flex items-center gap-2 px-4 py-2 bg-pine/5 rounded-full text-sm"
                      >
                        <amenity.icon className="w-4 h-4 text-pine" />
                        <span className="text-pine">{amenity.label}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact">
                    <Button variant="pine" size="lg">
                      Book This Room
                    </Button>
                  </Link>
                </div>
              </motion.div>
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
