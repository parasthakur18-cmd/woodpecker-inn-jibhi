import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Sunrise, Sun, Moon, Coffee, Leaf, UtensilsCrossed } from "lucide-react";
import cafeImageAsset from "@/assets/cafe-view.png.asset.json";
import cuisineImageAsset from "@/assets/cafe-interior.jpg.asset.json";

const cafeImage = cafeImageAsset.url;
const cuisineImage = cuisineImageAsset.url;

const menuSections = [
  {
    icon: Sunrise,
    title: "Breakfast",
    time: "8:00 AM - 10:30 AM",
    items: [
      "Aloo Paratha with curd & pickle",
      "Poori Bhaji",
      "Omelette / Scrambled Eggs",
      "Toast with butter & jam",
      "Fresh seasonal fruits",
      "Himachali Siddu (on request)",
    ],
  },
  {
    icon: Sun,
    title: "Lunch",
    time: "12:30 PM - 3:00 PM",
    items: [
      "Dal Tadka",
      "Seasonal vegetable curry",
      "Rajma Chawal",
      "Kadhi Pakora",
      "Rotis / Rice",
      "Salad & papad",
    ],
  },
  {
    icon: Moon,
    title: "Dinner",
    time: "7:00 PM - 10:00 PM",
    items: [
      "Paneer Butter Masala",
      "Mixed Veg Curry",
      "Dal Makhani",
      "Chicken Curry (non-veg)",
      "Naan / Roti / Jeera Rice",
      "Special Himachali Dham (weekends)",
    ],
  },
];

const specialties = [
  {
    name: "Himachali Dham",
    description: "Traditional festive meal served on special occasions. A complete thali with rice, dal, rajma, curd, and sweet rice.",
  },
  {
    name: "Siddu",
    description: "Local steamed bread stuffed with poppy seeds or walnut paste, served with ghee. A must-try Himachali specialty.",
  },
  {
    name: "Babru",
    description: "Crispy fried bread stuffed with black gram dal, served with tamarind chutney.",
  },
  {
    name: "Aktori",
    description: "Sweet pancakes made during festivals, prepared with wheat flour and sugar.",
  },
];

const Cafe = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={cafeImage}
            alt="Mountain view café at The Woodpecker Inn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/60" />
        </div>
        <div className="relative z-10 container-luxury text-center text-snow pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-caps text-snow/80 mb-4 block"
          >
            Café & Dining
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-6"
          >
            Mountain-View Café
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/90 max-w-2xl mx-auto"
          >
            Savor authentic Himachali flavors and wholesome meals while 
            gazing at the majestic Himalayan peaks.
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section text-pine mb-6">
                A Culinary Journey in the Clouds
              </h2>
              <div className="space-y-4 text-muted-foreground body-regular">
                <p>
                  Our café isn't just about food—it's about the experience. Imagine starting 
                  your day with a steaming cup of chai as the first rays of sun illuminate the 
                  valley below. Or ending it with a hearty dinner as stars begin to pepper the 
                  mountain sky.
                </p>
                <p>
                  We take pride in serving home-style meals prepared with love and locally 
                  sourced ingredients. Our menu celebrates the rich culinary heritage of Himachal 
                  Pradesh while offering familiar favorites for all palates.
                </p>
                <p>
                  Fresh vegetables from nearby farms, traditional spices passed down through 
                  generations, and recipes that have been perfected over years—every meal at 
                  The Woodpecker Inn tells a story of this beautiful land.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={cuisineImage}
                  alt="Authentic Himachali cuisine"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section-padding bg-mist-light">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="label-caps text-wood mb-4 block">Our Menu</span>
            <h2 className="heading-section text-pine mb-4">
              Daily Dining
            </h2>
            <p className="body-regular text-muted-foreground max-w-xl mx-auto">
              All meals are prepared fresh and can be customized for dietary preferences. 
              Let us know in advance for special requests.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {menuSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-pine/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-pine" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-medium text-pine">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.time}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-wood mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Day Section */}
      <section className="section-padding bg-snow">
        <div className="container-luxury max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Coffee className="w-12 h-12 text-wood mx-auto mb-6" />
            <h2 className="heading-section text-pine mb-4">
              All-Day Café
            </h2>
            <p className="body-regular text-muted-foreground mb-8">
              Between meals, our café remains open for refreshments. Enjoy freshly brewed 
              coffee, a variety of teas including local Kangra tea, light snacks, and 
              homemade treats while you work, read, or simply soak in the views.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Fresh Coffee", "Kangra Tea", "Hot Chocolate", "Maggi", "Pakoras", "Cookies"].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-pine/5 text-pine rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Local Specialties */}
      <section className="section-padding bg-pine text-snow">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Leaf className="w-10 h-10 text-wood-light mx-auto mb-4" />
            <h2 className="heading-section mb-4">
              Himachali Specialties
            </h2>
            <p className="body-regular text-snow/80 max-w-xl mx-auto">
              Experience the authentic taste of Himachal Pradesh with these traditional 
              dishes, available on request.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {specialties.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-snow/5 border border-snow/10"
              >
                <h3 className="font-heading text-xl font-medium mb-2">{item.name}</h3>
                <p className="text-snow/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cafe;
