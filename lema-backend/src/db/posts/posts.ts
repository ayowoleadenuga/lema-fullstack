import { getConnection } from "../connection";
import {
  addPostTemplate,
  deletePostTemplate,
  selectPostsTemplate,
} from "./query-tamplates";
import { Post, GetPostsResponse } from "./types";

export const getPostsByUserId = async (
  userId: string
): Promise<GetPostsResponse> => {
  const db = await getConnection();
  const query = selectPostsTemplate;

  try {
    const result = await db.get(query, [userId, userId]);
    if (!result) {
      return { posts: [], userDetail: { name: "", email: "" } };
    }

    return {
      posts: JSON.parse(result.posts),
      userDetail: JSON.parse(result.userDetail),
    };
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
    return result.changes ?? 0;
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
    const result = await db.run(query, [
      post.user_id,
      post.title,
      post.body,
      post.id,
      post.created_at,
    ]);
    return result.lastID ?? 0;
  } catch (error) {
    throw new Error("Failed to add post. Please try again later.");
  } finally {
    await db.close();
  }
};
