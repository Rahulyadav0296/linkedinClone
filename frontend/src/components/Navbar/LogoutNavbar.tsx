import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setToken } from "../../utils/authSlice";
import { RootState } from "../../utils/store";
import "./LogoutNavbar.css";

interface UserContainerProps {
  handleLinkClick: () => void;
  setIsCollapsed: (collapsed: boolean) => void;
}

interface Account {
  profilePicture: string;
  firstName: string;
}

const LogoutNavbar: React.FC<UserContainerProps> = ({
  handleLinkClick,
  setIsCollapsed,
}) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(userId);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/signup/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Response from server is not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    dispatch(setToken(null));
    setIsCollapsed(true);
    navigate("/signup");
  };

  return (
    <ul className="navbar-nav">
      <li style={{ margin: "0px 15px" }}>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#ff6600" : "#000000",
          })}
          className="nav-link"
          to={`/signup/${userId}`}
          onClick={handleLinkClick}
        >
          <img
            src="https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={"User"}
            className="profile-image"
          />
        </NavLink>
      </li>

      <li className="nav-item">
        <button onClick={handleLogout} className="nav-link-logout">
          Logout
        </button>
      </li>
    </ul>
  );
};

export default LogoutNavbar;
