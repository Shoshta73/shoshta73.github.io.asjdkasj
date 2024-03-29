import { useEffect, useState } from "react";

const Spacer = () => {
  const [spacerWidth, setSpacerWidth] = useState(0);

  useEffect(() => {
    const navbarButtonsElement = document.getElementById("navbar-buttons");
    if (navbarButtonsElement) {
      setSpacerWidth(navbarButtonsElement.offsetWidth);
      return;
    }
    setSpacerWidth(0);
    return;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const buttonsWidth = document.getElementById("navbar-buttons")?.clientWidth ?? 0;
      setSpacerWidth(buttonsWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div style={{ width: spacerWidth }} id="spacer" data-testid="spacer" />;
};

export default Spacer;
