import React, { useEffect, useState } from "react";
import "./UserDetails.css";
interface User {
  username: string;
}

interface UserDetailsProps {
  user_id: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user_id }) => {
  const [user, setUser] = useState<User | null>(null); // Correct typing with `User | null`
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (user_id && user_id.match(/^[0-9a-fA-F]{24}$/)) {
      fetch(`http://localhost:5000/api/signup/${user_id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Response from server is not ok");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data.user);
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.message); // Corrected typo
        });
    }
  }, [user_id]);

  return (
    <div className="container">
      {user ? (
        <p className="username">{user.username}</p>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default UserDetails;
