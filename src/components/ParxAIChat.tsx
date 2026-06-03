import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
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

interface ParxAIChatProps {
  compact?: boolean;
}

const ParxAIChat = ({ compact = false }: ParxAIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      inputRef.current?.focus();
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-surface/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ai-violet to-ai-cyan flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold leading-tight">ParxAI</p>
          <p className="text-xs text-muted-foreground leading-tight">
            Ask anything about Paras's work
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-ai-cyan flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-pulse" />
          Online
        </span>
      </div>

      <div
        className={`flex-1 overflow-y-auto px-6 py-8 space-y-6 ${
          compact ? "" : "min-h-[520px]"
        }`}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
          >
            {m.role === "assistant" && (
              <div className="w-8 h-8 shrink-0 rounded-lg bg-ai-violet/15 border border-ai-violet/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-ai-violet" />
              </div>
            )}
            <div
              className={
                m.role === "user"
                  ? "max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm bg-gradient-to-br from-ai-violet to-ai-blue text-primary-foreground text-sm leading-relaxed"
                  : "max-w-[85%] text-[15px] text-foreground/90 leading-relaxed pt-1"
              }
            >
              {m.content}
            </div>
            {m.role === "user" && (
              <div className="w-8 h-8 shrink-0 rounded-lg bg-surface border border-border flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        {thinking && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-ai-violet/15 border border-ai-violet/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-ai-violet" />
            </div>
            <div className="flex items-center gap-1 pt-3">
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

      <div className="px-6 py-4 border-t border-border bg-surface/40">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {SUGGESTED_PROMPTS.slice(0, compact ? 3 : 5).map((p) => (
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
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ParxAI anything about Paras…"
            className="flex-1 h-12 px-4 rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ai-violet/50 focus:ring-2 focus:ring-ai-violet/20 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            className="h-12 w-12 rounded-lg bg-gradient-to-r from-ai-violet to-ai-blue text-primary-foreground font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_25px_hsl(var(--ai-violet)/0.4)] transition-shadow"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParxAIChat;
