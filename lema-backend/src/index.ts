import express, { Application } from "express";
import cors from "cors";
import config from "config";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";

const port = config.get("port") as number;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});

export default app;
