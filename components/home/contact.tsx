"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Github, Linkedin, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState("");

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "geetheswar.edu@gmail.com",
      link: "mailto:geetheswar.edu@gmail.com",
      copyable: true
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/geetheswar-v",
      link: "https://www.linkedin.com/in/geetheswar-v",
      copyable: false
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/geetheswar-v",
      link: "https://github.com/geetheswar-v",
      copyable: false
    }
  ];

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s connect and discuss how we can work together on your next project
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-2">{contact.title}</h3>
                      <p className="text-muted-foreground text-sm break-all">
                        {contact.value}
                      </p>
                      <div className="flex gap-2 mt-3">
                        {contact.link && (
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={contact.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {contact.title === "Email" ? "Send Email" : "Visit"}
                            </a>
                          </Button>
                        )}
                        {contact.copyable && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(contact.value, contact.title)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            {copied === contact.title ? "Copied!" : "Copy"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Response Info */}
        <Card className="mb-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Quick Response Promise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Average Response Time</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Response Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">Remote</div>
                <div className="text-sm text-muted-foreground">Work Available</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you need a full-stack web application, AI integration, or technical consulting, 
                I&apos;m here to help bring your vision to reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="mailto:geetheswar.edu@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a 
                    href="https://www.linkedin.com/in/geetheswar-v" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
