import { motion } from "framer-motion";
import { ArrowUpRight, Github, BarChart3, BrainCircuit, Eye, Plane, Star } from "lucide-react";

const GITHUB = "https://github.com/IIpxaxsII";

const projects = [
  {
    title: "NeuroRAG",
    tag: "Generative AI · RAG",
    icon: BrainCircuit,
    description:
      "Designed an intelligent retrieval workflow that combines embeddings, semantic search, and contextual response generation to deliver more accurate and grounded AI interactions.",
    tech: ["Embeddings", "Semantic Search", "RAG", "LLM Workflows", "Vector Thinking"],
  },
  {
    title: "Age Prediction Pipeline",
    tag: "Computer Vision · ML",
    icon: Eye,
    description:
      "Built a computer vision pipeline for age estimation using structured image preprocessing, dataset preparation, model training, and evaluation techniques.",
    tech: ["PyTorch", "OpenCV", "Image Preprocessing", "Model Training", "Inference"],
  },
  {
    title: "TripMate AI",
    tag: "AI Product · Full-stack",
    icon: Plane,
    description:
      "Developed an AI-assisted travel planning platform focused on personalized trip organization, streamlined user workflows, and scalable application architecture.",
    tech: ["React", "Supabase", "Auth", "AI UX", "Product Design"],
  },
];

const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ai-cyan mb-3">
            Selected Work
          </p>
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Flagship */}
        <motion.a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="group block glass-card p-8 md:p-10 mb-6 relative overflow-hidden ai-glow"
        >
          <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-ai-violet/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[24rem] h-[24rem] rounded-full bg-ai-cyan/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ai-violet/15 border border-ai-violet/30 text-ai-violet text-xs font-medium mb-4">
                <Star className="w-3 h-3" /> Flagship · Data Science + ML
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">
                Mobile Usage Trend Analysis
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5 max-w-2xl">
                Analyzed mobile usage trends using structured data preprocessing,
                exploratory analysis, feature engineering, and machine learning
                techniques to uncover meaningful behavioral patterns and
                actionable insights.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {[
                  "Pandas",
                  "NumPy",
                  "EDA",
                  "Feature Engineering",
                  "Regression",
                  "Classification",
                  "Model Evaluation",
                  "Visualization",
                ].map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-ai-cyan group-hover:translate-x-1 transition-transform">
                <Github className="w-4 h-4" /> View on GitHub
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-48 h-48 rounded-2xl border border-border bg-surface/60 backdrop-blur flex items-center justify-center">
                <BarChart3 className="w-20 h-20 text-ai-violet" />
              </div>
            </div>
          </div>
        </motion.a>

        {/* Other projects */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.title}
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group glass-card p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center">
                    <Icon className="w-5 h-5 text-ai-cyan" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-ai-violet group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[11px] uppercase tracking-wider text-ai-cyan mb-1">
                  {p.tag}
                </p>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
