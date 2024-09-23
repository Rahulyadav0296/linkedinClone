import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/authSlice";
import { RootState } from "../../utils/store";
import FeedDetails from "./FeedDetails/FeedDetails";

interface UserProps {
  _id: string;
  username?: string;
  mobile: string;
  createdAt: string | Date;
}

const User: React.FC<UserProps> = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

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
          console.log("User Details are: ", data.user);
          dispatch(setUser(data.user));
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.message); // Corrected typo
        });
    }
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>; // Ensure it returns this element
  }

  const getDate = (createdAt: string | Date): string => {
    const todayDate = new Date(createdAt);
    return todayDate.toLocaleDateString();
  };

  return (
    <div>
      <p>{user._id}</p>
      <h3>{user.username}</h3>
      <p>{user.mobile}</p>
      <FeedDetails user_id={user._id} />
      <p>Profile Created On: {getDate(user.createdAt)}</p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default User;
