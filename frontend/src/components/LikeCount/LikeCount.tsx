import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState } from "react";
import "./LikeCount.css";
interface LikeCountProps {
  user_id: string;
  post_id: string;
  likes_count: number;
}

const LikeCount: React.FC<LikeCountProps> = ({
  user_id,
  post_id,
  likes_count,
}) => {
  const [likesCount, setLikesCount] = useState<number>(likes_count);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      return;
    }

    fetch("http://localhost:5000/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        post_id,
      }), // Send FormData to server
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("likes are: ", data);
        if (data.success) {
          setLikesCount(likesCount + 1);
          setIsLiked(true);
        }
      })
      .catch((err) => {
        console.error("Error creating post:", err);
      });
  };
  return (
    <div className="like-container">
      <button className="like-button" onClick={handleLike} disabled={isLiked}>
        <FavoriteIcon className={`like-icon ${isLiked ? "liked" : ""}`} />
        <span className="likes-count">{likesCount}</span>
      </button>
    </div>
  );
};

export default LikeCount;
