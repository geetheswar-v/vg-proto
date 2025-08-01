"use client";

import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Skills from "@/components/home/skills";
import Projects from "@/components/home/projects";
import Contact from "@/components/home/contact";
import Footer from "@/components/home/footer";
import AnimatedBackground from "@/components/ui/bg-stars";
import { GradientBackground } from "@/components/ui/bg-gradient";



export default function Home() {

  return (
    <div className="relative">
      <GradientBackground variant="conic" intensity="medium" animated={true} />
      <AnimatedBackground />
      
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>  
  );
}
