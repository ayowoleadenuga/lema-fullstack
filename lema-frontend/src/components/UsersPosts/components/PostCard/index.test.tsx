import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostCard } from ".";

const mockPost = {
  id: "1",
  title: "Test Title",
  body: "Test Body",
  user_id: "123",
  created_at: new Date().toISOString(),
};

describe("PostCard Component", () => {
  it("renders post title and body", () => {
    render(<PostCard post={mockPost} deletePost={jest.fn()} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Body")).toBeInTheDocument();
  });

  it("calls deletePost when the delete button is clicked", async () => {
    const user = userEvent.setup();
    const deleteMock = jest.fn();
    render(<PostCard post={mockPost} deletePost={deleteMock} />);

    const deleteButton = screen.getByRole("button");
    await user.click(deleteButton);

    expect(deleteMock).toHaveBeenCalledWith(mockPost.id);
  });

  it("renders the delete icon", () => {
    render(<PostCard post={mockPost} deletePost={jest.fn()} />);
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("has the correct post id", () => {
    render(<PostCard post={mockPost} deletePost={jest.fn()} />);
    expect(screen.getByRole("article")).toHaveAttribute("id", mockPost.id);
  });
});
