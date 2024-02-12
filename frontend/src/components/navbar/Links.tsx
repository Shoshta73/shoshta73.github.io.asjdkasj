import { Link, Location } from "react-router-dom";

const Links = ({ location }: { location: Location }) => {
  return (
    <div className="links" data-testid="links">
      <div className={"link-box" + (location.pathname === "/" ? " current-link" : "")} data-testid="link-box">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Links;
