import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import valleyImage from "@/assets/valley-view.jpg";
import cafeImage from "@/assets/cafe-view.jpg";
import jaloriImage from "@/assets/jalori-pass.jpg";
import serolsarImage from "@/assets/serolsar-lake.jpg";
import petImage from "@/assets/pet-friendly.jpg";

const categories = ["All", "Travel", "Food", "Adventure", "Snowfall", "Road Trips", "Jibhi Guides", "Hidden Places", "Weekend Trips"];

const posts = [
  {
    slug: "complete-jibhi-travel-guide",
    title: "The Complete Jibhi Travel Guide (2026)",
    excerpt: "Everything you need to know before visiting Jibhi — how to reach, best time, what to do, and where to stay.",
    category: "Jibhi Guides",
    date: "Jan 2026",
    read: "8 min read",
    image: valleyImage,
  },
  {
    slug: "delhi-to-jibhi-road-trip",
    title: "Delhi to Jibhi: The Perfect Weekend Road Trip",
    excerpt: "A 12-hour drive that ends in the mountains. Route, stops, and everything to expect along the way.",
    category: "Road Trips",
    date: "Dec 2025",
    read: "6 min read",
    image: jaloriImage,
  },
  {
    slug: "mini-thailand-jibhi",
    title: "Mini Thailand, Jibhi — Hidden Emerald Pools",
    excerpt: "Off the beaten path, this hidden spot near Jibhi has emerald river pools and moss-covered rocks.",
    category: "Hidden Places",
    date: "Nov 2025",
    read: "5 min read",
    image: valleyImage,
  },
  {
    slug: "himachali-food-guide",
    title: "A First-Timer's Guide to Himachali Food",
    excerpt: "Siddu, Dham, Babru, Aktori — what to try, where to find it, and why you should.",
    category: "Food",
    date: "Nov 2025",
    read: "5 min read",
    image: cafeImage,
  },
  {
    slug: "serolsar-lake-trek",
    title: "Trekking to Serolsar Lake from Jalori Pass",
    excerpt: "A 4-km walk through ancient forests to one of Himachal's most sacred lakes.",
    category: "Adventure",
    date: "Oct 2025",
    read: "7 min read",
    image: serolsarImage,
  },
  {
    slug: "jibhi-in-snow",
    title: "Jibhi in Snow — What to Expect in December to February",
    excerpt: "When it snows, how to get there safely, and why it might be the most magical time to visit.",
    category: "Snowfall",
    date: "Dec 2025",
    read: "6 min read",
    image: petImage,
  },
];

const Blog = () => {
  return (
    <Layout>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-primary text-snow">
        <div className="container-luxury text-center pt-24 pb-12 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-caps text-sky mb-3 block"
          >
            Stories From The Mountains
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-4"
          >
            The Woodpecker Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/85 max-w-2xl mx-auto"
          >
            Travel guides, hidden places, road trips, and stories from Jibhi Valley.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  c === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-mist-light text-primary hover:bg-primary/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-mist">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="heading-card text-primary mt-2 mb-3">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read}</span>
                    </div>
                    <Link to="/blog" className="text-primary font-semibold story-link">
                      Read →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12 p-8 rounded-2xl bg-mist-light border border-border/40">
            <p className="body-regular text-muted-foreground mb-4">
              More stories coming soon. Follow us on Instagram for daily updates.
            </p>
            <a href="https://instagram.com/thewoodpeckerinn" target="_blank" rel="noopener noreferrer">
              <span className="text-primary font-semibold story-link inline-flex items-center gap-2">
                Follow @thewoodpeckerinn <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
