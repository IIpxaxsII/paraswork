import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import parasCircularProfile from "@/assets/paras-circular-profile.png";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Full Stack Developer";
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-neon-blue/10 to-neon-cyan/10" />
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <motion.div 
          className="text-center lg:text-left space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4">
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="block text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hello.
              </motion.span>
              <motion.span 
                className="block text-muted-foreground text-3xl lg:text-4xl mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I'm Paras
              </motion.span>
              <motion.span 
                className="block gradient-text text-4xl lg:text-6xl mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-neon-cyan"
                >
                  |
                </motion.span>
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Building Modern Digital Solutions
            </motion.p>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              I create scalable applications with clean code and seamless user experiences.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-neon-purple hover:bg-neon-purple/80 text-white glow-hover px-8 py-6 text-lg font-semibold"
              >
                View Projects
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-bg glow-hover px-8 py-6 text-lg font-semibold"
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Right content - Profile Picture with Professional Layout */}
        <motion.div 
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="relative w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {/* Subtle background glow */}
            <motion.div 
              className="absolute -inset-8 bg-gradient-to-r from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main gradient border */}
            <motion.div 
              className="relative w-full h-full rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan p-1 shadow-2xl"
              animate={{ 
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-full h-full bg-background rounded-full p-3">
                <img 
                  src={parasCircularProfile}
                  alt="Paras - Full Stack Developer"
                  className="w-full h-full rounded-full object-cover shadow-inner"
                />
              </div>
            </motion.div>
            
            {/* Subtle floating effect */}
            <motion.div 
              className="absolute inset-4 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"
              animate={{ 
                y: [-5, 5, -5],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;