import { describe, it, expect, vi } from "vitest";
import { debounce } from "../debounce";

describe("debounce", () => {
  it("should debounce a function", async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    await new Promise((r) => setTimeout(r, 250)); // Wait for debounce timeout
    expect(mockFn).toHaveBeenCalledOnce();
  });
});
