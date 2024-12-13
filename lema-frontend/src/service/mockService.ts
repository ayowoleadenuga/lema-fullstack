import { Post, User } from "../types";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "James Sunderland",
    email: "james.sunderland@silent.com",
    address: {
      street: "11 East St",
      state: "Pennsylvania",
      city: "Centralia",
      zipcode: "84471",
    },
  },
  {
    id: 2,
    name: "Heather Mason",
    email: "h.mason@sh2.corp",
    address: {
      street: "23 Lindsey St",
      state: "Maine",
      city: "Silent Hill",
      zipcode: "04915",
    },
  },
  {
    id: 3,
    name: "Harry Townsend",
    email: "harry_townsend@sh.com",
    address: {
      street: "10 Riverside Dr",
      state: "Oregon",
      city: "Portland",
      zipcode: "97205",
    },
  },
  {
    id: 4,
    name: "Walter Sullivan",
    email: "walter@apt.com",
    address: {
      street: "9 Wood Road",
      state: "California",
      city: "Ashfield",
      zipcode: "90210",
    },
  },
  {
    id: 5,
    name: "Maria Sunderland",
    email: "maria@lakeview.com",
    address: {
      street: "7 Heaven's Night",
      state: "Maine",
      city: "Silent Hill",
      zipcode: "04915",
    },
  },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: "I Got a Letter",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    userId: 1,
    title: "What a Nice Town",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    userId: 1,
    title: "I Love My Wife, Mary",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 4,
    userId: 1,
    title: "How can Anyone Eat Pizza at a Time Like This?",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

// Mock API functions with delay to simulate network requests
export const mockAPI = {
  getUsers: async (page: number, pageSize: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const start = page * pageSize;
    const end = start + pageSize;
    return mockUsers.slice(start, end);
  },
  getUsersCount: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUsers.length;
  },
  getPosts: async (userId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockPosts.filter((post) => post.userId === userId);
  },
  deletePost: async (postId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockPosts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      mockPosts.splice(index, 1);
    }
  },
  createPost: async (data: Omit<Post, "id">) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newPost: Post = {
      ...data,
      id: Math.max(...mockPosts.map((p) => p.id)) + 1,
    };
    mockPosts.push(newPost);
    return newPost;
  },
};
