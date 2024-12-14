import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewPostModal } from ".";

describe("NewPostModal Component", () => {
  const mockProps = {
    setNewPost: jest.fn(),
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    newPost: { title: "", body: "" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when open", () => {
    render(<NewPostModal {...mockProps} isOpen={true} />);

    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Give your post a title")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write something mind-blowing")
    ).toBeInTheDocument();
    expect(screen.getByTestId("x-icon")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const { container } = render(
      <NewPostModal {...mockProps} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("calls onClose when Cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<NewPostModal {...mockProps} isOpen={true} />);

    await user.click(screen.getByText("Cancel"));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when X icon is clicked", async () => {
    const user = userEvent.setup();
    render(<NewPostModal {...mockProps} isOpen={true} />);

    await user.click(screen.getByTestId("x-icon").parentElement!);
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when form is submitted", async () => {
    const user = userEvent.setup();
    render(<NewPostModal {...mockProps} isOpen={true} />);

    await user.click(screen.getByText("Publish"));
    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("updates title input correctly", async () => {
    const user = userEvent.setup();
    render(<NewPostModal {...mockProps} isOpen={true} />);

    const titleInput = screen.getByPlaceholderText("Give your post a title");
    await user.type(titleInput, "Test Title");

    expect(mockProps.setNewPost).toHaveBeenCalled();
  });

  it("updates body textarea correctly", async () => {
    const user = userEvent.setup();
    render(<NewPostModal {...mockProps} isOpen={true} />);

    const bodyTextarea = screen.getByPlaceholderText(
      "Write something mind-blowing"
    );
    await user.type(bodyTextarea, "Test Content");

    expect(mockProps.setNewPost).toHaveBeenCalled();
  });
});
