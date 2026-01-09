import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createPost,
  getAllPosts,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

// Donor & Receiver can view feed
router.get("/", protect, getAllPosts);

// Only receiver creates post (we'll restrict by role next)
router.post("/", protect, createPost);

// Only owner can delete (we'll enforce in controller)
router.delete("/:id", protect, deletePost);

export default router;
