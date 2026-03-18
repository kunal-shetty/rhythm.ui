import Navbar            from "@/components/Navbar";
import Hero              from "@/components/Hero";
import Marquee           from "@/components/Marquee";
import Stats             from "@/components/Stats";
import ComponentsPreview from "@/components/ComponentsPreview";
import Features          from "@/components/Features";
import Frameworks        from "@/components/Frameworks";
import CTA               from "@/components/CTA";
import Footer            from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LightCursor from "@/components/LightCursor";

export default function Home() {
  return (
    <>
    <LightCursor
  trailLength={12}   // shorter = lighter
  dotSize={4}
  fadeSpeed={0.12}   // higher = fades faster
  colors={["#7c6fff", "#ff6fa8", "#6fffd4"]}
/>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <ComponentsPreview />
        <Features />
        <Frameworks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
