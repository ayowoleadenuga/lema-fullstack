import { getUsers, getUsersCount, getUser } from "./users";
import { getConnection } from "../connection";

beforeAll(async () => {
  const db = await getConnection();
  await db.run(
    "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT)"
  );
  await db.run(
    "INSERT INTO users (id, name, email) VALUES ('1', 'Test User', 'test@example.com')"
  );
  await db.close();
});

afterAll(async () => {
  const db = await getConnection();
  await db.run("DROP TABLE users");
  await db.close();
});

describe("User Database Operations", () => {
  it("should fetch users with pagination", async () => {
    const users = await getUsers(0, 10);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].name).toBe("Test User");
  });

  it("should fetch user count", async () => {
    const count = await getUsersCount();
    expect(count).toBeGreaterThan(0);
  });

  it("should fetch a user by ID", async () => {
    const user = await getUser("1");
    expect(user.name).toBe("Test User");
  });
});
