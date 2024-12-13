// import sqlite3 from "sqlite3";
// import config from "config";

// const dbPath = config.get("dbPath") as string;
// export const connection = new sqlite3.Database(dbPath);
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Function to establish a connection to the SQLite database
export const getConnection = async (): Promise<Database> => {
  try {
    const db = await open({
      filename: "./data.db", // Path to your SQLite database file
      driver: sqlite3.Database,
    });

    console.log("Connected to the SQLite database successfully.");
    return db;
  } catch (error) {
    console.error("Failed to connect to the SQLite database:", error);
    throw error;
  }
};
