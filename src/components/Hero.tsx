import { Button } from "@/components/ui/button";
import { ArrowRight, Download, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import parasCircularProfile from "@/assets/paras-circular-profile.png";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 pt-24 pb-16 overflow-hidden"
    >
      <div className="container mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center relative z-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-7 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/60 backdrop-blur text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-pulse" />
            Available for Applied AI roles · 2026
          </div>

          <h1 className="font-display font-bold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block text-foreground">Paras Bindra</span>
            <span className="block gradient-text mt-2">Applied AI Engineer</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Building intelligent systems using Machine Learning, Generative AI,
            Data Science, Computer Vision, and AI-powered workflows.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-2xl mx-auto lg:mx-0">
            B.Tech Computer Science Engineering student focused on transforming
            data, models, and AI technologies into practical real-world
            solutions.
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-ai-violet to-ai-blue text-primary-foreground hover:shadow-[0_0_35px_hsl(var(--ai-violet)/0.5)] transition-shadow h-11 px-5 font-semibold"
            >
              View Projects <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 px-5 border-border bg-surface/40 hover:bg-surface hover:border-ai-cyan/50 font-semibold"
            >
              <a href="/resume.pdf" download>
                <Download className="mr-1.5 w-4 h-4" /> Download Resume
              </a>
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="ghost"
              className="h-11 px-5 hover:bg-surface font-semibold"
            >
              <MessageSquare className="mr-1.5 w-4 h-4" /> Contact Me
            </Button>
            <Button
              onClick={() => scrollToSection("parxai")}
              variant="ghost"
              className="h-11 px-5 text-ai-cyan hover:bg-ai-cyan/10 hover:text-ai-cyan font-semibold"
            >
              <Sparkles className="mr-1.5 w-4 h-4" /> Try ParxAI
            </Button>
          </div>
        </motion.div>

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem]">
            <div className="absolute -inset-10 bg-gradient-to-tr from-ai-violet/30 via-ai-blue/20 to-ai-cyan/30 rounded-full blur-3xl animate-drift" />
            <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-ai-violet via-ai-blue to-ai-cyan ai-glow">
              <div className="w-full h-full rounded-full bg-background p-2">
                <img
                  src={parasCircularProfile}
                  alt="Paras Bindra, Applied AI Engineer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-medium bg-surface/90 border border-border backdrop-blur">
              <span className="text-ai-cyan">●</span>{" "}
              <span className="text-foreground/90">B.Tech CSE · CGPA 8.5</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
