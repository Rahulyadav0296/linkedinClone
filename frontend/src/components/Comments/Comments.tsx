import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentToPost } from "../../utils/authSlice"; // Import the action
import { RootState } from "../../utils/store";
import UserDetails from "../Feed/UserDetails";
import "./Comments.css";

interface CommentsProps {
  user_id: string;
  post_id: string;
}

interface Comment {
  _id: string;
  comment: string;
  user_id: string;
  created_at: string;
}

interface PostProps {
  _id: string;
  content: string;
  comments: string[]; // Assuming comments are stored as an array of comment IDs
  created_at: string;
  image?: string;
  likes_count: number;
  user_id: string;
}

const Comments: React.FC<CommentsProps> = ({ user_id, post_id }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState<string>(""); // State for input text
  const [comments, setComments] = useState<Comment[]>([]); // Array of comments

  const postDetails =
    useSelector((state: RootState) => state.auth.postDetails) || [];
  const dispatch = useDispatch(); // Use dispatch to send actions

  // Fetch comments for a specific post
  const handleShowComment = async (postId: string) => {
    const post = postDetails.find((post: PostProps) => post._id === postId);
    console.log("Fetching comments for post:", post?.comments);

    if (post) {
      try {
        // Map through the comments array to create an array of fetch promises
        const commentPromises = post.comments.map((commentId) =>
          fetch(`http://localhost:5000/api/comment/${commentId}`).then((res) =>
            res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`)
          )
        );
        const commentsData = await Promise.all(commentPromises);

        console.log("Fetched comments:", commentsData);
        setComments(commentsData); // Store fetched comments
        setShowComments((prevShowComments) => !prevShowComments); // Toggle comments view
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
  };

  // Handle comment submission
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          post_id,
          comment: commentText, // Comment text to be sent in body
        }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("Comment posted successfully:", data);
        // Dispatch action to update Redux store
        dispatch(
          addCommentToPost({
            postId: post_id,
            comment: data.comment,
          })
        );
        setCommentText(""); // Clear input after submission
      } else {
        console.error("Failed to post comment:", data.message);
      }
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  console.log(comments);

  return (
    <div className="comment-container">
      <button
        className="toggle-comments-button"
        onClick={() => handleShowComment(post_id)}
      >
        <QuestionAnswerIcon className="comment-icon" />
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div className="comments-section">
          <form className="comment-form" onSubmit={handleComment}>
            <input
              className="comment-input"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={`${comment._id}-${index}`} className="comment-item">
                  <div className="comment-header">
                    <UserDetails user_id={comment.user_id} />
                    <small className="comment-date">
                      {new Date(comment.created_at).toLocaleString()}
                    </small>
                  </div>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
