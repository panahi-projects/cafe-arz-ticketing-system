import ThemeProvider from "@/theme/ThemeProvider";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("Layout Component", () => {
  it("renders without errors", () => {
    // Mock the children prop
    const { container } = render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
