export function getInitials(title: string, maxWords = 2): string {
  return title
    .split(" ")
    .map((word) => word[0])
    .slice(0, maxWords)
    .join("")
    .toUpperCase();
}
