import { getConnection } from "../connection";
import {
  addPostTemplate,
  deletePostTemplate,
  selectPostsTemplate,
} from "./query-tamplates";
import { Post } from "./types";

export const getPostsByUserId = async (userId: string): Promise<Post[]> => {
  const db = await getConnection();
  const query = selectPostsTemplate;

  try {
    const posts = await db.all<Post[]>(query, [userId]);
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch posts. Please try again later.");
  } finally {
    await db.close();
  }
};

export const deletePost = async (postId: string): Promise<number> => {
  const db = await getConnection();
  const query = deletePostTemplate;

  try {
    const result = await db.run(query, [postId]);
    return result.changes ?? 0; // Returns the number of rows affected
  } catch (error) {
    throw new Error("Failed to delete post. Please try again later.");
  } finally {
    await db.close();
  }
};

export const addPost = async (post: Post): Promise<number> => {
  const db = await getConnection();
  const query = addPostTemplate;

  try {
    console.log(`Adding post: ${JSON.stringify(post)}`);
    const result = await db.run(query, [
      post.user_id,
      post.title,
      post.body,
      post.id,
      post.created_at,
    ]);
    console.log(`Post added successfully with ID: ${result.lastID || post.id}`);
    return result.lastID ?? 0;
  } catch (error) {
    throw new Error("Failed to add post. Please try again later.");
  } finally {
    await db.close();
  }
};
