import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getPosts = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (data: {
  user_id: string;
  title: string;
  body: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, data);
    toast.success("Post created successfully!");
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("Failed to create post. Please try again.");
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    toast.success("Post deleted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("Failed to delete post. Please try again.");
    throw error;
  }
};

export const getUsers = async (pageNumber: number, pageSize: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUsersCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/count`);
    return response.data.count;
  } catch (error) {
    console.error("Error fetching users count:", error);
    throw error;
  }
};
