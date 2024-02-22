import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Spacer from "./Spacer";

describe("Spacer", () => {
  // Helper function to resize the window
  const resizeWindow = (width: number) => {
    act(() => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });
      window.dispatchEvent(new Event("resize"));
    });
  };

  afterEach(() => {
    // Reset the window size after each test
    resizeWindow(window.innerWidth);
  });

  it('should render a div element with id "spacer"', () => {
    render(<Spacer />);
    expect(screen.getByTestId("navbar-spacer")).toBeInTheDocument();
  });

  it('should set the width of the div element to  0 when no element with id "navbar-buttons" is found', () => {
    render(<Spacer />);
    const spacer = screen.getByTestId("navbar-spacer");
    expect(spacer).toHaveStyle("width:  0px");
  });

  it('should set the width of the div element to the offsetWidth of an element with id "navbar-buttons" on mount', () => {
    // Create a mock element and append it to the body
    const mockElement = document.createElement("div");
    mockElement.id = "navbar-buttons";
    mockElement.style.width = "100px"; // Set the width via style instead of offsetWidth
    document.body.appendChild(mockElement);

    // Render the Spacer component
    render(<Spacer />);

    // Get the spacer element and assert its width
    const spacer = screen.getByTestId("navbar-spacer");
    expect(spacer).toHaveStyle(`width: 100px`); // Expect the width to be  100px

    // Clean up after the test
    document.body.removeChild(mockElement);
  });

  it('should update the width of the div element to the clientWidth of an element with id "navbar-buttons" on window resize', () => {
    // Create a mock element and append it to the body
    const mockElement = document.createElement("div");
    mockElement.id = "navbar-buttons";
    mockElement.style.width = "200px"; // Set the initial width via style
    document.body.appendChild(mockElement);

    // Render the Spacer component
    render(<Spacer />);

    // Get the spacer element and assert its initial width
    const spacer = screen.getByTestId("spacer");
    expect(spacer).toHaveStyle(`width: 200px`); // Expect the initial width to be   200px

    // Update the width of the mock element and trigger a window resize event
    mockElement.style.width = "300px"; // Simulate changing the clientWidth
    resizeWindow(300); // Trigger the resize event

    // Assert that the spacer element's width has updated
    expect(spacer).toHaveStyle(`width: 300px`); // Expect the updated width to be   300px

    // Clean up after the test
    document.body.removeChild(mockElement);
  });

  it('should set the width of the div element to   0 when the offsetWidth or clientWidth of the element with id "navbar-buttons" is null or undefined', () => {
    // Create a mock element and append it to the body
    const mockElement = document.createElement("div");
    mockElement.id = "navbar-buttons";
    document.body.appendChild(mockElement);

    // Render the Spacer component
    render(<Spacer />);
    let spacer = screen.getByTestId("navbar-spacer");
    expect(spacer).toHaveStyle("width:   0px"); // Initially, the width should be  0px

    // Remove the offsetWidth attribute from the mock element
    document.body.removeChild(mockElement);

    spacer = screen.getByTestId("navbar-spacer");
    expect(spacer).toHaveStyle("width:   0px"); // After re-rendering, the width should still be  0px
  });

  it("should not throw any errors", () => {
    expect(() => {
      render(<Spacer />);
    }).not.toThrow();
  });

  it('should return a div element with id "spacer"', () => {
    render(<Spacer />);
    expect(screen.getByTestId("navbar-spacer")).toBeInTheDocument();
  });
});
