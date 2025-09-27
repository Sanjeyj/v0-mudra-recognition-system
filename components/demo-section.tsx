"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PredictionCard } from "./prediction-card"
import { UploadCapture } from "./upload-capture"

export function DemoSection() {
  const [imagePayload, setImagePayload] = useState<File | string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ predictedMudra?: string; confidence?: number; description?: string } | null>(
    null,
  )

  const handlePredict = async () => {
    if (!imagePayload) return
    setIsLoading(true)
    setResult(null)
    try {
      let res
      if (imagePayload instanceof File) {
        const form = new FormData()
        form.append("image", imagePayload)
        res = await fetch("/api/predict", { method: "POST", body: form })
      } else {
        // data URL path
        res = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dataUrl: imagePayload }),
        })
      }
      if (!res.ok) throw new Error("Prediction failed")
      const data = (await res.json()) as { predictedMudra: string; confidence: number; description?: string }
      setResult(data)
    } catch {
      setResult({ predictedMudra: "Unavailable", confidence: 0, description: "Placeholder error state." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section aria-labelledby="demo-title" className="mx-auto grid w-full max-w-6xl gap-6 px-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UploadCapture onImageReady={setImagePayload} />
        <div className="grid gap-4">
          <div>
            <Button
              onClick={handlePredict}
              disabled={!imagePayload || isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Run Mudra Prediction"
            >
              {isLoading ? "Predicting..." : "Run Prediction"}
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">
              This uses a placeholder API. Hook up your ML backend later.
            </p>
          </div>
          <PredictionCard
            predictedMudra={result?.predictedMudra}
            confidence={result?.confidence}
            description={result?.description}
          />
        </div>
      </div>
    </section>
  )
}
