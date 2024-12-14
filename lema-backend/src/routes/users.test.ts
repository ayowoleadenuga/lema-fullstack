import request from "supertest";
import app from "../index";

describe("User Routes", () => {
  it("should fetch a paginated list of users", async () => {
    const response = await request(app).get("/users?pageNumber=0&pageSize=10");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it("should fetch the count of users", async () => {
    const response = await request(app).get("/users/count");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("count");
    expect(typeof response.body.count).toBe("number");
  });

  it("should fetch a specific user by ID", async () => {
    const userId = "test-user";
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });
});
