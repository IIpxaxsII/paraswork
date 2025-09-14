import { Calendar, Clock, Code } from "lucide-react";

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

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={index}
                className="neon-border rounded-xl p-8 glow-hover group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full text-sm font-medium">
                  {project.status}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neon-blue/10 group-hover:animate-glow">
                    <Icon className="w-6 h-6 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            Currently building my portfolio of real-world applications. Stay tuned for exciting projects!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;