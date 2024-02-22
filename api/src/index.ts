import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { prettyJSON } from "hono/pretty-json";

import projects from "./data/projects.json";
import type { Project } from "./types";

const app = new Hono();

app.use("*", cors());
app.use(
  "*",
  csrf({
    origin: [LOCALHOST, URL, WWW, GITHUBPAGES]
  })
);
app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/projects", async (c) => {
  return c.json(projects);
});

app.get("/projects/sort", async (c) => {
  const previewableProjects: Project[] = [];
  const nonPreviewableProjects: Project[] = [];
  const plannedProjects: Project[] = [];
  for (const project of projects) {
    if (project.previewable) {
      previewableProjects.push(project);
    }
    if (!project.previewable && !project.planned) {
      nonPreviewableProjects.push(project);
    }
    if (!project.previewable && project.planned) {
      plannedProjects.push(project);
    }
  }
  return c.json({ previewable: previewableProjects, nonPreviewable: nonPreviewableProjects, planned: plannedProjects });
});

app.get("/projects/:id", async (c) => {
  const project = projects.find((project: Project) => project.id === Number(c.req.param("id")));
  return c.json(project);
});

app.fire();
