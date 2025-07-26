import { renderHook, act } from "@testing-library/react";
import {
  DashboardLayoutProvider,
  useLayoutContext,
} from "@/context/DashboardLayoutContext";

describe("DashboardLayoutProvider", () => {
  it("should provide header action state management", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardLayoutProvider>{children}</DashboardLayoutProvider>
    );

    const { result } = renderHook(() => useLayoutContext(), { wrapper });

    // Initial state should be null
    expect(result.current.headerAction).toBeNull();

    // Test setting an action
    const testAction = {
      label: "Test Action",
      onClick: jest.fn(),
    };

    act(() => {
      result.current.setHeaderAction(testAction);
    });

    expect(result.current.headerAction).toEqual(testAction);

    // Test clearing the action
    act(() => {
      result.current.setHeaderAction(null);
    });

    expect(result.current.headerAction).toBeNull();
  });
});
