import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorState } from ".";

describe("ErrorState Component", () => {
  it("renders the default error message", () => {
    render(<ErrorState />);
    expect(
      screen.getByText("Something went wrong. Please try again.")
    ).toBeInTheDocument();
  });

  it("renders a custom error message", () => {
    const message = "Custom error message.";
    render(<ErrorState message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("calls onRetry when the button is clicked", async () => {
    const user = userEvent.setup();
    const retryMock = jest.fn();
    render(<ErrorState onRetry={retryMock} />);

    const button = screen.getByRole("button", { name: /try again/i });
    await user.click(button);

    expect(retryMock).toHaveBeenCalledTimes(1);
  });

  it("renders the error icon", () => {
    render(<ErrorState />);
    expect(screen.getByTestId("alert-triangle-icon")).toBeInTheDocument();
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<ErrorState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
