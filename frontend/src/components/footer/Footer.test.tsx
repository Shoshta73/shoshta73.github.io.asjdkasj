import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

import Footer from ".";

// Assuming Footer is the default export

describe("Footer", () => {
  it("should render a div with class 'footer' when Footer is rendered", () => {
    const { container } = render(<Footer />);
    const footerDiv = container.querySelector(".footer");
    expect(footerDiv).not.toBeNull();
  });

  it("should render a div with class 'social-media' inside the footer div when Footer is rendered", () => {
    const { container } = render(<Footer />);
    const socialMediaDiv = container.querySelector(".footer .social-media");
    expect(socialMediaDiv).not.toBeNull();
  });

  it("should render a GithubIcon component inside the social-media div when Footer is rendered", () => {
    const { getByRole } = render(<Footer />);
    const githubIcon = getByRole("img", { name: /github icon/i }); // Assuming GithubIcon has 'aria-label' set to 'github icon'
    expect(githubIcon).toBeInTheDocument();
  });

  it("should not provide a size prop to GithubIcon when Footer is rendered", () => {
    const { getByRole } = render(<Footer />);
    const githubIcon = getByRole("img", { name: /github icon/i });
    expect(githubIcon).not.toHaveAttribute("size");
  });

  it("should trigger a click event on the anchor tag when it is clicked", async () => {
    const { getByText } = render(<Footer />);
    const link = getByText("shoshta.net"); // Replace '/link text/i' with the actual text or aria-label of the link
    await fireEvent.click(link);
    // Add assertions here if needed, e.g., checking for navigation or state changes
  });

  it("should trigger a mouseover event on the anchor tag when it is hovered over", async () => {
    const { getByText } = render(<Footer />);
    const link = getByText("shoshta.net"); // Replace '/link text/i' with the actual text or aria-label of the link
    await fireEvent.mouseOver(link);
    // Add assertions here if needed, e.g., checking for tooltip appearance
  });
});
