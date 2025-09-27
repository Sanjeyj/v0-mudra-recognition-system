import { Navbar } from "@/components/navbar"
import { DemoSection } from "@/components/demo-section"

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main className="py-10 md:py-12">
        <section className="mx-auto w-full max-w-6xl px-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-balance">Try the Demo</h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Upload an image or capture a live hand gesture, then run a placeholder prediction.
          </p>
        </section>
        <div className="mt-6">
          <DemoSection />
        </div>
      </main>
    </>
  )
}
