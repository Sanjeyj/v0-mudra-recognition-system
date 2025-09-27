import { Navbar } from "@/components/navbar"
import { DatasetCards } from "@/components/dataset-cards"
import { DatasetManager } from "@/components/dataset-manager"

export default function DatasetPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-balance">Dataset</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
          Below are placeholder details for the dataset. Replace these with your actual dataset statistics, sources,
          licenses, and splits.
        </p>

        <div className="mt-6">
          <a
            href="https://your-dataset-url.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Access Dataset Here
          </a>
        </div>

        <div className="mt-8">
          <DatasetCards />
        </div>
        <div className="mt-8">
          <DatasetManager />
        </div>
      </main>
    </>
  )
}
