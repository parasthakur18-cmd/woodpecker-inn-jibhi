import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, TreePine, Heart, Shield, MapPin, Check } from "lucide-react";
import petImage from "@/assets/pet-friendly.jpg";
import valleyImage from "@/assets/valley-view.jpg";

const petAmenities = [
  {
    icon: TreePine,
    title: "Open Spaces",
    description: "Large outdoor areas perfect for your pet to run, play, and explore safely.",
  },
  {
    icon: MapPin,
    title: "Scenic Trails",
    description: "Pet-friendly hiking trails right from our doorstep through pine forests and meadows.",
  },
  {
    icon: Heart,
    title: "Warm Welcome",
    description: "Our staff loves animals and will make your furry friend feel right at home.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Secure, fenced areas and pet-safe interiors for worry-free stays.",
  },
];

const guidelines = [
  "Please inform us about your pet when booking",
  "Keep pets on leash in common areas",
  "Pets should be house-trained",
  "Pet owners are responsible for their pet's behavior",
  "Clean up after your pet in outdoor areas",
  "Pets should be comfortable around other guests",
  "Vaccination records appreciated (not mandatory)",
  "Additional cleaning charges may apply",
];

const PetFriendly = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={petImage}
            alt="Pet-friendly hotel in Jibhi - The Woodpecker Inn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/50" />
        </div>
        <div className="relative z-10 container-luxury text-center text-snow pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-snow/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <PawPrint className="w-5 h-5" />
            <span className="text-sm font-medium">Pets Welcome</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-6"
          >
            Pet-Friendly Stay in Jibhi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/90 max-w-2xl mx-auto"
          >
            Your four-legged family members deserve a mountain vacation too. 
            At The Woodpecker Inn, we welcome pets with open arms.
          </motion.p>
        </div>
      </section>

      {/* Why Pets Love It */}
      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="label-caps text-wood mb-4 block">For Your Furry Friends</span>
              <h2 className="heading-section text-pine mb-6">
                Why Pets Love The Woodpecker Inn
              </h2>
              <div className="space-y-4 text-muted-foreground body-regular mb-8">
                <p>
                  We understand that pets are family, and family vacations should include 
                  everyone. That's why The Woodpecker Inn has created a truly pet-friendly 
                  environment where your dogs (and other well-behaved pets) can enjoy the 
                  mountains just as much as you do.
                </p>
                <p>
                  Imagine morning walks through misty pine forests, afternoons splashing 
                  in the nearby river, and evenings relaxing on the lawn while watching 
                  the sunset paint the valley in gold. For many of our canine guests, 
                  this becomes their favorite vacation spot.
                </p>
                <p>
                  Our spacious property, surrounded by nature with no busy roads nearby, 
                  provides a safe and stimulating environment for pets to explore. The 
                  fresh mountain air, natural trails, and open spaces are pure paradise 
                  for adventure-loving dogs.
                </p>
              </div>
              <Link to="/contact">
                <Button variant="pine" size="lg">
                  <PawPrint className="w-4 h-4" />
                  Book Pet-Friendly Stay
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={valleyImage}
                  alt="Pet-friendly trails near Jibhi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-wood/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-padding bg-mist-light">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section text-pine mb-4">
              Pet Amenities
            </h2>
            <p className="body-regular text-muted-foreground max-w-xl mx-auto">
              Everything your pet needs for a comfortable and enjoyable mountain stay.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {petAmenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-2xl shadow-card"
              >
                <div className="w-16 h-16 rounded-full bg-pine/10 flex items-center justify-center mx-auto mb-6">
                  <amenity.icon className="w-8 h-8 text-pine" />
                </div>
                <h3 className="font-heading text-lg font-medium text-pine mb-3">
                  {amenity.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="section-padding bg-snow">
        <div className="container-luxury max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-pine mb-4">
              Pet Policy & Guidelines
            </h2>
            <p className="body-regular text-muted-foreground">
              To ensure a pleasant experience for all guests, we have a few simple guidelines.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-card"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {guidelines.map((guideline) => (
                <div key={guideline} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{guideline}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-pine text-snow">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <PawPrint className="w-12 h-12 mx-auto mb-6 text-wood-light" />
            <h2 className="heading-section mb-6">
              Ready for a Pet-Friendly Adventure?
            </h2>
            <p className="body-large text-snow/80 max-w-xl mx-auto mb-8">
              Book your stay and bring your furry companion along for the ultimate 
              mountain experience. Questions about bringing your pet? We're happy to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Book Now
                </Button>
              </Link>
              <a href="tel:+919317224562">
                <Button variant="heroOutline" size="xl">
                  Call to Inquire
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PetFriendly;
