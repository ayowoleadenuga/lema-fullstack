import { Request, Response, Router } from "express";
import { getUsers, getUsersCount } from "../db/users/users";

const usersRouter = Router();

// GET /users - Returns a list of users with addresses
usersRouter.get("/", async (req: Request, res: Response) => {
  const pageNumber = parseInt(req.query.pageNumber as string) || 0;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const [users, count] = await Promise.all([
      getUsers(pageNumber, pageSize),
      getUsersCount(),
    ]);

    const result = {
      data: users,
      count,
      pageCounts: Math.ceil(count / pageSize),
      pageNumber,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// GET /users/count - Returns the total user count
usersRouter.get("/count", async (req: Request, res: Response) => {
  try {
    const count = await getUsersCount();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user count." });
  }
});

export default usersRouter;
