import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getOnePost,
  getUserPosts,
} from "../controller/posting.js";
import checkAuthenticatedUser from "../middleware/checkAuthenticatedUser.js";

const postingRoutes = Router();

postingRoutes.post("/create", checkAuthenticatedUser, createPost);
postingRoutes.get("/", getAllPosts);
postingRoutes.get("/:id", getOnePost);
postingRoutes.get("/user/:userId", getUserPosts);

export default postingRoutes;
