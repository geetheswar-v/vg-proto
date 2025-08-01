import { name } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/geetheswar-v", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/geetheswar-v", icon: Linkedin },
    { name: "Email", href: "mailto:geetheswar.edu@gmail.com", icon: Mail }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Full Stack Developer & AI Engineer passionate about creating innovative 
              solutions that bridge technology and human needs.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Major Skills */}
          <div className="space-y-4">
            <h4 className="font-semibold">Major Skills</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Web Development</div>
              <div>AI Integration</div>
              <div>Full Stack Solutions</div>
              <div>API Development</div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
