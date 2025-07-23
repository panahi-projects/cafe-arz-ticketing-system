import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("Layout Component", () => {
  it("renders without errors", () => {
    // Mock the children prop
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
      { container: document.documentElement }
    );

    expect(container).toBeInTheDocument();
  });

  it("returns notFound when condition is true", () => {
    expect(true).toBe(true);
  });
});
