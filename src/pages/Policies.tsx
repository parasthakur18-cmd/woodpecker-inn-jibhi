import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="heading-card text-primary mt-8 mb-3">{children}</h2>
);
const P = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-foreground body-regular mb-4">{children}</p>
);

interface PolicyLayoutProps {
  title: string;
  intro: string;
  children: ReactNode;
}

const PolicyLayout = ({ title, intro, children }: PolicyLayoutProps) => (
  <Layout>
    <section className="relative min-h-[30vh] flex items-center justify-center bg-primary text-snow">
      <div className="container-luxury text-center pt-24 pb-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="heading-display mb-3"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="body-regular text-snow/85 max-w-2xl mx-auto"
        >
          {intro}
        </motion.p>
      </div>
    </section>
    <section className="section-padding bg-snow">
      <div className="container-luxury max-w-3xl">
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2026</p>
        {children}
      </div>
    </section>
  </Layout>
);

export const Privacy = () => (
  <PolicyLayout title="Privacy Policy" intro="How we handle the information you share with us.">
    <P>
      The Woodpecker Inn ("we", "our", "us") respects your privacy. This policy
      explains what information we collect, how we use it, and your rights.
    </P>
    <H2>Information We Collect</H2>
    <P>
      When you book a stay or fill our contact form, we collect your name, email,
      phone number, travel dates, guest count, and any special requests you share.
      When you visit our website, we may collect basic analytics like pages viewed and device type.
    </P>
    <H2>How We Use It</H2>
    <P>
      We use your information to respond to your booking inquiry, confirm your stay,
      send trip-related updates (e.g. directions, check-in details), and occasionally
      share news about the property. We do not sell your data to third parties.
    </P>
    <H2>Data Storage</H2>
    <P>
      Booking inquiries are stored securely in our backend. Only authorized team members
      have access. Payment details, when applicable, are handled through trusted third-party
      gateways and are never stored on our servers.
    </P>
    <H2>Cookies</H2>
    <P>
      We use essential cookies for the website to function and basic analytics cookies
      to understand traffic patterns. You can disable cookies in your browser settings.
    </P>
    <H2>Your Rights</H2>
    <P>
      You can request access to, correction of, or deletion of your personal data at any time
      by emailing support@thewoodpeckerinn.in.
    </P>
    <H2>Contact</H2>
    <P>
      Questions? Reach us at support@thewoodpeckerinn.in or +91 93172 24562.
    </P>
  </PolicyLayout>
);

export const Terms = () => (
  <PolicyLayout title="Terms & Conditions" intro="The house rules for a smooth stay with us.">
    <H2>Booking & Payment</H2>
    <P>
      All bookings are confirmed once we receive the required advance payment
      (typically 30% of the total). Full payment is due at check-in unless otherwise agreed.
      Rates are per room per night and inclusive of applicable taxes unless stated.
    </P>
    <H2>Check-in & Check-out</H2>
    <P>
      Check-in is from 1:00 PM and check-out by 11:00 AM. Early check-in and late check-out
      are on request and subject to availability. A valid government-issued photo ID is required at check-in.
    </P>
    <H2>Guest Conduct</H2>
    <P>
      We're a peaceful mountain stay. We ask guests to keep noise low after 10:00 PM,
      be respectful to other guests and our staff, and treat the property, forest and village with care.
      Smoking is not permitted inside rooms.
    </P>
    <H2>Damage & Liability</H2>
    <P>
      Any damage caused to property or furnishings during your stay will be charged.
      The Woodpecker Inn is not liable for loss of personal belongings — please use the lockers provided.
    </P>
    <H2>Pets</H2>
    <P>
      Well-behaved pets are welcome. Please inform us at the time of booking. Pet owners are
      responsible for their pet's behaviour and any damage caused.
    </P>
    <H2>Force Majeure</H2>
    <P>
      In case of natural events (heavy snowfall, landslides, road closures) that prevent us from
      hosting you, we will do our best to reschedule your stay or refund per our cancellation policy.
    </P>
    <H2>Governing Law</H2>
    <P>
      These terms are governed by the laws of India. Any disputes are subject to the jurisdiction
      of courts in Kullu, Himachal Pradesh.
    </P>
  </PolicyLayout>
);

export const Cancellation = () => (
  <PolicyLayout title="Cancellation Policy" intro="Simple, fair, transparent — like a mountain morning.">
    <H2>Free Cancellation Window</H2>
    <P>
      Cancellations made <strong>7 or more days before check-in</strong> receive a full refund
      of the advance paid, minus payment gateway fees.
    </P>
    <H2>Partial Refund</H2>
    <P>
      Cancellations made <strong>3–6 days before check-in</strong> are eligible for a 50% refund
      of the advance paid.
    </P>
    <H2>Non-Refundable Window</H2>
    <P>
      Cancellations made <strong>within 48 hours of check-in</strong>, or no-shows, are non-refundable.
      We're a small property and last-minute cancellations affect our team.
    </P>
    <H2>Rescheduling</H2>
    <P>
      Prefer to reschedule instead? Reach out at least 3 days before check-in and we'll try
      our best to accommodate a new date within the next 6 months, subject to availability.
    </P>
    <H2>Weather & Force Majeure</H2>
    <P>
      In case of heavy snowfall, landslides, or road closures that prevent you from reaching us,
      we'll issue a full refund or reschedule your stay — please share proof (news/road advisory).
    </P>
    <H2>How to Cancel</H2>
    <P>
      Email support@thewoodpeckerinn.in or WhatsApp +91 93172 24562 with your booking details.
      Refunds are processed within 5–7 business days.
    </P>
  </PolicyLayout>
);

export default Privacy;
