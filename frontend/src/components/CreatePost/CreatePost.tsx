import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import "./CreatePost.css";

function CreatePost() {
  const [post, setPost] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Store file as File object
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store file for upload
      console.log("Image selected", file);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId || !post || !imageFile) {
      console.log("All fields are required: user ID, post content, and image");
      return;
    }
    // Logging the file information
    console.log("User ID:", userId);
    console.log("Post Content:", post);
    console.log("Image File:", imageFile);

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("content", post);
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", "");
    } // Attach image file

    for (let [key, value] of Object.entries(formData)) {
      console.log(`${key}`, `${value}`);
    }

    fetch("http://localhost:5000/api/post", {
      method: "POST",
      body: formData, // Send FormData to server
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("post created successfully: ", data);
        setPost("");
        setImageFile(null);
      })
      .catch((err) => {
        console.error("Error creating post:", err);
      });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        className="post-textarea"
        value={post}
        placeholder="Start a post"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setPost(e.target.value)
        }
      />
      <input
        className="post-image-input"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <button className="post-submit-button" type="submit">
        Post
      </button>
    </form>
  );
}

export default CreatePost;
