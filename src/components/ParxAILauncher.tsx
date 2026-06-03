import { useState } from "react";
import { Bot, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ParxAIChat from "./ParxAIChat";

const ParxAILauncher = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open ParxAI assistant"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-ai-violet to-ai-blue text-primary-foreground flex items-center justify-center shadow-[0_0_30px_hsl(var(--ai-violet)/0.5)] hover:shadow-[0_0_45px_hsl(var(--ai-violet)/0.7)] hover:scale-105 transition-all group"
        >
          <span className="absolute inset-0 rounded-full bg-ai-violet/40 animate-ping opacity-30" />
          <Bot className="w-6 h-6 relative z-10" />
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-md bg-surface border border-border text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask ParxAI
          </span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 bg-background border-l border-border flex flex-col"
      >
        <ParxAIChat compact />
      </SheetContent>
    </Sheet>
  );
};

export default ParxAILauncher;
