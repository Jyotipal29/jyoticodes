import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm tracking-widest text-gray-400 uppercase">
        § 404 — Not found
      </p>
      <h1 className="text-4xl font-semibold sm:text-6xl">
        This project doesn&apos;t <span className="text-accent italic">exist</span>.
      </h1>
      <p className="max-w-md text-gray-400">
        It may have been renamed, archived, or never existed. Head back to the full
        projects list.
      </p>
      <Link
        href="/#projects"
        className="font-mono text-sm text-accent transition-colors hover:underline"
      >
        ← Back to projects
      </Link>
    </main>
  );
}
