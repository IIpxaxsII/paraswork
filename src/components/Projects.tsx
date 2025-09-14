import { Calendar, Clock, Code } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Currently building my portfolio of real-world applications. Stay tuned!",
      status: "Coming Soon",
      tech: ["React", "Java", "MySQL"],
      icon: Code
    },
    {
      title: "Task Management App",
      description: "Currently building my portfolio of real-world applications. Stay tuned!",
      status: "Coming Soon", 
      tech: ["React", "Spring Boot", "PostgreSQL"],
      icon: Calendar
    },
    {
      title: "Real-time Chat Application",
      description: "Currently building my portfolio of real-world applications. Stay tuned!",
      status: "Coming Soon",
      tech: ["React", "WebSocket", "Node.js"],
      icon: Clock
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.section 
      id="projects" 
      className="py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div 
                key={index}
                className="neon-border rounded-xl p-8 glow-hover group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
              >
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full text-sm font-medium">
                  {project.status}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neon-blue/10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 text-neon-blue" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex}
                          className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <p className="text-lg text-muted-foreground">
            Currently building my portfolio of real-world applications. Stay tuned for exciting projects!
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;