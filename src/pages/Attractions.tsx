import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { MapPin, Clock, Mountain, TreePine } from "lucide-react";
import jaloriImage from "@/assets/jalori-pass.jpg";
import serolsarImage from "@/assets/serolsar-lake.jpg";
import valleyImage from "@/assets/valley-view.jpg";

const attractions = [
  {
    id: "jalori-pass",
    name: "Jalori Pass",
    distance: "12 km",
    time: "30 min drive + trek",
    difficulty: "Moderate",
    image: jaloriImage,
    description: "Jalori Pass, at an elevation of 3,120 meters, is one of the lowest passes in the Himalayan region yet offers some of the most spectacular views. The pass connects Kullu Valley with Shimla and has been a historic trade route for centuries.",
    highlights: [
      "360-degree panoramic views of snow-capped peaks",
      "Ancient stone temple at the summit",
      "Starting point for Serolsar Lake trek",
      "Rhododendron forests in spring",
      "Accessible by car for most of the year",
    ],
    bestTime: "March to June, September to November",
  },
  {
    id: "serolsar-lake",
    name: "Serolsar Lake",
    distance: "15 km",
    time: "1.5 hour trek from Jalori Pass",
    difficulty: "Easy to Moderate",
    image: serolsarImage,
    description: "This pristine alpine lake sits at an altitude of 3,100 meters, surrounded by dense oak and rhododendron forests. Local legend says the lake is protected by the goddess Budhi Nagin, and a small temple stands at its banks.",
    highlights: [
      "Crystal clear sacred lake",
      "Ancient Budhi Nagin temple",
      "Rich birdlife and wildlife",
      "Peaceful forest trail",
      "Reflection photography paradise",
    ],
    bestTime: "April to June, September to October",
  },
  {
    id: "jibhi-waterfall",
    name: "Jibhi Waterfall",
    distance: "3 km",
    time: "20 min walk",
    difficulty: "Easy",
    image: valleyImage,
    description: "A hidden gem just a short walk from the village, Jibhi Waterfall cascades down moss-covered rocks into a natural pool. The trek through apple orchards and pine forests is as beautiful as the destination itself.",
    highlights: [
      "Easy walking trail suitable for all ages",
      "Natural swimming pool in summers",
      "Surrounded by lush greenery",
      "Perfect for photography",
      "Peaceful picnic spot",
    ],
    bestTime: "Year-round (best flow in monsoon)",
  },
  {
    id: "chehni-kothi",
    name: "Chehni Kothi",
    distance: "8 km",
    time: "2-3 hour trek",
    difficulty: "Moderate",
    image: valleyImage,
    description: "Standing at over 40 meters, Chehni Kothi is one of the tallest and oldest tower structures in Himachal Pradesh. This architectural marvel dates back over 1,500 years and showcases traditional Himalayan building techniques.",
    highlights: [
      "Ancient tower architecture",
      "Historical significance",
      "Panoramic valley views from top",
      "Traditional village experience",
      "Wooden and stone craftsmanship",
    ],
    bestTime: "March to November",
  },
  {
    id: "tirthan-valley",
    name: "Tirthan Valley",
    distance: "25 km",
    time: "45 min drive",
    difficulty: "Easy",
    image: valleyImage,
    description: "Part of the Great Himalayan National Park (UNESCO World Heritage Site), Tirthan Valley is famous for its pristine river, trout fishing, and untouched natural beauty. The crystal-clear Tirthan River is a paradise for fishing enthusiasts.",
    highlights: [
      "Trout fishing opportunities",
      "GHNP buffer zone",
      "River rafting in season",
      "Birdwatching paradise",
      "Traditional Himachali villages",
    ],
    bestTime: "March to June, September to November",
  },
];

const Attractions = () => {
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
            Explore Jibhi
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-6"
          >
            Places to Visit Near Jibhi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/90 max-w-2xl mx-auto"
          >
            Discover hidden waterfalls, ancient temples, pristine lakes, and 
            breathtaking mountain passes—all within easy reach of The Woodpecker Inn.
          </motion.p>
        </div>
      </section>

      {/* Attractions List */}
      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="space-y-20">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                id={attraction.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "" : ""
                }`}
              >
                {/* Image */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
                    <img
                      src={attraction.image}
                      alt={`${attraction.name} near The Woodpecker Inn, Jibhi`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="heading-section text-pine mb-4">{attraction.name}</h2>
                  
                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-wood" />
                      {attraction.distance} from inn
                    </span>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-wood" />
                      {attraction.time}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mountain className="w-4 h-4 text-wood" />
                      {attraction.difficulty}
                    </span>
                  </div>

                  <p className="text-muted-foreground body-regular mb-6">
                    {attraction.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-heading font-medium text-pine mb-3">Highlights</h4>
                    <ul className="space-y-2">
                      {attraction.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <TreePine className="w-4 h-4 text-wood flex-shrink-0 mt-0.5" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best Time */}
                  <div className="inline-block px-4 py-2 bg-pine/5 rounded-lg">
                    <span className="text-sm">
                      <span className="font-medium text-pine">Best Time: </span>
                      <span className="text-muted-foreground">{attraction.bestTime}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="section-padding bg-mist-light">
        <div className="container-luxury max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-pine mb-4">Travel Tips</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Carry Essentials", content: "Water, snacks, sunscreen, and a light jacket—mountain weather can change quickly." },
              { title: "Start Early", content: "Begin treks in the morning to avoid afternoon clouds and get the best views." },
              { title: "Hire a Guide", content: "We can arrange local guides who know the trails and share fascinating stories." },
              { title: "Respect Nature", content: "Carry back all waste and avoid disturbing wildlife or plucking flowers." },
            ].map((tip) => (
              <div key={tip.title} className="bg-card p-6 rounded-xl shadow-card">
                <h3 className="font-heading font-medium text-pine mb-2">{tip.title}</h3>
                <p className="text-muted-foreground text-sm">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Attractions;
