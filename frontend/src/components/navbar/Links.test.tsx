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

  it('should render a div with class name "link-box" and a Link component with "Home" text', () => {
    renderWithRouter();
    const linkBox = screen.getByTestId("link-box");
    expect(linkBox).toBeInTheDocument();
    expect(linkBox).toHaveClass("link-box");

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it('should add "current-link" class to "link-box" div when location.pathname is "/"', () => {
    renderWithRouter();
    const currentLinkBox = screen.getByTestId("link-box");
    expect(currentLinkBox).toHaveClass("current-link");
  });

  it('should not add "current-link" class to "link-box" div when location.pathname is not "/"', () => {
    // Update the location object to simulate a different path
    location.pathname = "/other";
    renderWithRouter();
    const nonCurrentLinkBox = screen.getByTestId("link-box");
    expect(nonCurrentLinkBox).not.toHaveClass("current-link");
  });
});
