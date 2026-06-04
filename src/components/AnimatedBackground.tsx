const AnimatedBackground = () => {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />

      {/* Aurora mesh */}
      <div
        className="absolute -top-40 -left-40 w-[55rem] h-[55rem] rounded-full bg-ai-violet/10 dark:bg-ai-violet/25 blur-[160px] animate-drift"
        style={{ animationDuration: "22s" }}
      />
      <div
        className="absolute top-1/4 -right-52 w-[48rem] h-[48rem] rounded-full bg-ai-cyan/10 dark:bg-ai-cyan/20 blur-[160px] animate-drift"
        style={{ animationDuration: "26s", animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[42rem] h-[42rem] rounded-full bg-ai-blue/10 dark:bg-ai-blue/20 blur-[160px] animate-drift"
        style={{ animationDuration: "28s", animationDelay: "-10s" }}
      />
      <div
        className="absolute top-2/3 right-1/3 w-[32rem] h-[32rem] rounded-full bg-ai-violet/8 dark:bg-ai-violet/15 blur-[140px] animate-drift"
        style={{ animationDuration: "30s", animationDelay: "-14s" }}
      />

      {/* Subtle conic shimmer */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, hsl(var(--ai-violet) / 0.4), hsl(var(--ai-blue) / 0.2), hsl(var(--ai-cyan) / 0.3), hsl(var(--ai-violet) / 0.4))",
          filter: "blur(120px)",
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </div>
  );
};

export default AnimatedBackground;
