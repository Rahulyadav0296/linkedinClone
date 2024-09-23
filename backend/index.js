const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const otpRoutes = require("./router/auth");
const postRoutes = require("./router/post");
const likeRoutes = require("./router/like");
const commentRoutes = require("./router/comment");
const WebSocket = require("ws");

require("dotenv").config(); // Ensure this is at the top

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Route setup
app.use("/api", otpRoutes);
app.use("/api", postRoutes);
app.use("/api", likeRoutes);
app.use("/api", commentRoutes);

const port = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB and start the server
mongoose
  .connect(
    MONGO_URL ||
      "mongodb+srv://rajendrayadav510:0L6H4dY7zao4IAWt@cluster0.wogscif.mongodb.net/linkedin?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Congratulations, Database connected!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
