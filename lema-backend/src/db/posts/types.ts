export interface UserDetails {
  name: string;
  email: string;
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
