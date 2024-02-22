import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectGroup } from ".";

import { Project } from "src/types";

describe("Projects", () => {
  it("should render the title of the project group", () => {
    // Arrange
    const title = "Test Project Group";
    const projects: Project[] = [];

    // Act
    render(<ProjectGroup title={title} projects={projects} />);

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should render no project cards when projects array is empty", () => {
    // Arrange
    const title = "Test Project Group";
    const projects = [];

    // Act
    render(<ProjectGroup title={title} projects={projects} />);

    // Assert
    expect(screen.queryAllByTestId("project-card")).toHaveLength(0);
  });

  it("should fetch sorted projects from API and set state accordingly", async () => {
    // Mock the fetch function
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    // Mock the response object
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        previewable: [{ name: "Project 1", version: "1.0" }],
        nonPreviewable: [{ name: "Project 2", version: "2.0" }],
        planned: [{ name: "Project 3", version: "3.0" }]
      })
    };

    // Mock the fetch implementation
    mockFetch.mockResolvedValue(mockResponse);

    // Render the component
    render(<Projects />);

    // Wait for the fetch to complete
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    // Check that the state is set correctly
    expect(screen.getByText("Projects with Preview")).toBeInTheDocument();
    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Projects without Preview")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
    expect(screen.getByText("Planned Projects")).toBeInTheDocument();
    expect(screen.getByText("Project 3")).toBeInTheDocument();
  });

  it("should display error message when API returns error response", async () => {
    // Mock the fetch function
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    // Mock the response object
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    };

    // Mock the fetch implementation
    mockFetch.mockResolvedValue(mockResponse);

    // Render the component
    render(<Projects />);

    // Wait for the fetch to complete
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    // Check that the error message is displayed
    expect(screen.getByText("Error: An error has occured")).toBeInTheDocument();
  });
});
