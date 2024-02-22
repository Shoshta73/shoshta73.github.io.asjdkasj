import { useEffect, useState } from "react";

export default function Spacer() {
  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    const navbarElement = document.getElementById("navbar");
    if (navbarElement !== null) {
      setSpacerHeight(navbarElement.offsetHeight);
      return;
    } else {
      setSpacerHeight(0);
      return;
    }
  }, []);
  return <div style={{ width: "100%", height: spacerHeight }} id="spacer" data-testid="spacer" />;
}
