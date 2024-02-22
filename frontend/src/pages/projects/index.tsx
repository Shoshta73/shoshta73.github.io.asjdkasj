import Spacer from "@Utils/Spacer";
import { FC, memo, useEffect, useState } from "react";

import ProjectCard from "@Components/projectCard";
import Spinner from "@Components/spinner";

import "./Projects.css";

import { Project } from "src/types";

interface ProjectGroup {
  title: string;
  projects: Project[];
}

export const ProjectGroup: FC<ProjectGroup> = ({ title, projects }) => (
  <>
    <h2 className="project-title">{title}</h2>
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={`${project.name}-${project.version}`} id={project.id} name={project.name} />
      ))}
    </div>
  </>
);

const Projects = memo(() => {
  const [previewable, setPreviewable] = useState<Project[]>([]);
  const [nonPreviewable, setNonPreviewable] = useState<Project[]>([]);
  const [planned, setPlanned] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  let error = null;

  useEffect(() => {
    const fetchSortedProjects = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_ENV === "dev"
            ? `${import.meta.env.VITE_API_DEV}projects/sort`
            : `${import.meta.env.VITE_API_URL}projects/sort`
        );
        console.log(res);
        if (!res.ok) {
          error = { message: `An error has occured` };
        }
        const data = await res.json();
        console.log(data);
        console.log(data.previewable);
        setPreviewable(data.previewable);
        console.log(data.nonPreviewable);
        setNonPreviewable(data.nonPreviewable);
        console.log(data.planned);
        setPlanned(data.planned);
        console.log("🚀 ~ file: index.tsx:32 ~ Projects ~ previewable:", previewable);
        console.log("🚀 ~ file: index.tsx:34 ~ Projects ~ nonPreviewable:", nonPreviewable);
        console.log("🚀 ~ file: index.tsx:36 ~ Projects ~ planned:", planned);
      } catch (err) {
        console.error(err);
        error = { message: err.message };
      } finally {
        setIsLoading(false);
      }
    };

    fetchSortedProjects();
  }, []);

  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="projects">
      <Spacer />
      <h1 className="projects-title">Personal Projects</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {previewable.length !== 0 && <ProjectGroup title="Projects with Preview" projects={previewable} />}
          {nonPreviewable.length !== 0 && <ProjectGroup title="Projects without Preview" projects={nonPreviewable} />}
          {planned.length !== 0 && <ProjectGroup title="Planned Projects" projects={planned} />}
        </>
      )}
    </div>
  );
});

export default Projects;
