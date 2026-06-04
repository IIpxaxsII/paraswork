import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ParxAIChat from "./ParxAIChat";

const ParxAI = () => {
  return (
    <section id="parxai" className="py-12 px-3 md:py-24 md:px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ai-violet/30 bg-ai-violet/10 text-ai-violet text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" /> AI Assistant
          </div>
          <h2 className="section-heading">
            Meet <span className="gradient-text">ParxAI</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Your AI guide to my projects, skills, and engineering journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="glass-card overflow-hidden ai-glow h-[calc(100svh-8rem)] max-h-[640px] md:h-[680px] md:max-h-none"
        >
          <ParxAIChat />
        </motion.div>
      </div>
    </section>
  );
};

export default ParxAI;
