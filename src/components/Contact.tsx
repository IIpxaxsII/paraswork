import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Paras",
      };

      await emailjs.send(
        'service_ay1t2gc',
        'template_1zlkzbp', 
        templateParams,
        'ff5nydD8VPjiPZOjr'
      );
      
      toast({
        title: "✅ Your message has been sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "❌ Oops, something went wrong. Please try again later.",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
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
        
        {/* Contact Form Section */}
        <div className="mt-20 pt-16 border-t border-muted/20">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Send Me a Message</h3>
            <p className="text-muted-foreground">
              Have a project in mind? I'd love to hear about it.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-slide-up">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 bg-card-bg border border-muted/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300"
                />
              </div>
              
              <div className="animate-slide-up" style={{animationDelay: "0.1s"}}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 bg-card-bg border border-muted/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300"
                />
              </div>
              
              <div className="animate-slide-up" style={{animationDelay: "0.2s"}}>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-card-bg border border-muted/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300 resize-none"
                />
              </div>
              
              <div className="animate-slide-up" style={{animationDelay: "0.3s"}}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className={`w-5 h-5 mr-3 ${isSubmitting ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;