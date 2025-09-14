import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "linear-gradient(45deg, hsl(var(--neon-purple)/0.1), hsl(var(--neon-blue)/0.1), hsl(var(--neon-cyan)/0.1))",
            "linear-gradient(45deg, hsl(var(--neon-cyan)/0.1), hsl(var(--neon-purple)/0.1), hsl(var(--neon-blue)/0.1))",
            "linear-gradient(45deg, hsl(var(--neon-blue)/0.1), hsl(var(--neon-cyan)/0.1), hsl(var(--neon-purple)/0.1))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full opacity-40"
          animate={{
            x: [0, 100, 200, 300, 200, 100, 0],
            y: [0, -50, 100, -75, 50, -25, 0],
            scale: [1, 1.5, 1, 2, 1.5, 1, 1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 2,
          }}
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}
      
      {/* Subtle wave effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(var(--neon-blue)/0.2))",
        }}
        animate={{
          transform: ["scaleY(1) translateY(0)", "scaleY(1.2) translateY(-10px)", "scaleY(1) translateY(0)"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;