import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UsersTable } from ".";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("UsersTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    const useQueryMock = jest.spyOn(
      require("@tanstack/react-query"),
      "useQuery"
    );
    useQueryMock.mockReturnValue({
      isLoading: true,
      data: { data: [], pageCounts: 1 },
    });

    render(<UsersTable />);
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders users and handles row click", async () => {
    const mockData = {
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          full_address: "123 Street",
        },
      ],
      pageCounts: 1,
    };

    const useQueryMock = jest.spyOn(
      require("@tanstack/react-query"),
      "useQuery"
    );
    useQueryMock.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<UsersTable />);

    const user = userEvent.setup();
    const userRow = screen.getByText("John Doe").closest("tr");
    expect(userRow).toBeInTheDocument();

    await user.click(userRow!);
    expect(mockNavigate).toHaveBeenCalledWith("/users/1");
  });

  it("handles pagination correctly", () => {
    const mockData = {
      data: [],
      pageCounts: 3,
    };

    const useQueryMock = jest.spyOn(
      require("@tanstack/react-query"),
      "useQuery"
    );
    useQueryMock.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<UsersTable />);

    const previousButton = screen.getByRole("button", { name: /Previous/i });
    const nextButton = screen.getByRole("button", { name: /Next/i });

    expect(previousButton).toHaveAttribute("disabled");
    expect(nextButton).not.toHaveAttribute("disabled");

    const pageOneButton = screen.getByRole("button", { name: "1" });
    expect(pageOneButton).toHaveClass("bg-custom-purple-light");
  });
});
