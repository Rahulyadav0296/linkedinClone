import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Root.css";

function Root() {
  return (
    <div className="root-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
