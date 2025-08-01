import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experience } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating innovative solutions that bridge the gap between AI and web development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Personal Story */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a passionate Full Stack Developer and AI Engineer with a deep love for creating 
                intelligent applications that solve real-world problems. My journey in technology started 
                with curiosity about how things work and evolved into a mission to build solutions that 
                make a difference.
              </p>
              <p>
                I specialize in developing end-to-end web applications using modern technologies like 
                Next.js, React, and Python. My expertise spans from crafting intuitive user interfaces 
                to designing robust backend systems and integrating AI capabilities.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring the latest AI research, contributing to 
                open-source projects, or experimenting with new technologies that push the boundaries 
                of what&apos;s possible.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Experience</h3>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start flex-col sm:flex-row gap-2">
                      <div>
                        <h4 className="text-lg font-semibold">{exp.role}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {exp.duration}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}