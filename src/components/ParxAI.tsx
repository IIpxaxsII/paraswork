import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { answer, SUGGESTED_PROMPTS } from "@/lib/parxai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL: Message = {
  role: "assistant",
  content:
    "Hi, I'm ParxAI — Paras's portfolio assistant. Ask me about his projects, capabilities, or background.",
};

const ParxAI = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      const res = answer(q);
      setMessages((m) => [...m, { role: "assistant", content: res.text }]);
      setThinking(false);
    }, 500);
  };

  return (
    <section id="parxai" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
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
          className="glass-card overflow-hidden ai-glow"
        >
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-surface/60">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ai-violet to-ai-cyan flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-tight">ParxAI</p>
              <p className="text-xs text-muted-foreground leading-tight">
                Knowledge base · v1 · Hardcoded answers
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-ai-cyan flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-pulse" />
              Online
            </span>
          </div>

          <div className="px-5 py-6 max-h-[420px] overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 shrink-0 rounded-md bg-ai-violet/15 border border-ai-violet/30 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-ai-violet" />
                  </div>
                )}
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-br from-ai-violet to-ai-blue text-primary-foreground text-sm"
                      : "max-w-[85%] text-sm text-foreground/90 leading-relaxed"
                  }
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 shrink-0 rounded-md bg-surface border border-border flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-md bg-ai-violet/15 border border-ai-violet/30 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-ai-violet" />
                </div>
                <div className="flex items-center gap-1 pt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ai-violet animate-pulse" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-ai-violet animate-pulse"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-ai-violet animate-pulse"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="px-5 py-3 border-t border-border bg-surface/40">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="chip hover:border-ai-violet/50 hover:text-foreground transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ParxAI anything about Paras…"
                className="flex-1 h-11 px-4 rounded-md bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ai-violet/50 focus:ring-2 focus:ring-ai-violet/20 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="h-11 px-4 rounded-md bg-gradient-to-r from-ai-violet to-ai-blue text-primary-foreground font-semibold text-sm flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_25px_hsl(var(--ai-violet)/0.4)] transition-shadow"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParxAI;
