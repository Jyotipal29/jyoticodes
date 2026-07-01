export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-6 text-center text-white">
      <p className="font-mono text-sm tracking-widest text-gray-400 uppercase">
        § 01 — Scaffold
      </p>
      <h1 className="text-4xl font-semibold sm:text-6xl">
        Design system <span className="text-accent italic">online</span>.
      </h1>
      <p className="font-mono text-sm text-gray-400">
        Next.js 16 · TypeScript · Tailwind v4 · Geist
      </p>
    </main>
  );
}
