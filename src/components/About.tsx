import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto"></div>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-6" variants={itemVariants}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As a full stack developer with a strong foundation in React.js and Java, I build scalable and robust web applications. My passion lies in crafting efficient and clean code that powers seamless user experiences.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm dedicated to applying strong coding fundamentals to every project, ensuring high-quality, maintainable, and performance-driven solutions.
            </p>
            
            <div className="neon-border rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-neon-cyan mb-4">Education</h3>
              <p className="text-muted-foreground">
                Currently pursuing <span className="text-foreground font-medium">B.Tech in Computer Science and Engineering</span> from Punjab Technical University.
              </p>
            </div>
          </motion.div>
          
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "2+", label: "Years Learning" },
                { value: "5+", label: "Technologies" },
                { value: "10+", label: "Projects Built" },
                { value: "100%", label: "Dedication" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="neon-border rounded-lg p-6 text-center glow-hover"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;