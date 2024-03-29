const { default: axios } = require("axios");

//created axio client to create endpoint
const axioClient = axios.create({
  baseURL: "http://localhost:8000",
});

const createUser = (data) => axioClient.post("/user", data);
const getUserByEmail = (email) => axioClient.get("/user/" + email);

const createPost = (data) => axioClient.post("/post", data);

const getAllPost = () => axioClient.get("/post");

const onPostLike = (postId, data) =>
  axioClient.put("/post/like/" + postId, data);

// Add New Comment
const addComment = (data) => axioClient.post("/comment", data);

// Delete Comment
const deleteComment = (commentId) => axioClient.delete("/comment/" + commentId);

export default {
  createUser,
  getUserByEmail,
  createPost,
  getAllPost,
  onPostLike,
  addComment,
  deleteComment,
};
