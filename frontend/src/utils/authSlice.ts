import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const [products, setProducts] = useState([]);
interface UserProps {
  _id: string;
  username?: string;
  mobile: string;
  createdAt: string | Date;
}

interface Comment {
  _id: string;
  comment: string;
  user_id: string;
  created_at: string | Date;
}

interface PostProps {
  _id: string;
  user_id: string;
  comments: Comment[];
  content: string;
  image?: {
    data: number[];
  };
  likes_count: number;
  created_at: string | Date;
}

interface AuthState {
  userId: string | null;
  message: string;
  token: string | null;
  user: UserProps | null;
  postDetails: PostProps[];
}

const initialState: AuthState = {
  userId: null,
  message: "",
  token: null,
  user: null,
  postDetails: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    },

    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },

    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },

    setUser(state, action: PayloadAction<UserProps | null>) {
      state.user = action.payload;
    },

    setPostDetails(state, action: PayloadAction<PostProps[]>) {
      state.postDetails = action.payload;
    },

    addCommentToPost(
      state,
      action: PayloadAction<{ postId: string; comment: Comment }>
    ) {
      const { postId, comment } = action.payload;
      const post = state.postDetails.find((post) => post._id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
    addNewPost(state, action: PayloadAction<PostProps>) {
      state.postDetails.push(action.payload);
    },
  },
});

export const {
  setUserId,
  setMessage,
  setToken,
  setUser,
  setPostDetails,
  addCommentToPost,
  addNewPost,
} = authSlice.actions;

export default authSlice.reducer;
