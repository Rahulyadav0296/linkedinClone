import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostDetails } from "../../utils/authSlice";
import { RootState } from "../../utils/store";
import "./Feed.css";
import FeedItem from "./FeedItem";

const Feed: React.FC = () => {
  // const [postDetails, setPostDetails] = useState<Post[]>([]);
  const postDetails =
    useSelector((state: RootState) => state.auth.postDetails) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/post");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        console.log(data);
        dispatch(setPostDetails(data.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      {postDetails &&
        postDetails.map((post: any) => <FeedItem key={post._id} post={post} />)}
    </div>
  );
};

export default Feed;
