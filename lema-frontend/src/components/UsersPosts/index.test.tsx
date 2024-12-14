import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserPosts } from ".";

const mockMutate = jest.fn();
const mockInvalidateQueries = jest.fn();
const mockQueryClient = { invalidateQueries: mockInvalidateQueries };

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(() => ({
    mutate: mockMutate,
    isLoading: false,
  })),
  useQueryClient: () => mockQueryClient,
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({ userId: "1" }),
  useNavigate: () => jest.fn(),
}));

describe("UserPosts Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    const useQueryMock = jest.spyOn(
      require("@tanstack/react-query"),
      "useQuery"
    );
    useQueryMock.mockReturnValue({ isLoading: true });

    render(<UserPosts />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const useQueryMock = jest.spyOn(
      require("@tanstack/react-query"),
      "useQuery"
    );
    const mockRefetch = jest.fn();
    useQueryMock.mockReturnValue({
      error: new Error("Failed to load"),
      refetch: mockRefetch,
      isLoading: false,
    });

    render(<UserPosts />);
    expect(screen.getByText(/Failed to load posts/i)).toBeInTheDocument();

    const user = userEvent.setup();
    const retryButton = screen.getByRole("button", { name: /try again/i });
    await user.click(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it("renders posts and user details", () => {
    const mockData = {
      userDetail: { name: "John Doe", email: "john@example.com" },
      posts: [
        {
          id: "1",
          title: "Test Post",
          body: "Test Content",
          user_id: "1",
          created_at: new Date().toISOString(),
        },
      ],
    };

    const useQueryMock = jest.spyOn(
      require("@tanstack/react-query"),
      "useQuery"
    );
    useQueryMock.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<UserPosts />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("john@example.com"))
    ).toBeInTheDocument();
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("allows creating new post", async () => {
    const mockData = {
      userDetail: { name: "John Doe", email: "john@example.com" },
      posts: [],
    };

    const useQueryMock = jest.spyOn(
      require("@tanstack/react-query"),
      "useQuery"
    );
    useQueryMock.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<UserPosts />);

    const user = userEvent.setup();
    const newPostButton = screen.getByRole("button", { name: /new post/i });
    await user.click(newPostButton);

    expect(screen.getByText("Post title")).toBeInTheDocument();
  });

  it("handles post deletion", async () => {
    const mockData = {
      userDetail: { name: "John Doe", email: "john@example.com" },
      posts: [
        {
          id: "1",
          title: "Test Post",
          body: "Test Content",
          user_id: "1",
          created_at: new Date().toISOString(),
        },
      ],
    };

    const useQueryMock = jest.spyOn(
      require("@tanstack/react-query"),
      "useQuery"
    );
    useQueryMock.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<UserPosts />);

    const user = userEvent.setup();
    const deleteButton = screen.getByRole("button", { name: /delete post/i });
    await user.click(deleteButton);

    expect(mockMutate).toHaveBeenCalledWith("1");
  });
});
