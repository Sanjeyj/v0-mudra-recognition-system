import { Navbar } from "@/components/navbar"
import { DemoSection } from "@/components/demo-section"
import { DatasetCards } from "@/components/dataset-cards"

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
        <section className="mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-balance">Mudra Recognition System</h1>
          <p className="mt-3 text-muted-foreground leading-relaxed text-pretty">
            Recognize hand mudras across classical Indian dance forms: Bharatanatyam, Kathak, Kuchipudi, Odissi,
            Manipuri, Sattriya, and Mohiniyattam. This project uses machine learning to classify gestures from images.
          </p>
          <div className="mt-6">
            <a
              href="/demo"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition"
              aria-label="Go to Demo"
            >
              Try Demo
            </a>
          </div>
        </section>

        <DemoSection />

        <section className="mt-12 md:mt-16">
          <DatasetCards />
        </section>
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Mudra Recognition. All rights reserved.
      </footer>
    </>
  )
}
