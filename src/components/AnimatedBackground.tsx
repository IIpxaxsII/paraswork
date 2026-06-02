const AnimatedBackground = () => {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      {/* Subtle radial glows */}
      <div className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full bg-ai-violet/20 blur-[140px] animate-drift" />
      <div
        className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full bg-ai-cyan/15 blur-[140px] animate-drift"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-ai-blue/15 blur-[140px] animate-drift"
        style={{ animationDelay: "-8s" }}
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
    </div>
  );
};

export default AnimatedBackground;
