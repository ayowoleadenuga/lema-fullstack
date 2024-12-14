import { render } from "@testing-library/react";
import LoaderComponent from "./index";

describe("LoaderComponent", () => {
  it("renders loader", () => {
    const { container } = render(<LoaderComponent />);
    expect(container.firstChild).toHaveClass("loader");
  });
});
