import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../components/Feed/Feed.css";
import FeedItem from "../../../components/Feed/FeedItem";
import { RootState } from "../../../utils/store";
// Define the type for a post
interface Comment {
  _id: string;
  comment: string;
  user_id: string;
  created_at: string;
}

interface Post {
  _id: string;
  user_id: string;
  content: string;
  comments: Comment[];
  created_at: string;
  image?: string; // Make image optional in case it's not available
  likes_count: number;
}

interface FeedProps {
  user_id: string;
}

const FeedDetails: React.FC<FeedProps> = ({ user_id }) => {
  const postDetails =
    useSelector((state: RootState) => state.auth.postDetails) || [];
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const filterPosts = postDetails.filter(
      (post: any) => post.user_id === user_id
    );
    console.log(filterPosts);
    setPosts(filterPosts);
  }, [user_id, postDetails]);

  console.log("tje filterproject is: ", posts);

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <FeedItem post={post} key={post._id} />
      ))}
    </div>
  );
};

export default FeedDetails;
