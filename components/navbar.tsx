import Link from "next/link"

export function Navbar() {
  return (
    <header className="w-full border-b bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="font-semibold text-lg md:text-xl hover:opacity-90">
          Mudra Recognition System
        </Link>
        <ul className="flex items-center gap-4 md:gap-6 text-sm md:text-base">
          <li>
            <Link href="/" className="hover:text-primary underline-offset-4 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-primary underline-offset-4 hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/dataset" className="hover:text-primary underline-offset-4 hover:underline">
              Dataset
            </Link>
          </li>
          <li>
            <Link
              href="/demo"
              className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90 transition"
              aria-label="Try the Demo"
            >
              Try Demo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
