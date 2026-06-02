import { motion } from "framer-motion";
import { GraduationCap, Brain, Sparkles, Database, Eye, Boxes } from "lucide-react";

const focusAreas = [
  { icon: Brain, label: "Machine Learning" },
  { icon: Sparkles, label: "Generative AI" },
  { icon: Database, label: "Retrieval Systems" },
  { icon: Eye, label: "Computer Vision" },
  { icon: Boxes, label: "AI Product Development" },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ai-cyan mb-3">About</p>
          <h2 className="section-heading">
            Engineering <span className="gradient-text">useful AI</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <p className="text-lg text-foreground/90 leading-relaxed">
              I build AI-powered applications and machine learning workflows
              with a focus on practical implementation, intelligent automation,
              and real-world impact.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              My interests span machine learning, generative AI, retrieval
              systems, computer vision, and the engineering of useful AI
              products — translating models and data into shipped experiences.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="chip">B.Tech CSE</span>
              <span className="chip">CGPA 8.5</span>
              <span className="chip">Expected 2026</span>
              <span className="chip">Punjab Technical University</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-ai-violet/15 border border-ai-violet/30 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-ai-violet" />
              </div>
              <h3 className="font-display font-semibold">Focus Areas</h3>
            </div>
            <ul className="space-y-3">
              {focusAreas.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm text-foreground/90"
                >
                  <Icon className="w-4 h-4 text-ai-cyan" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
