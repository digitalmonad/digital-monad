"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { HashIcon, SearchIcon, FolderIcon } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  useSearchIndex,
  useSearch,
  SearchIndexEntry,
  SearchResult,
} from "@/blog/hooks/use-search";
import { Badge } from "@/components/ui/badge";
import { Button } from "../../components/ui/button";
import { formatDate } from "@/blog/utils/utils.date";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Shared search results component
function SearchResults({
  isLoading,
  searchIndex,
  query,
  results,
  handleSelect,
}: {
  isLoading: boolean;
  query: string;
  searchIndex: SearchIndexEntry[] | null;
  results: SearchResult[];
  handleSelect: (slug: string) => void;
}) {
  return (
    <CommandList>
      {isLoading && <span>Loading search...</span>}

      {!isLoading && searchIndex && query.length < 2 && (
        <CommandEmpty>Start typing to search...</CommandEmpty>
      )}

      {!isLoading &&
        searchIndex &&
        query.length >= 2 &&
        results.length === 0 && (
          <CommandEmpty>No results for &quot;{query}&quot;</CommandEmpty>
        )}

      {results.length > 0 && (
        <CommandGroup className="p-4">
          {results.map((result) => (
            <CommandItem
              key={result.item.slug}
              value={result.item.slug}
              onSelect={() => {
                handleSelect(result.item.slug);
              }}
              className="flex flex-col items-start gap-2 p-4 cursor-pointer"
            >
              <div className="flex items-start justify-between w-full gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {result.item.title}
                    </div>
                  </div>
                </div>
                {result.score && (
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {Math.round((1 - result.score) * 100)}%
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground w-full">
                <div className="flex items-center gap-1">
                  {formatDate(result.item.publishedAt)}
                </div>

                {result.item.categories &&
                  result.item.categories.length > 0 && (
                    <div className="flex items-center gap-1">
                      <FolderIcon className="h-3 w-3" />
                      {result.item.categories[0]}
                    </div>
                  )}

                {result.item.tags && result.item.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <HashIcon className="h-3 w-3" />
                    {result.item.tags.slice(0, 2).join(", ")}
                  </div>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
}

// Desktop Search Component
export function SearchDesktop() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const { searchIndex, isLoading, loadIndex } = useSearchIndex();
  const results = useSearch(query, searchIndex);
  const router = useRouter();

  // Keyboard shortcut: Cmd/Ctrl + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Load index when dialog opens
  React.useEffect(() => {
    if (open) {
      loadIndex();
    } else {
      setQuery("");
    }
  }, [open, loadIndex]);

  const handleSelect = (slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/blog/posts/${slug}`);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="relative lg:p-0 shadow-none bg-transparent"
      >
        <span className="flex items-center justify-between gap-4 px-3 py-2 min-w-md w-full">
          <span className="flex items-center gap-2 text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
            <span className="text-sm">Search articles...</span>
          </span>
          <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </span>
      </Button>

      {/* Command Dialog - Centered */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        className="!inset-x-0 mx-auto top-10 min-h-2/3 !max-w-3xl !translate-x-0 !translate-y-0 border-none rounded-sm"
      >
        <Command className="p-4" shouldFilter={false}>
          <CommandInput
            placeholder="Search articles..."
            value={query}
            onValueChange={setQuery}
          />
          <SearchResults
            isLoading={isLoading}
            searchIndex={searchIndex}
            query={query}
            results={results}
            handleSelect={handleSelect}
          />
        </Command>
      </CommandDialog>
    </>
  );
}

// Mobile & Tablet Search Component
export function SearchMobile() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const { searchIndex, isLoading, loadIndex } = useSearchIndex();
  const results = useSearch(query, searchIndex);
  const router = useRouter();

  // Load index when dialog opens
  React.useEffect(() => {
    if (open) {
      loadIndex();
    } else {
      setQuery("");
    }
  }, [open, loadIndex]);

  const handleSelect = (slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/blog/posts/${slug}`);
  };

  return (
    <>
      {/* Trigger Button - Icon only */}
      <Button
        onClick={() => setOpen(true)}
        variant={"ghost"}
        className="border-0 bg-transparent shadow-none hover:bg-transparent!"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>

      {/* Command Dialog - Fixed to top, full width */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden" />
        <DialogContent
          className="!fixed !inset-x-0 !bottom-0 !top-0 !left-0 !right-0 !max-w-none !w-screen !h-auto !translate-x-0 !translate-y-0 !rounded-none !p-0 !m-0"
          showCloseButton={true}
        >
          <Command className="p-4 pt-8" shouldFilter={false}>
            <CommandInput
              placeholder="Search articles..."
              value={query}
              onValueChange={setQuery}
            />
            <SearchResults
              isLoading={isLoading}
              searchIndex={searchIndex}
              query={query}
              results={results}
              handleSelect={handleSelect}
            />
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
