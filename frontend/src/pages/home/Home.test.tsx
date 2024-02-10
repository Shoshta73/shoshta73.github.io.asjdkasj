import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import { describe, expect, it } from "vitest";

import Home from ".";

describe("Home", () => {
  it("should render the current date and a greeting message", () => {
    render(<Home />);
    const dn = new Date();
    const currentDate = {
      day: format(dn, "dd"),
      month: format(dn, "MM"),
      weekday: format(dn, "EE"),
      weekdayDisplay: format(dn, "EEEE")
    };
    const greetingMessage = screen.getByText(`Happy ${currentDate.weekdayDisplay}`);
    expect(greetingMessage).toBeInTheDocument();
  });

  it("should display a special message on New Year's Day and Christmas Day", () => {
    render(<Home />);
    const dn = new Date();
    const dateNow = {
      day: format(dn, "dd"),
      month: format(dn, "MM"),
      weekdayDisplay: format(dn, "EEEE")
    };
    if (dateNow.day === "01" && dateNow.month === "01") {
      expect(screen.getByText("Happy Chinese New Year")).toBeInTheDocument();
    } else if (dateNow.day === "25" && dateNow.month === "12") {
      expect(screen.getByText("Merry Christmas")).toBeInTheDocument();
    } else {
      expect(screen.getByText(`Happy ${dateNow.weekdayDisplay}`)).toBeInTheDocument();
    }
  });

  it("should display the full weekday name in the greeting message", () => {
    render(<Home />);
    const dn = new Date();
    const weekdayDisplay = format(dn, "EEEE");
    expect(screen.getByText(`Happy ${weekdayDisplay}`)).toBeInTheDocument();
  });

  it("should have no specific behavior", () => {
    render(<Home />);
    expect(true).toBe(true);
  });

  it("should display the author's name and a brief description", () => {
    render(<Home />);
    expect(screen.getByText("Hi I am Shoshta")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Innovative software developer, problem-solving enthusiast, forever a learner, and passionate explorer, driven to craft beauty through code."
      )
    ).toBeInTheDocument();
  });

  it("should style the content with CSS classes", () => {
    render(<Home />);
    expect(screen.getByTestId("home")).toHaveClass("home");
    expect(screen.getByTestId("about")).toHaveClass("about");
    expect(screen.getByTestId("message")).toHaveClass("message");
    expect(screen.getByTestId("prompt")).toHaveClass("prompt");
  });
});
