import { getPostsByUserId, addPost, deletePost } from "./posts";
import { getConnection } from "../connection";
import { Post } from "./types";

const samplePost: Post = {
  id: "test-id",
  user_id: "test-user",
  title: "Sample Title",
  body: "Sample Body",
  created_at: new Date().toISOString(),
};

beforeAll(async () => {
  const db = await getConnection();
  await db.run(
    `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      body TEXT,
      created_at TEXT
    )`
  );
  await db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT
    )`
  );
  await db.run(
    "INSERT INTO users (id, name, email) VALUES ('test-user', 'Test User', 'test@example.com')"
  );
  await db.close();
});

afterAll(async () => {
  const db = await getConnection();
  await db.run("DROP TABLE posts");
  await db.run("DROP TABLE users");
  await db.close();
});

describe("Post Database Operations", () => {
  it("should add a post", async () => {
    const result = await addPost(samplePost);
    expect(result).toBeGreaterThan(0);
  });

  it("should fetch posts by user ID with user details", async () => {
    const response = await getPostsByUserId(samplePost.user_id);
    expect(response.posts.length).toBeGreaterThan(0);
    expect(response.posts[0].title).toBe(samplePost.title);
    expect(response.userDetail.name).toBe("Test User");
    expect(response.userDetail.email).toBe("test@example.com");
  });

  it("should delete a post", async () => {
    const result = await deletePost(samplePost.id);
    expect(result).toBe(1);
  });
});
