const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
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
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="neon-border rounded-lg p-6 text-center glow-hover">
                <div className="text-3xl font-bold gradient-text mb-2">2+</div>
                <p className="text-muted-foreground">Years Learning</p>
              </div>
              
              <div className="neon-border rounded-lg p-6 text-center glow-hover">
                <div className="text-3xl font-bold gradient-text mb-2">5+</div>
                <p className="text-muted-foreground">Technologies</p>
              </div>
              
              <div className="neon-border rounded-lg p-6 text-center glow-hover">
                <div className="text-3xl font-bold gradient-text mb-2">10+</div>
                <p className="text-muted-foreground">Projects Built</p>
              </div>
              
              <div className="neon-border rounded-lg p-6 text-center glow-hover">
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <p className="text-muted-foreground">Dedication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;