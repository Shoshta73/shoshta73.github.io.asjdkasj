import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Links from "./Links";

describe("Links", () => {
  // Mock the location object
  const location = {
    pathname: "/",
    state: null,
    key: "",
    search: "",
    hash: ""
  };

  // Wrap the component with MemoryRouter to provide routing context
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={[location]}>
        <Links location={location} />
      </MemoryRouter>
    );
  };

  it('should render a div with class name "links"', () => {
    renderWithRouter();
    const linksDiv = screen.getByTestId("links");
    expect(linksDiv).toBeInTheDocument();
    expect(linksDiv).toHaveClass("links");
  });

  it('should render a divs with class name "link-box" and a Link component with "Home" text', () => {
    renderWithRouter();
    const linkBoxHome = screen.getByTestId("link-box-home");
    const linkBoxProjects = screen.getByTestId("link-box-projects");
    expect(linkBoxHome).toBeInTheDocument();
    expect(linkBoxProjects).toBeInTheDocument();
    expect(linkBoxHome).toHaveClass("link-box");
    expect(linkBoxProjects).toHaveClass("link-box");

    const homeLink = screen.getByText(/home/i);
    const projectsLink = screen.getByText(/projects/i);
    expect(homeLink).toBeInTheDocument();
    expect(projectsLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
    expect(projectsLink).toHaveAttribute("href", "/projects");
  });

  it('should add "current-link" class to "link-box" div when location.pathname is "/"', () => {
    renderWithRouter();
    const currentLinkBox = screen.getByTestId("link-box-home");
    expect(currentLinkBox).toHaveClass("current-link");
  });

  it('should add "current-link" class to "link-box" div when location.pathname is "/projects"', () => {
    location.pathname = "/projects";

    renderWithRouter();
    const currentLinkBox = screen.getByTestId("link-box-projects");
    expect(currentLinkBox).toHaveClass("current-link");
  });

  it('should not add "current-link" class to "link-box" div when location.pathname is not "/"', () => {
    // Update the location object to simulate a different path
    location.pathname = "/other";
    renderWithRouter();
    const nonCurrentLinkBoxHome = screen.getByTestId("link-box-home");
    const nonCurrentLinkBoxProjects = screen.getByTestId("link-box-projects");
    expect(nonCurrentLinkBoxHome).not.toHaveClass("current-link");
    expect(nonCurrentLinkBoxProjects).not.toHaveClass("current-link");
  });
});
