import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the best time to visit Jibhi?",
    answer: "Jibhi is beautiful year-round! Spring (March-May) offers blooming flowers and pleasant weather. Summer (June-August) is perfect for outdoor activities with temperatures around 15-25°C. Autumn (September-November) brings stunning golden foliage. Winter (December-February) offers snow-covered landscapes, though some roads may be affected.",
  },
  {
    question: "How do I reach The Woodpecker Inn, Jibhi?",
    answer: "The nearest airport is Bhuntar Airport (Kullu), about 50 km away. From Delhi, you can take an overnight Volvo bus to Aut (around 10-12 hours), then a local taxi to Jibhi (about 1.5 hours). We can arrange pickup from Aut or Bhuntar. The nearest railway station is Joginder Nagar (65 km).",
  },
  {
    question: "Is The Woodpecker Inn pet-friendly?",
    answer: "Yes! We love having furry guests. Our property has open spaces perfect for pets, and the surrounding trails are ideal for walks. Please inform us in advance if you're bringing a pet so we can make appropriate arrangements.",
  },
  {
    question: "What activities can I do near the inn?",
    answer: "There's plenty to explore! Visit Jalori Pass and Serolsar Lake, trek to Jibhi Waterfall, explore the ancient Chehni Kothi, go fishing in Tirthan River, enjoy birdwatching, or simply relax at our café with a book. We can arrange guides for treks and local tours.",
  },
  {
    question: "Do you serve food at the property?",
    answer: "Absolutely! Our mountain-view café serves breakfast, lunch, and dinner. We specialize in both Himachali cuisine (try our famous Siddu and Dham!) and continental options. Fresh, locally-sourced ingredients are used whenever possible. Coffee and snacks are available throughout the day.",
  },
  {
    question: "Is WiFi available?",
    answer: "Yes, we have WiFi throughout the property. While it's suitable for general browsing and light work, please note that speeds in mountain areas can vary. For heavy uploads or video calls, we recommend downloading content beforehand.",
  },
];

export const FAQ = () => {
  return (
    <section className="section-padding bg-snow">
      <div className="container-luxury max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="label-caps text-wood mb-4 block">FAQs</span>
          <h2 className="heading-section text-pine mb-4">
            Frequently Asked Questions
          </h2>
          <p className="body-regular text-muted-foreground">
            Everything you need to know about staying at The Woodpecker Inn
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 border-none shadow-card"
              >
                <AccordionTrigger className="text-left font-heading text-pine hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {/* Schema Markup for FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })
      }} />
    </section>
  );
};
