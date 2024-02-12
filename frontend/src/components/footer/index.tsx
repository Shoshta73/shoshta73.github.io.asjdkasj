import { GithubIcon } from "lucide-react";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="social-media">
        <GithubIcon size={50} role="img" aria-label="github icon" />
      </div>
      <p>
        &copy; 2024{" "}
        {import.meta.env.VITE_APP_DEPLOYMENT === "GHP" ? (
          <a href="https://shoshta73.github.io">shoshta73.github.io</a>
        ) : (
          <a href="https://shoshta.net">shoshta.net</a>
        )}
      </p>
    </div>
  );
};

export default Footer;
