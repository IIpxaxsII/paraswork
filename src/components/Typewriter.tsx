import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const Typewriter = ({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseTime = 1600,
  className = "",
}: TypewriterProps) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = window.setTimeout(
        () => {
          setText(
            deleting
              ? current.substring(0, text.length - 1)
              : current.substring(0, text.length + 1)
          );
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }
    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      <span className="gradient-text">{text}</span>
      <span
        aria-hidden
        className="inline-block w-[3px] h-[0.9em] ml-1 align-middle bg-ai-cyan animate-pulse"
      />
    </span>
  );
};

export default Typewriter;
