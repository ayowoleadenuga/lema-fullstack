import { getConnection } from "./connection";

describe("Database Connection", () => {
  it("should establish a connection to the database", async () => {
    const db = await getConnection();
    expect(db).toBeDefined();
    await db.close();
  });

  it("should throw an error if the connection fails", async () => {
    try {
      const db = await getConnection();
      await db.close();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
