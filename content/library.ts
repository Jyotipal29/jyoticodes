import type { LibraryEntry } from "./types";

/**
 * Placeholder library (currently-reading / notable-reads) entries.
 * "Designing Data-Intensive Applications" intentionally omits `coverImage`
 * to exercise `ImageFallback`'s missing-src fallback for library covers.
 */
export const library: LibraryEntry[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    rating: 5,
    note: "The clearest mental model I've found for reasoning about consistency tradeoffs in distributed systems.",
  },
  {
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    rating: 4,
    note: "Short, opinionated, and a good antidote to over-abstracting too early.",
    coverImage: "/images/library/philosophy-of-software-design.png",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    rating: 4,
    note: "Dated in places, but the core habits (DRY, orthogonality, tracer bullets) have held up well.",
    coverImage: "/images/library/pragmatic-programmer.png",
  },
  {
    title: "Shape Up",
    author: "Ryan Singer",
    rating: 5,
    note: "Changed how I think about scoping work into fixed-time, variable-scope cycles.",
    coverImage: "/images/library/shape-up.png",
  },
];
