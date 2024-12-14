// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  full_address: string;
}

export interface UserDetails {
  name: string;
  email: string;
}

export interface UserResponse {
  data: User[];
  count: number;
  pageNumber: number;
  pageCounts: number;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
}

export interface GetPostsResponse {
  posts: Post[];
  userDetail: UserDetails;
}

export interface CreatePostResponse {
  message: string;
  postId: string;
}

export interface DeletePostResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}
