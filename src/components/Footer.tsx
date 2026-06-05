import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-darker-bg/60 backdrop-blur py-10 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display font-semibold">Paras Bindra</p>
          <p className="text-xs text-muted-foreground">Applied AI Engineer</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/IIpxaxsII"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-md border border-border bg-surface flex items-center justify-center hover:border-ai-violet/40 hover:text-ai-violet transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/bparas22"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-md border border-border bg-surface flex items-center justify-center hover:border-ai-violet/40 hover:text-ai-violet transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Paras Bindra. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
