import { Request, Response, Router } from "express";
import { getPostsByUserId, deletePost, addPost } from "../db/posts/posts";
import {
  validateUserIdQuery,
  validatePostIdParam,
  validatePostBody,
} from "../middlewares/validate-post";

const postsRouter = Router();

import { randomBytes } from "crypto";

const generateRandomString = (length: number): string =>
  randomBytes(length).toString("hex").slice(0, length);

// GET /posts?userId= - Get posts by user ID
postsRouter.get(
  "/",
  validateUserIdQuery,
  async (req: Request, res: Response) => {
    const userId = req.query.userId as string;

    try {
      const posts = await getPostsByUserId(userId);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts." });
    }
  }
);

// DELETE /posts/:postId - Deletes a post by its ID
postsRouter.delete(
  "/:postId",
  validatePostIdParam,
  async (req: Request, res: Response) => {
    const postId = req.params.postId;

    try {
      const changes = await deletePost(postId);
      if (changes === 0) {
        res.status(404).json({ message: "Post not found." });
      }
      res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post." });
    }
  }
);

// POST /posts - Adds a new post
postsRouter.post("/", validatePostBody, async (req: Request, res: Response) => {
  const { user_id, title, body } = req.body;
  try {
    const postId = await addPost({
      user_id,
      title,
      body,
      id: generateRandomString(10),
      created_at: new Date().toISOString(),
    });
    res.status(201).json({ message: "Post created successfully.", postId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post." });
  }
});

export default postsRouter;
