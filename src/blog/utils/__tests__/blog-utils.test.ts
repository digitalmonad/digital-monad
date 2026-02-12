import { describe, it, expect, beforeEach, vi } from "vitest";
import { formatDate } from "@/blog/utils/blog-utils";

describe("formatDate", () => {
  beforeEach(() => {
    // Mock current date to 2024-06-15 for consistent testing
    vi.setSystemTime(new Date("2024-06-15T12:00:00"));
  });

  it("formats date without relative time", () => {
    const result = formatDate("2024-01-10");
    expect(result).toBe("January 10, 2024");
  });

  it("formats date with relative time - days ago", () => {
    const result = formatDate("2024-06-10", true);
    expect(result).toBe("June 10, 2024 (5d ago)");
  });

  it("formats date with relative time - months ago", () => {
    const result = formatDate("2024-04-15", true);
    expect(result).toBe("April 15, 2024 (2mo ago)");
  });

  it("formats date with relative time - years ago", () => {
    const result = formatDate("2022-06-15", true);
    expect(result).toBe("June 15, 2022 (2y ago)");
  });

  it("formats today date", () => {
    const result = formatDate("2024-06-15", true);
    expect(result).toBe("June 15, 2024 (Today)");
  });

  it("handles date strings without time", () => {
    const result = formatDate("2024-01-01");
    expect(result).toBe("January 1, 2024");
  });
});
