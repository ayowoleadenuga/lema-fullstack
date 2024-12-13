import { getConnection } from "../connection";
import {
  selectCountOfUsersTemplate,
  selectUser,
  selectUserAddresses,
  selectUsersTemplate,
} from "./query-templates";
import { User, Address } from "./types";

export const getUsers = async (
  pageNumber: number,
  pageSize: number
): Promise<User[]> => {
  const db = await getConnection();
  const offset = pageNumber * pageSize;
  const query = selectUsersTemplate;

  try {
    const users = await db.all<User[]>(query, [pageSize, offset]);
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users. Please try again later.");
  } finally {
    await db.close();
  }
};

export const getUsersCount = async (): Promise<number> => {
  const db = await getConnection();
  const query = selectCountOfUsersTemplate;

  try {
    const result = await db.get<{ count: number }>(query);
    const count = result ? result.count : 0;
    return count;
  } catch (error) {
    throw new Error("Failed to fetch user count. Please try again later.");
  } finally {
    await db.close();
  }
};

export const getUser = async (id: string): Promise<User> => {
  const db = await getConnection();
  const query = selectUser;

  try {
    const user = await db.get<User>(query, [id]);
    if (!user) {
      throw new Error(`User with ID: ${id} not found.`);
    }
    return user;
  } catch (error) {
    throw new Error(
      `Failed to fetch user with ID: ${id}. Please try again later.`
    );
  } finally {
    await db.close();
  }
};

export const getUserAddresses = async (): Promise<Address[]> => {
  const db = await getConnection();
  const query = selectUserAddresses;

  try {
    const addresses = await db.all<Address[]>(query);
    return addresses;
  } catch (error) {
    throw new Error("Failed to fetch user addresses. Please try again later.");
  } finally {
    await db.close();
  }
};
