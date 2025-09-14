import { Github, Linkedin } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/bparas22",
      label: "LinkedIn",
      bgColor: "bg-[#0077B5]",
      hoverBg: "hover:bg-[#005582]",
      textColor: "text-white"
    },
    {
      icon: Github,
      href: "https://github.com/IIpxaxsII",
      label: "GitHub", 
      bgColor: "bg-[#171515] dark:bg-white",
      hoverBg: "hover:bg-[#0d1117] dark:hover:bg-gray-100",
      textColor: "text-white dark:text-black"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-darker-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">Get in Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto"></div>
          <p className="text-lg text-muted-foreground mt-6">
            Let's connect and explore opportunities to work together.
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group flex items-center justify-center gap-4 px-8 py-6 rounded-xl 
                    ${link.bgColor} ${link.hoverBg} ${link.textColor}
                    transform transition-all duration-300 ease-in-out
                    hover:scale-105 hover:shadow-2xl
                    border-2 border-transparent hover:border-gradient-to-r hover:from-neon-purple hover:to-neon-cyan
                    relative overflow-hidden
                    min-w-[200px]
                  `}
                >
                  {/* Glowing border effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10 blur-sm"></div>
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Icon className="w-6 h-6 group-hover:animate-pulse" />
                    <span className="font-semibold text-lg">{link.label}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;