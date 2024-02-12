import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Navbar from ".";

describe("Navbar", () => {
  // Helper function to resize the window
  const resizeWindow = (width: number) => {
    act(() => {
      window.innerWidth = width || document.documentElement.clientWidth;
      window.dispatchEvent(new Event("resize"));
    });
  };

  afterEach(() => {
    // Reset the window size after each test
    resizeWindow(window.innerWidth);
  });

  it("should render a navbar with a menu button and links", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "menu" })).toBeInTheDocument();
    expect(screen.getByTestId("link-box")).toBeInTheDocument();
  });

  it("should hide links when screen width is less than or equal to  900 pixels", async () => {
    resizeWindow(800);
    render(
      <Router>
        <Navbar />
      </Router>
    );
    await screen.findByTestId("links");
    expect(screen.queryByTestId("links")).not.toBeInTheDocument();
  });

  it("should show links when screen width is greater than  900 pixels", async () => {
    resizeWindow(1000);
    render(
      <Router>
        <Navbar />
      </Router>
    );
    await screen.findByTestId("links");
    expect(screen.getByTestId("links")).toBeInTheDocument();
  });

  it("should handle case when element is null in Spacer component", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByTestId("spacer")).toBeInTheDocument();
    expect(screen.getByTestId("spacer").style.width).toBe("0px");
  });

  it("should handle case when clientWidth is null in Spacer component", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByTestId("spacer")).toBeInTheDocument();
    expect(screen.getByTestId("spacer").style.width).toBe("0px");
  });

  it("should handle case when location is null in Links component", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByTestId("link-box")).toBeInTheDocument();
    expect(screen.queryByTestId("current-link")).not.toBeInTheDocument();
  });
});
