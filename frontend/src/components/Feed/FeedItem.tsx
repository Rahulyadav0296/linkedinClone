import React from "react";
import Comments from "../Comments/Comments";
import LikeCount from "../LikeCount/LikeCount";
import "./Feed.css";
import UserDetails from "./UserDetails";

interface Post {
  _id: string;
  user_id: string;
  content: string;
  comments: Comment[];
  created_at: string;
  image?: string; // Make image optional in case it's not available
  likes_count: number;
}

interface FeedItemProps {
  post: Post;
}

const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
  return (
    <div key={post._id} className="post-container">
      <div className="post-header">
        <UserDetails user_id={post.user_id} />
        <p className="post-date">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
      <p className="post-content">{post.content}</p>
      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          alt={post.content}
          className="post-image"
          style={{ width: "300px", height: "auto" }}
        />
      )}
      <div className="interaction-section">
        <LikeCount
          user_id={post.user_id}
          post_id={post._id}
          likes_count={post.likes_count}
        />
        <Comments user_id={post.user_id} post_id={post._id} />
      </div>
    </div>
  );
};

export default FeedItem;
