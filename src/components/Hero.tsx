import { Button } from "@/components/ui/button";
import parasCircularProfile from "@/assets/paras-circular-profile.png";

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
        
        {/* Right content - Profile Picture with Professional Layout */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 animate-fade-in-scale">
            {/* Subtle background glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Main gradient border */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan p-1 shadow-2xl animate-glow">
              <div className="w-full h-full bg-background rounded-full p-3">
                <img 
                  src={parasCircularProfile}
                  alt="Paras - Full Stack Developer"
                  className="w-full h-full rounded-full object-cover shadow-inner"
                />
              </div>
            </div>
            
            {/* Subtle floating effect */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;