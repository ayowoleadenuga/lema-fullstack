// src/service/index.ts
import axios from "axios";
import { toast } from "react-toastify";
import {
  GetPostsResponse,
  UserResponse,
  CreatePostResponse,
  DeletePostResponse,
  ErrorResponse,
} from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Add type guard for error responses
const isErrorResponse = (error: any): error is ErrorResponse => {
  return "error" in error;
};

export const getPosts = async (userId: string): Promise<GetPostsResponse> => {
  try {
    const response = await axios.get<GetPostsResponse>(
      `${API_URL}/posts?userId=${userId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      isErrorResponse(error.response.data)
    ) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

export const createPost = async (data: {
  user_id: string;
  title: string;
  body: string;
}): Promise<CreatePostResponse> => {
  try {
    const response = await axios.post<CreatePostResponse>(
      `${API_URL}/posts`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    console.error("Error creating post:", error);
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      isErrorResponse(error.response.data)
    ) {
      toast.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
    toast.error("Failed to create post. Please try again.");
    throw error;
  }
};

export const deletePost = async (
  postId: string
): Promise<DeletePostResponse> => {
  try {
    const response = await axios.delete<DeletePostResponse>(
      `${API_URL}/posts/${postId}`
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting post:", error);
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      isErrorResponse(error.response.data)
    ) {
      toast.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
    toast.error("Failed to delete post. Please try again.");
    throw error;
  }
};

export const getUsers = async (
  pageNumber: number,
  pageSize: number
): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>(
      `${API_URL}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      isErrorResponse(error.response.data)
    ) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
