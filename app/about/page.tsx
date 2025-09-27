import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-4 py-10 md:py-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-balance">About</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
          This project explores machine learning techniques to recognize classical Indian dance mudras from images or
          live capture. The UI is built with Next.js and Tailwind CSS, designed for fast iteration and deployment on
          Vercel. Model integration, training artifacts, and evaluation will be linked here in future updates.
        </p>
      </main>
    </>
  )
}
