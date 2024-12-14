import request from "supertest";
import app from "../index"; // Ensure your Express app is exported in `index.ts`

describe("Post Routes", () => {
  it("should fetch posts by user ID", async () => {
    const response = await request(app).get("/posts?userId=test-user");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should add a new post", async () => {
    const response = await request(app).post("/posts").send({
      user_id: "test-user",
      title: "New Test Post",
      body: "This is a test post",
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Post created successfully.");
  });

  it("should delete a post", async () => {
    const response = await request(app).delete("/posts/test-id");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Post deleted successfully.");
  });
});
