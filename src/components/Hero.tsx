import { Button } from "@/components/ui/button";
import parasProfile from "@/assets/paras-profile.png";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-neon-blue/10 to-neon-cyan/10" />
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <div className="text-center lg:text-left space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold">
              <span className="block text-foreground">Hello.</span>
              <span className="block text-muted-foreground text-3xl lg:text-4xl mt-2">I'm Paras</span>
              <span className="block gradient-text text-4xl lg:text-6xl mt-4">Full Stack Developer</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Building Modern Digital Solutions
            </p>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              I create scalable applications with clean code and seamless user experiences.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-neon-purple hover:bg-neon-purple/80 text-white glow-hover px-8 py-6 text-lg font-semibold"
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('contact')}
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-bg glow-hover px-8 py-6 text-lg font-semibold"
            >
              Get in Touch
            </Button>
          </div>
        </div>
        
        {/* Right content - Profile Picture */}
        <div className="flex justify-center lg:justify-end animate-float">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan p-1 animate-glow">
              <div className="bg-background rounded-full p-2">
                <img 
                  src={parasProfile}
                  alt="Paras - Full Stack Developer"
                  className="w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;