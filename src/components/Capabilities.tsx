import { motion } from "framer-motion";
import { Brain, BarChart3, Sparkles, Wrench } from "lucide-react";

const categories = [
  {
    icon: Brain,
    title: "Machine Learning",
    accent: "from-ai-violet/30 to-ai-violet/0",
    skills: [
      "Python",
      "Scikit-learn",
      "PyTorch",
      "Regression",
      "Classification",
      "Model Evaluation",
      "Feature Engineering",
      "Data Preprocessing",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Science",
    accent: "from-ai-blue/30 to-ai-blue/0",
    skills: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Data Cleaning",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "Insight Generation",
    ],
  },
  {
    icon: Sparkles,
    title: "Generative AI & NLP",
    accent: "from-ai-cyan/30 to-ai-cyan/0",
    skills: [
      "LLM Concepts",
      "Prompt Engineering",
      "Embeddings",
      "Semantic Search",
      "RAG Awareness",
      "Basic NLP",
      "Inference Concepts",
    ],
  },
  {
    icon: Wrench,
    title: "Engineering & Tools",
    accent: "from-ai-violet/30 to-ai-cyan/0",
    skills: [
      "Git",
      "GitHub",
      "SQL",
      "DBMS",
      "FastAPI",
      "REST APIs",
      "Supabase",
      "VS Code",
    ],
  },
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ai-cyan mb-3">
            What I Work With
          </p>
          <h2 className="section-heading">
            <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A modern AI stack — from data preparation to retrieval, models, and
            shipping intelligent products.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="glass-card p-6 group relative overflow-hidden"
              >
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${cat.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ai-violet" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-4">
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
