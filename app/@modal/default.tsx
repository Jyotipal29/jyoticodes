// Required by Next.js's parallel-routes convention: when no intercepted
// route is active for the current URL (i.e. every page outside a grid-card
// click into `/projects/[slug]`), the `@modal` slot renders this instead of
// erroring.
export default function Default() {
  return null;
}
