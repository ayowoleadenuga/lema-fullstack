import "@testing-library/jest-dom";

const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock("@/env", () => ({
  API_URL: "http://localhost:3000",
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({ userId: "1" }),
}));

jest.mock("@/service", () => ({
  getPosts: jest.fn(),
  createPost: jest.fn(),
  deletePost: jest.fn(),
  getUsers: jest.fn(),
}));

jest.mock("lucide-react", () => ({
  AlertTriangle: () => <div data-testid="alert-triangle-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
