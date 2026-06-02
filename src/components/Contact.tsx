import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const EMAIL = "parasbindra22@gmail.com"; // mailto fallback

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive",
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
        "service_ay1t2gc",
        "template_1zlkzbp",
        templateParams,
        "ff5nydD8VPjiPZOjr"
      );
      toast({
        title: "✅ Message sent successfully",
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "❌ Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socials = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/bparas22",
      hint: "Connect professionally",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/IIpxaxsII",
      hint: "See the code",
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${EMAIL}`,
      hint: EMAIL,
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ai-cyan mb-3">
            Contact
          </p>
          <h2 className="section-heading">
            Let's build something <span className="gradient-text">intelligent</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Open to Applied AI Engineer, ML Engineer, and AI Engineer
            opportunities — and collaborations on practical AI products.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg border border-border bg-surface flex items-center justify-center group-hover:border-ai-violet/40 transition-colors">
                    <Icon className="w-5 h-5 text-ai-violet" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{s.label}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {s.hint}
                    </p>
                  </div>
                  <span className="text-ai-cyan text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </a>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-6 space-y-4"
          >
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-11 bg-background border-border focus-visible:ring-ai-violet/30 focus-visible:border-ai-violet/50"
            />
            <Input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11 bg-background border-border focus-visible:ring-ai-violet/30 focus-visible:border-ai-violet/50"
            />
            <Textarea
              name="message"
              placeholder="Tell me about your project, role, or idea…"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-background border-border focus-visible:ring-ai-violet/30 focus-visible:border-ai-violet/50 resize-none"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-ai-violet to-ai-blue text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(var(--ai-violet)/0.45)] transition-shadow disabled:opacity-70"
            >
              <Send
                className={`w-4 h-4 mr-2 ${isSubmitting ? "animate-pulse" : ""}`}
              />
              {isSubmitting ? "Sending…" : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
