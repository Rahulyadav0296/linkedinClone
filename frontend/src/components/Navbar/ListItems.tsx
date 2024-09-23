import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface ListItemProps {
  children: ReactNode;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  to: string;
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  setIsCollapsed,
  to,
}) => {
  return (
    <li className="nav-item">
      <NavLink
        style={({ isActive }) => ({
          color: isActive ? "black" : "white",
          backgroundColor: isActive ? "white" : "",
        })}
        className="nav-link"
        to={to}
        onClick={() => {
          setIsCollapsed(true);
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default ListItem;
