import { Link, Location } from "react-router-dom";

const Links = ({ location }: { location: Location }) => {
  return (
    <div className="links" data-testid="links">
      <div className={"link-box" + (location.pathname === "/" ? " current-link" : "")} data-testid="link-box-home">
        <Link to="/">Home</Link>
      </div>
      <div
        className={"link-box" + (location.pathname === "/projects" ? " current-link" : "")}
        data-testid="link-box-projects">
        <Link to="/projects">Projects</Link>
      </div>
    </div>
  );
};

export default Links;
