"use client";

import Image from "next/image";
import { TextCycler } from "@/components/ui/text-cycle";
import { name, roles, tagline } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section - Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="text-foreground">I&apos;m </span>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>
              
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground">
                <TextCycler words={roles} />
              </div>
            </div>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Get In Touch
              </button>
              <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
                View Projects
              </button>
            </div>
          </div>
          
          {/* Right Section - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full blur-sm opacity-75"></div>
                <div className="relative w-full h-full bg-background rounded-full p-2">
                  <Image
                    src="/profile_photo.webp"
                    alt={name}
                    fill
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-primary/60 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-primary/40 rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}