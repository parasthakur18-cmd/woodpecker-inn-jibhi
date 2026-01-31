import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-forest text-snow">
      {/* Main Footer */}
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-2xl font-semibold">The Woodpecker Inn</span>
              <span className="block text-xs tracking-[0.2em] text-snow/60 mt-1">JIBHI VALLEY</span>
            </Link>
            <p className="text-snow/70 text-sm leading-relaxed mb-6">
              A luxury mountain retreat nestled in the heart of Jibhi Valley, offering riverside calm, 
              wooden luxury, and warm Himachali hospitality.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/thewoodpeckerinn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-snow/10 hover:bg-snow/20 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-6">Explore</h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Our Rooms", path: "/rooms" },
                { name: "Café & Dining", path: "/cafe" },
                { name: "Nearby Attractions", path: "/attractions" },
                { name: "Pet Friendly Stay", path: "/pet-friendly" },
                { name: "Gallery", path: "/gallery" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-snow/70 hover:text-snow transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+919317224562"
                className="flex items-start gap-3 text-snow/70 hover:text-snow transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+91 93172 24562</span>
              </a>
              <a
                href="mailto:thewoodpeckerinn@gmail.com"
                className="flex items-start gap-3 text-snow/70 hover:text-snow transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>thewoodpeckerinn@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-snow/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Jibhi Valley, Banjar<br />Kullu, Himachal Pradesh<br />India - 175123</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-6">Café Hours</h4>
            <div className="text-snow/70 text-sm space-y-2">
              <p>Breakfast: 8:00 AM - 10:30 AM</p>
              <p>Lunch: 12:30 PM - 3:00 PM</p>
              <p>Dinner: 7:00 PM - 10:00 PM</p>
              <p className="pt-2 text-snow/50">Coffee & snacks available all day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-snow/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-snow/50">
          <p>© {new Date().getFullYear()} The Woodpecker Inn. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-snow transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-snow transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
