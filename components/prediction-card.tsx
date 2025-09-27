"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  predictedMudra?: string
  confidence?: number
  description?: string
}

export function PredictionCard({ predictedMudra, confidence, description }: Props) {
  const hasPrediction = typeof predictedMudra === "string"

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-balance">Prediction</CardTitle>
        <CardDescription>Model output will appear here once an image is uploaded or captured.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Predicted Mudra</span>
          <span className="font-medium">{hasPrediction ? predictedMudra : "—"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Confidence</span>
          <span className="font-medium">
            {typeof confidence === "number" ? `${Math.round(confidence * 100)}%` : "—"}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            {hasPrediction ? description || "Meaning/description placeholder." : "Meaning/description placeholder."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
