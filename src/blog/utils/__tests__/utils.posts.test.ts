import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  getBlogPosts,
  getAllTagsWithStats,
  getAllCategoriesWithStats,
} from "../utils.posts";
import * as utilsMdx from "../utils.mdx";

vi.mock("../utils.mdx");

describe("utils.posts", () => {
  const mockPosts: Post[] = [
    {
      slug: "first-post",
      content: "Content 1",
      metadata: {
        title: "First Post",
        publishedAt: "2024-01-01",
        summary: "Summary 1",
        categories: ["Tech", "Programming"],
        tags: ["typescript", "react"],
      },
    },
    {
      slug: "second-post",
      content: "Content 2",
      metadata: {
        title: "Second Post",
        publishedAt: "2024-01-02",
        summary: "Summary 2",
        categories: ["Tech", "Design"],
        tags: ["css", "react"],
      },
    },
    {
      slug: "third-post",
      content: "Content 3",
      metadata: {
        title: "Third Post",
        publishedAt: "2024-01-03",
        summary: "Summary 3",
        categories: ["Programming"],
        tags: ["javascript"],
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getBlogPosts", () => {
    it("should call getMDXFiles and getMDXData with correct paths", () => {
      const mockFiles = ["post1.mdx", "post2.mdx"];
      const mockGetMDXFiles = vi
        .spyOn(utilsMdx, "getMDXFiles")
        .mockReturnValue(mockFiles);
      const mockGetMDXData = vi
        .spyOn(utilsMdx, "getMDXData")
        .mockReturnValue(mockPosts);

      const posts = getBlogPosts();

      expect(mockGetMDXFiles).toHaveBeenCalledOnce();
      expect(mockGetMDXFiles).toHaveBeenCalledWith(
        expect.stringContaining("src/blog/contents"),
      );
      expect(mockGetMDXData).toHaveBeenCalledOnce();
      expect(mockGetMDXData).toHaveBeenCalledWith(
        mockFiles,
        expect.stringContaining("src/blog/contents"),
      );
      expect(posts).toEqual(mockPosts);
    });

    it("should return array of posts from getMDXData", () => {
      vi.spyOn(utilsMdx, "getMDXFiles").mockReturnValue(["post.mdx"]);
      vi.spyOn(utilsMdx, "getMDXData").mockReturnValue(mockPosts);

      const posts = getBlogPosts();

      expect(Array.isArray(posts)).toBe(true);
      expect(posts).toHaveLength(3);
      expect(posts[0]).toHaveProperty("slug");
      expect(posts[0]).toHaveProperty("content");
      expect(posts[0]).toHaveProperty("metadata");
    });

    it("should return empty array when no posts exist", () => {
      vi.spyOn(utilsMdx, "getMDXFiles").mockReturnValue([]);
      vi.spyOn(utilsMdx, "getMDXData").mockReturnValue([]);

      const posts = getBlogPosts();

      expect(posts).toEqual([]);
    });

    it("should preserve post structure from getMDXData", () => {
      const singlePost: Post[] = [
        {
          slug: "test-post",
          content: "Test content",
          metadata: {
            title: "Test Title",
            publishedAt: "2024-01-01",
            summary: "Test summary",
            categories: ["Test"],
            tags: ["test"],
          },
        },
      ];

      vi.spyOn(utilsMdx, "getMDXFiles").mockReturnValue(["test.mdx"]);
      vi.spyOn(utilsMdx, "getMDXData").mockReturnValue(singlePost);

      const posts = getBlogPosts();

      expect(posts[0].slug).toBe("test-post");
      expect(posts[0].content).toBe("Test content");
      expect(posts[0].metadata.title).toBe("Test Title");
      expect(posts[0].metadata.categories).toEqual(["Test"]);
      expect(posts[0].metadata.tags).toEqual(["test"]);
    });
  });

  describe("getAllTagsWithStats", () => {
    it("should return all tags with correct counts", () => {
      const tags = getAllTagsWithStats(mockPosts);

      expect(tags).toHaveLength(4);
      expect(tags).toEqual(
        expect.arrayContaining([
          { name: "css", count: 1 },
          { name: "javascript", count: 1 },
          { name: "react", count: 2 },
          { name: "typescript", count: 1 },
        ]),
      );
    });

    it("should handle posts without tags", () => {
      const postsWithoutTags: Post[] = [
        {
          slug: "test",
          content: "Test",
          metadata: {
            title: "Test",
            publishedAt: "2024-01-01",
            summary: "Test",
          },
        },
      ];

      const tags = getAllTagsWithStats(postsWithoutTags);

      expect(tags).toEqual([]);
    });

    it("should handle empty posts array", () => {
      const tags = getAllTagsWithStats([]);

      expect(tags).toEqual([]);
    });

    it("should correctly count multiple occurrences", () => {
      const postsWithDuplicates: Post[] = [
        {
          slug: "post-1",
          content: "Content",
          metadata: {
            title: "Post 1",
            publishedAt: "2024-01-01",
            summary: "Summary",
            tags: ["react"],
          },
        },
        {
          slug: "post-2",
          content: "Content",
          metadata: {
            title: "Post 2",
            publishedAt: "2024-01-02",
            summary: "Summary",
            tags: ["react"],
          },
        },
        {
          slug: "post-3",
          content: "Content",
          metadata: {
            title: "Post 3",
            publishedAt: "2024-01-03",
            summary: "Summary",
            tags: ["react"],
          },
        },
      ];

      const tags = getAllTagsWithStats(postsWithDuplicates);

      expect(tags).toEqual([{ name: "react", count: 3 }]);
    });

    it("should have correct type for TagWithCount", () => {
      const tags = getAllTagsWithStats(mockPosts);

      tags.forEach((tag) => {
        expect(tag).toHaveProperty("name");
        expect(tag).toHaveProperty("count");
        expect(typeof tag.name).toBe("string");
        expect(typeof tag.count).toBe("number");
      });
    });
  });

  describe("getAllCategoriesWithStats", () => {
    it("should return categories with correct counts", () => {
      const categories = getAllCategoriesWithStats(mockPosts);

      expect(categories).toHaveLength(3);
      expect(categories).toEqual(
        expect.arrayContaining([
          { name: "Design", count: 1 },
          { name: "Programming", count: 2 },
          { name: "Tech", count: 2 },
        ]),
      );
    });

    it("should handle posts without categories", () => {
      const postsWithoutCategories: Post[] = [
        {
          slug: "test",
          content: "Test",
          metadata: {
            title: "Test",
            publishedAt: "2024-01-01",
            summary: "Test",
          },
        },
      ];

      const categories = getAllCategoriesWithStats(postsWithoutCategories);

      expect(categories).toEqual([]);
    });

    it("should handle empty posts array", () => {
      const categories = getAllCategoriesWithStats([]);

      expect(categories).toEqual([]);
    });

    it("should correctly count multiple occurrences", () => {
      const postsWithDuplicates: Post[] = [
        {
          slug: "post-1",
          content: "Content",
          metadata: {
            title: "Post 1",
            publishedAt: "2024-01-01",
            summary: "Summary",
            categories: ["Tech"],
          },
        },
        {
          slug: "post-2",
          content: "Content",
          metadata: {
            title: "Post 2",
            publishedAt: "2024-01-02",
            summary: "Summary",
            categories: ["Tech"],
          },
        },
        {
          slug: "post-3",
          content: "Content",
          metadata: {
            title: "Post 3",
            publishedAt: "2024-01-03",
            summary: "Summary",
            categories: ["Tech"],
          },
        },
      ];

      const categories = getAllCategoriesWithStats(postsWithDuplicates);

      expect(categories).toEqual([{ name: "Tech", count: 3 }]);
    });

    it("should have correct type for CategoryWithCount", () => {
      const categories = getAllCategoriesWithStats(mockPosts);

      categories.forEach((category) => {
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("count");
        expect(typeof category.name).toBe("string");
        expect(typeof category.count).toBe("number");
      });
    });
  });
});
