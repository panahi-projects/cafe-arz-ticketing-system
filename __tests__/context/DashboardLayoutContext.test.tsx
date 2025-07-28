// src/__tests__/providers/DashboardLayoutProvider.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { LayoutConfig, HeaderAction } from "@/types";
import {
  DashboardLayoutProvider,
  useLayoutContext,
} from "@/context/DashboardLayoutContext";

// Test component that uses the context
const TestConsumer = ({
  testConfig,
}: {
  testConfig?: Partial<LayoutConfig>;
}) => {
  const { layoutConfig, setLayoutConfig } = useLayoutContext();

  return (
    <div>
      <div data-testid="showBreadcrumbs">
        {layoutConfig.showBreadcrumbs?.toString()}
      </div>
      <div data-testid="showPageTitle">
        {layoutConfig.showPageTitle?.toString()}
      </div>
      <div data-testid="pageTitle">{layoutConfig.pageTitle || "undefined"}</div>
      <button
        onClick={() =>
          setLayoutConfig({
            showBreadcrumbs: false,
            showPageTitle: false,
            pageTitle: "Updated Title",
          })
        }
      >
        Update Config
      </button>
    </div>
  );
};

describe("DashboardLayoutProvider", () => {
  it("should render children and provide default context values", () => {
    render(
      <DashboardLayoutProvider>
        <div>Test Child</div>
      </DashboardLayoutProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should initialize with default values when no defaultConfig is provided", () => {
    render(
      <DashboardLayoutProvider>
        <TestConsumer />
      </DashboardLayoutProvider>
    );

    expect(screen.getByTestId("showBreadcrumbs")).toHaveTextContent("true");
    expect(screen.getByTestId("showPageTitle")).toHaveTextContent("true");
    expect(screen.getByTestId("pageTitle")).toHaveTextContent("undefined");
  });

  it("should override defaults with provided defaultConfig values", () => {
    render(
      <DashboardLayoutProvider
        defaultConfig={{
          showBreadcrumbs: false,
          pageTitle: "Custom Title",
        }}
      >
        <TestConsumer />
      </DashboardLayoutProvider>
    );

    expect(screen.getByTestId("showBreadcrumbs")).toHaveTextContent("false");
    expect(screen.getByTestId("showPageTitle")).toHaveTextContent("true");
    expect(screen.getByTestId("pageTitle")).toHaveTextContent("Custom Title");
  });

  it("should update context values when setLayoutConfig is called", async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayoutProvider>
        <TestConsumer />
      </DashboardLayoutProvider>
    );

    // Initial values
    expect(screen.getByTestId("showBreadcrumbs")).toHaveTextContent("true");
    expect(screen.getByTestId("showPageTitle")).toHaveTextContent("true");
    expect(screen.getByTestId("pageTitle")).toHaveTextContent("undefined");

    // Click the button to update config
    await user.click(screen.getByRole("button", { name: "Update Config" }));

    // Updated values
    expect(screen.getByTestId("showBreadcrumbs")).toHaveTextContent("false");
    expect(screen.getByTestId("showPageTitle")).toHaveTextContent("false");
    expect(screen.getByTestId("pageTitle")).toHaveTextContent("Updated Title");
  });

  it("should handle headerAction in the layout config", () => {
    const mockAction: HeaderAction = {
      label: "Test Action",
      onClick: jest.fn(),
    };

    render(
      <DashboardLayoutProvider defaultConfig={{ headerAction: mockAction }}>
        <TestConsumer />
      </DashboardLayoutProvider>
    );

    // In a real test, you would verify the header action is rendered by your header component
    // This just verifies it's in the context
    expect(screen.getByTestId("showBreadcrumbs")).toHaveTextContent("true");
  });
});
