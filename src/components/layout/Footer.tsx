import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, MapPin, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-snow">
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-semibold">The Woodpecker Inn</span>
              <span className="block text-[10px] tracking-[0.28em] text-snow/60 mt-1">JIBHI · HIMACHAL PRADESH</span>
            </Link>
            <p className="text-snow/75 text-sm leading-relaxed mb-6">
              A peaceful mountain stay in the heart of Jibhi Valley. Wake up to the mountains,
              enjoy real Himachali food, and slow down in the forest.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/thewoodpeckerinn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-snow/10 hover:bg-snow/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.thewoodpeckerinn.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="p-2 rounded-full bg-snow/10 hover:bg-snow/20 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-5">Explore</h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Rooms", path: "/rooms" },
                { name: "Dormitory", path: "/dormitory" },
                { name: "Café", path: "/cafe" },
                { name: "Explore Jibhi", path: "/attractions" },
                { name: "Gallery", path: "/gallery" },
                { name: "Blog", path: "/blog" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-snow/75 hover:text-snow transition-colors text-sm">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-5">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+919317224562" className="flex items-start gap-3 text-snow/75 hover:text-snow transition-colors text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+91 93172 24562</span>
              </a>
              <a
                href="mailto:support@thewoodpeckerinn.in"
                className="flex items-start gap-3 text-snow/75 hover:text-snow transition-colors text-sm"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>support@thewoodpeckerinn.in</span>
              </a>
              <div className="flex items-start gap-3 text-snow/75 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>VPO Jibhi, Road, Gadagushaini,<br />Jibhi, Himachal Pradesh 175123</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-5">Café Hours</h4>
            <div className="text-snow/75 text-sm space-y-2">
              <p>Breakfast · 8:00 – 10:30 AM</p>
              <p>Lunch · 12:30 – 3:00 PM</p>
              <p>Dinner · 7:00 – 10:00 PM</p>
              <p className="pt-2 text-snow/55">Coffee & snacks all day</p>
            </div>
            <div className="mt-6 pt-6 border-t border-snow/10">
              <h4 className="font-heading text-sm font-semibold mb-3 text-snow/80">Policies</h4>
              <div className="flex flex-col gap-2 text-xs">
                <Link to="/privacy" className="text-snow/60 hover:text-snow transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-snow/60 hover:text-snow transition-colors">Terms & Conditions</Link>
                <Link to="/cancellation" className="text-snow/60 hover:text-snow transition-colors">Cancellation Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-snow/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-snow/50">
          <p>© {new Date().getFullYear()} The Woodpecker Inn · Jibhi, Himachal Pradesh</p>
          <p>Made with care in the mountains 🌲</p>
        </div>
      </div>
    </footer>
  );
};
