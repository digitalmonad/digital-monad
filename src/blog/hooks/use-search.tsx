"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";

export type SearchIndexEntry = {
  slug: string;
  title: string;
  publishedAt: string;
  categories?: string[];
  tags?: string[];
};

export type SearchResult = {
  item: SearchIndexEntry;
  score?: number;
  refIndex: number;
};

export function useSearchIndex() {
  const [searchIndex, setSearchIndex] = useState<SearchIndexEntry[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadIndex = () => {
    if (searchIndex !== null || isLoading) return;

    setIsLoading(true);
    fetch("/search-index.min.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load search index");
        return res.json();
      })
      .then((data) => {
        setSearchIndex(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return {
    searchIndex,
    isLoading,
    error,
    loadIndex,
  };
}

export function useSearch(
  query: string,
  searchIndex: SearchIndexEntry[] | null,
) {
  const fuse = useMemo(() => {
    if (!searchIndex) return null;

    return new Fuse(searchIndex, {
      keys: [
        { name: "title", weight: 0.7 },
        { name: "tags", weight: 0.05 },
        { name: "categories", weight: 0.05 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
  }, [searchIndex]);

  const results = useMemo(() => {
    if (!fuse || !query || query.length < 2) {
      return [];
    }
    return fuse.search(query).slice(0, 10); // Top 10 results
  }, [fuse, query]);

  return results;
}
