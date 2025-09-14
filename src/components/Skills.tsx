import { Code, Database, Globe, Zap } from "lucide-react";

const Skills = () => {
  const skills = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Building end-to-end web applications with modern technologies and best practices.",
      color: "neon-purple"
    },
    {
      icon: Globe,
      title: "React.js",
      description: "Creating dynamic and responsive user interfaces with React ecosystem.",
      color: "neon-blue"
    },
    {
      icon: Database,
      title: "Java",
      description: "Developing robust backend solutions and enterprise applications.",
      color: "neon-cyan"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Ensuring fast, efficient, and scalable application performance.",
      color: "neon-purple"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-darker-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="neon-border rounded-xl p-8 text-center glow-hover group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${skill.color}/10 mb-6 group-hover:animate-glow`}>
                  <Icon className={`w-8 h-8 text-${skill.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">{skill.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;