import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { openWhatsApp } from "@/lib/whatsapp";
import { useWebsiteLead } from "@/hooks/useWebsiteLead";
import { ACTIVE_PROPERTY } from "@/config/properties";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  Calendar,
  User,
  Users,
  Send,
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: "",
  });

  const { submit, loading: isSubmitting } = useWebsiteLead({
    property_name: ACTIVE_PROPERTY.propertyName,
    website: `https://${ACTIVE_PROPERTY.website}`,
  });

  const buildWaMessage = () =>
    [
      "Hello Woodpecker Inn,",
      "",
      "I would like to enquire about accommodation.",
      "",
      `Name: ${formData.name}`,
      `Mobile: ${formData.phone}`,
      `Room: —`,
      `Check-in: ${formData.checkIn || "—"}`,
      `Check-out: ${formData.checkOut || "—"}`,
      `Adults: ${formData.guests || "2"}`,
      `Children: 0`,
      "",
      "Thank you.",
    ].join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const guests = parseInt(formData.guests || "0", 10);
    const res = await submit({
      guest_name: formData.name,
      mobile_number: formData.phone,
      email: formData.email,
      adults: guests > 0 ? guests : 2,
      children: 0,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
    });

    if (!res) {
      toast({
        title: "Something went wrong",
        description:
          "We couldn't submit your enquiry at the moment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    openWhatsApp(ACTIVE_PROPERTY.whatsappNumber, buildWaMessage());
    toast({
      title: "Enquiry sent ✨",
      description: "We've opened WhatsApp so you can chat with us directly.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppChat = () => {
    const lines = [
      "Hi! I'd like to book a stay at The Woodpecker Inn.",
      "",
      formData.name && `Name: ${formData.name}`,
      formData.phone && `Phone: ${formData.phone}`,
      formData.email && `Email: ${formData.email}`,
      formData.checkIn && `Check-in: ${formData.checkIn}`,
      formData.checkOut && `Check-out: ${formData.checkOut}`,
      formData.guests && `Guests: ${formData.guests}`,
      formData.message && `Notes: ${formData.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    openWhatsApp("919317224562", lines);
  };


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
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display mb-6"
          >
            Contact & Booking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="body-large text-snow/90 max-w-2xl mx-auto"
          >
            Ready to experience the magic of Jibhi Valley? Reach out to us 
            and let's plan your perfect mountain getaway.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-snow">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section text-pine mb-8">
                We'd Love to Hear From You
              </h2>

              <div className="space-y-6 mb-10">
                <a
                  href="tel:+919317224562"
                  className="flex items-start gap-4 p-4 rounded-xl bg-pine/5 hover:bg-pine/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-pine/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pine/20 transition-colors">
                    <Phone className="w-5 h-5 text-pine" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-pine mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+91 93172 24562</p>
                    <p className="text-sm text-muted-foreground/70">Available 8 AM - 10 PM IST</p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => openWhatsApp("919317224562", "Hi! I'm interested in booking a stay at The Woodpecker Inn.")}
                  className="w-full text-left flex items-start gap-4 p-4 rounded-xl bg-pine/5 hover:bg-pine/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-pine/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pine/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-pine" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-pine mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground">Quick responses via WhatsApp</p>
                    <p className="text-sm text-muted-foreground/70">Tap to chat with us</p>
                  </div>
                </button>

                <a
                  href="mailto:support@thewoodpeckerinn.in"
                  className="flex items-start gap-4 p-4 rounded-xl bg-pine/5 hover:bg-pine/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-pine/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pine/20 transition-colors">
                    <Mail className="w-5 h-5 text-pine" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-pine mb-1">Email</h3>
                    <p className="text-muted-foreground">support@thewoodpeckerinn.in</p>
                    <p className="text-sm text-muted-foreground/70">We respond within 24 hours</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/thewoodpeckerinnjibhi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-pine/5 hover:bg-pine/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-pine/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pine/20 transition-colors">
                    <Instagram className="w-5 h-5 text-pine" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-pine mb-1">Instagram</h3>
                    <p className="text-muted-foreground">@thewoodpeckerinn</p>
                    <p className="text-sm text-muted-foreground/70">Follow our mountain adventures</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-pine/5">
                  <div className="w-12 h-12 rounded-full bg-pine/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-pine" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-pine mb-1">Location</h3>
                    <p className="text-muted-foreground">VPO Jibhi, Road, Gadagushaini</p>
                    <p className="text-muted-foreground">Jibhi, Himachal Pradesh 175123</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-elevated">
                <h3 className="font-heading text-2xl font-medium text-pine mb-6">
                  Book Your Stay
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-pine mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pine mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pine mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="bg-background"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-pine mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Check-in Date *
                      </label>
                      <Input
                        name="checkIn"
                        type="date"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pine mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Check-out Date *
                      </label>
                      <Input
                        name="checkOut"
                        type="date"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pine mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Number of Guests *
                    </label>
                    <Input
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      placeholder="2"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pine mb-2">
                      Special Requests
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any special requirements? Bringing pets? Celebrating an occasion?"
                      rows={4}
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="pine" 
                    size="xl" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Booking Inquiry
                      </>
                    )}
                  </Button>

                  <div className="relative flex items-center py-1">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-3 text-xs uppercase tracking-wider text-muted-foreground">or</span>
                    <div className="flex-grow border-t border-border"></div>
                  </div>

                  <Button
                    type="button"
                    size="xl"
                    onClick={handleWhatsAppChat}
                    className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We'll confirm availability and pricing within 24 hours.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-mist-light">
        <div className="container-luxury py-8">
          <h3 className="font-heading text-xl font-medium text-pine mb-4 text-center">Find Us</h3>
        </div>
        <div className="h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27035.847539851785!2d77.33!3d31.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390453e15f0e0a0d%3A0x0!2sJibhi%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="The Woodpecker Inn location on Google Maps"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
