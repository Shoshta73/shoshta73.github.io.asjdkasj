import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Links from "./Links";
import "./Navbar.css";
import Spacer from "./Spacer";

export default function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <div className="navbar" role="navigation">
      <div className="navbar-container">
        {width <= 900 ? (
          <></>
        ) : (
          <>
            <Spacer />
            <Links location={location} />
          </>
        )}
        <div className="navbar-buttons" id="navbar-buttons">
          <button
            className="navbar-menu-button"
            onClick={() => setExpanded(!expanded)}
            aria-label="menu"
            data-testid="menu-button">
            <MenuIcon size={50} />
          </button>
        </div>
      </div>
      {width < 900 ? (
        expanded && (
          <div className="links-small-screen">
            <Links location={location} />
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
