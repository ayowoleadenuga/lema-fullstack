export interface User {
  id: string;
  name: string;
  email: string;
  full_address: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
}

export interface UserResponse {
  data: User[];
  count: number;
  pageNumber: number;
  pageCounts: number;
}
