import PersonIcon from "@mui/icons-material/Person";

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../utils/store";
import LogoutNavbar from "./LogoutNavbar";

interface LoginDetailsProps {
  handleLinkClick: () => void;
  setIsCollapsed: (collapsed: boolean) => void;
}

const LoginDetails: React.FC<LoginDetailsProps> = ({
  handleLinkClick,
  setIsCollapsed,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("Token is coming from login details: ", token);
  return (
    <ul className="navbar-nav">
      {token === null ? (
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => ({
              padding: "0px 5px 20px 5px",
              color: isActive ? "#ff6600" : "#ffffff",
            })}
            className="nav-link"
            to="/signup"
            onClick={handleLinkClick}
          >
            <PersonIcon className="icon" />
          </NavLink>
        </li>
      ) : (
        <>
          <LogoutNavbar
            handleLinkClick={handleLinkClick}
            setIsCollapsed={setIsCollapsed}
          />
        </>
      )}
    </ul>
  );
};

export default LoginDetails;
