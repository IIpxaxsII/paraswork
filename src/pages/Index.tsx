import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import FeaturedProjects from "@/components/FeaturedProjects";
import ParxAI from "@/components/ParxAI";
import FutureSystems from "@/components/FutureSystems";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatedBackground />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <FeaturedProjects />
        <ParxAI />
        <FutureSystems />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
