import Projects from "@/components/projects/project";
import { getProjects } from "../actions/project";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Utsav Joshi",
  description: "Explore my portfolio of projects showcasing my skills in web development, software engineering, and more.",
};

export default async function ProjectsPage() {
  const { projects, error } = await getProjects();

  return (
    <div className="space-y-12" itemScope itemType="https://schema.org/ItemList">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" itemProp="name">All Projects</h1>
        <p className="text-muted-foreground mt-2" itemProp="description">
          A complete collection of my work
        </p>
      </div>

      {error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Error: {error}</p>
        </div>
      ) : !projects || projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      ) : (
        <Projects projects={projects} />
      )}
    </div>
  );
}
