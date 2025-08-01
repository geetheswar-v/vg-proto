import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/constants";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and experiments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold leading-tight">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-6 flex-1">
                  {project.description}
                </p>
                
                <div className="flex gap-3 mt-auto">
                  {/* If both demo and github exist, show demo as full button and github as icon */}
                  {project.demo_link && project.github_link && 
                   project.demo_link !== "Coming Soon" && project.github_link !== "Coming Soon" ? (
                    <>
                      <Button asChild className="flex-1">
                        <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </>
                  ) : 
                  /* If only github exists and is not "Coming Soon" */
                  project.github_link && project.github_link !== "Coming Soon" ? (
                    <Button asChild className="flex-1">
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  ) : 
                  /* If only demo exists and is not "Coming Soon" */
                  project.demo_link && project.demo_link !== "Coming Soon" ? (
                    <Button asChild className="flex-1">
                      <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  ) : (
                    /* Coming Soon state */
                    <Button disabled className="flex-1">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see more of my work?
          </p>
          <Button variant="outline" asChild>
            <a href="https://github.com/geetheswar-v" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
