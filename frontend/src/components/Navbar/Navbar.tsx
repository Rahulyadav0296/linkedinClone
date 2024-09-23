import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LoginDetails from "./LoginDetails";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const handleToggle = () => setIsCollapsed(!isCollapsed);
  const handleLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 border-body">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <img
            src="data:image/png;base64,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"
            alt="The logo"
            width="57"
            height="57"
            className="navbar-logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "white" : "orange",
                  textDecoration: isActive ? "underline" : "",
                })}
                className="nav-link"
                to="/"
                onClick={() => {
                  setIsCollapsed(true);
                }}
              >
                <span className="home-navbar">
                  <HomeIcon /> Home
                </span>
              </NavLink>
            </li>
          </ul>
          <LoginDetails
            handleLinkClick={handleLinkClick}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
