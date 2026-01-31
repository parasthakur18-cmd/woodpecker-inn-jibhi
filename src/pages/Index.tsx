import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { CafePreview } from "@/components/home/CafePreview";
import { AttractionsPreview } from "@/components/home/AttractionsPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutPreview />
      <RoomsPreview />
      <CafePreview />
      <AttractionsPreview />
      <Testimonials />
      <FAQ />
      <CTASection />
    </Layout>
  );
};

export default Index;
