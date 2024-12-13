import { Request, Response, NextFunction } from "express";

// Middleware to validate the presence of `userId` in query parameters
export const validateUserIdQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.query.userId as string;

  if (!userId) {
    res
      .status(400)
      .json({ message: "User ID is required in the query parameters." });
  }

  next();
};

// Middleware to validate the presence of `postId` in route parameters
export const validatePostIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;

  if (!postId) {
    res
      .status(400)
      .json({ message: "Post ID is required in the route parameters." });
  }

  next();
};

// Middleware to validate the presence of required fields in the request body for creating posts
export const validatePostBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id, title, body } = req.body;

  if (!user_id || !title || !body) {
    res
      .status(400)
      .json({ message: "Missing required fields: user_id, title, and body." });
  }

  next();
};
