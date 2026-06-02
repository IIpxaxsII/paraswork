import { motion } from "framer-motion";
import {
  Brain,
  Network,
  Workflow,
  Bot,
  Database,
  Layers,
  Cpu,
  GitBranch,
} from "lucide-react";

const items = [
  { icon: Brain, title: "Agentic Memory Systems", desc: "Long-term, retrievable memory for autonomous AI agents." },
  { icon: Database, title: "Hybrid Retrieval Pipelines", desc: "Combining keyword, vector, and rerankers for grounded answers." },
  { icon: Workflow, title: "AI Workflow Automation", desc: "Orchestrating models, tools, and data into useful workflows." },
  { icon: Bot, title: "Multi-Agent Systems", desc: "Specialized agents collaborating on complex tasks." },
  { icon: Layers, title: "Knowledge Retrieval Platforms", desc: "Searchable, structured knowledge powered by embeddings." },
  { icon: GitBranch, title: "RAG-Based Applications", desc: "Production-grade RAG with citations and evaluation." },
  { icon: Network, title: "AI Orchestration Systems", desc: "Coordinating LLMs, tools, and pipelines reliably." },
  { icon: Cpu, title: "Intelligent AI Pipelines", desc: "End-to-end pipelines: ingest → embed → retrieve → reason." },
];

const FutureSystems = () => {
  return (
    <section id="future" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ai-cyan mb-3">
            Currently Exploring
          </p>
          <h2 className="section-heading">
            Future <span className="gradient-text">AI Systems</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Where I'm headed as an Applied AI Engineer — the systems and
            patterns shaping practical AI.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                className="glass-card p-5 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg border border-border bg-surface flex items-center justify-center group-hover:border-ai-violet/40 transition-colors">
                    <Icon className="w-4 h-4 text-ai-violet" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-ai-cyan">
                    Exploring
                  </span>
                </div>
                <h3 className="font-display font-semibold text-base mb-1.5">
                  {it.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {it.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FutureSystems;
