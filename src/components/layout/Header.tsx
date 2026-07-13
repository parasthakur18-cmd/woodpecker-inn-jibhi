import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Rooms", path: "/rooms" },
  { name: "Dormitory", path: "/dormitory" },
  { name: "Café", path: "/cafe" },
  { name: "Explore Jibhi", path: "/attractions" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location]);

  const isHomeHero = location.pathname === "/" && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-snow/95 backdrop-blur-md shadow-soft py-3"
            : "bg-gradient-to-b from-charcoal/40 to-transparent backdrop-blur-[2px] py-5"
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`transition-colors duration-300 ${isHomeHero ? "text-snow" : "text-primary"}`}>
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" className="transition-transform group-hover:scale-105">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.8" />
                <path d="M14 22 L18 26 L28 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className={`transition-colors duration-300 ${isHomeHero ? "text-snow" : "text-primary"}`}>
              <span className="font-heading text-lg md:text-xl font-semibold tracking-tight leading-none block">The Woodpecker Inn</span>
              <span className="hidden md:block text-[10px] tracking-[0.28em] opacity-70 mt-0.5">JIBHI · HIMACHAL</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                  isHomeHero
                    ? location.pathname === link.path
                      ? "text-snow bg-snow/15"
                      : "text-snow/90 hover:text-snow hover:bg-snow/10"
                    : location.pathname === link.path
                    ? "text-primary bg-primary/8"
                    : "text-charcoal/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919317224562"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isHomeHero ? "text-snow" : "text-primary"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+91 93172 24562</span>
            </a>
            <Link to="/contact">
              <Button variant={isHomeHero ? "hero" : "forest"} size="lg">
                Book Now
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isHomeHero ? "text-snow hover:bg-snow/10" : "text-primary hover:bg-primary/10"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-primary/97 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
            <nav className="relative pt-24 px-6 flex flex-col gap-2 max-h-screen overflow-y-auto pb-32">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 text-lg font-heading transition-colors rounded-lg ${
                      location.pathname === link.path
                        ? "text-snow bg-snow/15"
                        : "text-snow/85 hover:text-snow hover:bg-snow/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-col gap-3"
              >
                <a
                  href="tel:+919317224562"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-snow border border-snow/30 rounded-lg"
                >
                  <Phone className="w-5 h-5" />
                  Call +91 93172 24562
                </a>
                <Link to="/contact">
                  <Button variant="hero" size="xl" className="w-full">
                    Book Your Stay
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
