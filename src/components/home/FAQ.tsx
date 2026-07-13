import { motion } from "framer-motion";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What are the check-in and check-out timings?", a: "Check-in is from 1:00 PM and check-out by 11:00 AM. Early check-in and late check-out are on request, subject to availability." },
  { q: "Is parking available at the property?", a: "Yes, free parking is available on-site for cars. The road right up to the property is drivable." },
  { q: "How are the road conditions to Jibhi?", a: "The main highway is smooth. The last stretch through Jibhi has narrow mountain roads but is well-maintained. Any sedan or SUV can reach the property easily." },
  { q: "Are pets allowed?", a: "Yes, well-behaved pets are welcome. Please let us know in advance so we can prepare the right space for you and your companion." },
  { q: "Is bonfire included or extra?", a: "Bonfire is available on request. A small charge applies (₹500) to cover wood and setup, especially in winter." },
  { q: "What are the restaurant timings?", a: "Breakfast 8–10:30 AM, lunch 12:30–3 PM, dinner 7–10 PM. Coffee, snacks and Maggi are available all day." },
  { q: "Is WiFi available?", a: "Yes, we have high-speed WiFi across the property — reliable enough for remote work and video calls, though mountain networks can occasionally fluctuate." },
  { q: "How far is The Woodpecker Inn from the Jibhi bus stand?", a: "We're about 1 km from the main Jibhi bus stand — walkable in 10–12 minutes, or we can arrange a pickup." },
  { q: "Which is the nearest airport?", a: "Bhuntar Airport (Kullu) is the nearest, roughly 50 km / 2 hours away by road." },
  { q: "When is snowfall season in Jibhi?", a: "Snowfall typically happens from mid-December to late February. Jalori Pass gets heavy snow first." },
  { q: "What is the best time to visit Jibhi?", a: "March–June is perfect for pleasant weather and flowers. September–November has stunning golden foliage. December–February is best if you love snow." },
  { q: "How far is Mini Thailand from the property?", a: "Mini Thailand is about 10 km from The Woodpecker Inn — around a 25-minute drive plus a short walk." },
  { q: "How far is Jalori Pass?", a: "Jalori Pass is about 12 km. In summer it's a 30-minute drive; in winter, the road may be affected by snow." },
  { q: "Do you offer taxi and travel assistance?", a: "Yes. We can arrange local taxis, guides, and help you plan day trips to Mini Thailand, Jalori Pass, Serolsar Lake and beyond." },
];

export const FAQ = () => {
  return (
    <section className="section-padding bg-snow">
      <div className="container-luxury max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label-caps text-accent mb-3 block">FAQ</span>
          <h2 className="heading-section text-primary mb-4">Everything you need to know</h2>
          <p className="body-regular text-muted-foreground">
            Practical answers to plan a smooth Jibhi trip.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-xl px-5 border border-border/50 shadow-card"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-primary hover:no-underline py-4 text-sm md:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
};
