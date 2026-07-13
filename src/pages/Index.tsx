import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyLove } from "@/components/home/WhyLove";
import { RoomsSection } from "@/components/home/RoomsSection";
import { CafeSection } from "@/components/home/CafeSection";
import { ExperienceJibhi } from "@/components/home/ExperienceJibhi";
import { GallerySection } from "@/components/home/GallerySection";
import { Reviews } from "@/components/home/Reviews";
import { Amenities } from "@/components/home/Amenities";
import { FAQ } from "@/components/home/FAQ";
import { LocationSection } from "@/components/home/LocationSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustBar />
      <WhyLove />
      <RoomsSection />
      <CafeSection />
      <ExperienceJibhi />
      <GallerySection />
      <Reviews />
      <Amenities />
      <FAQ />
      <LocationSection />
    </Layout>
  );
};

export default Index;
