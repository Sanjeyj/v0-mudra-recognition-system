"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  onImageReady: (fileOrDataUrl: File | string) => void
}

export function UploadCapture({ onImageReady }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const localUrl = URL.createObjectURL(file)
    setPreviewUrl(localUrl)
    onImageReady(file)
  }

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsCameraOpen(true)
    } catch {
      // If permission denied or not available, we just keep placeholder behavior
      setIsCameraOpen(false)
    }
  }

  const closeCamera = () => {
    setIsCameraOpen(false)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }

  const takeSnapshot = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const w = video.videoWidth || 640
    const h = video.videoHeight || 480
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0, w, h)
    const dataUrl = canvas.toDataURL("image/png")
    setPreviewUrl(dataUrl)
    onImageReady(dataUrl)
    // keep camera open so users can re-take if they want
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-balance">Upload & Capture</CardTitle>
        <CardDescription>Upload an image or capture a live hand gesture to run the mudra prediction.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="image-file" className="text-sm font-medium">
            Upload Image
          </label>
          <input
            id="image-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="rounded-md border p-2 text-sm bg-background"
            aria-label="Upload image file"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="default"
            onClick={openCamera}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label="Capture Hand Gesture"
          >
            Capture Hand Gesture
          </Button>
          {isCameraOpen && (
            <Button type="button" variant="secondary" onClick={closeCamera}>
              Close Camera
            </Button>
          )}
        </div>

        {isCameraOpen && (
          <div className="grid gap-3 rounded-md border p-3">
            <p className="text-sm text-muted-foreground">Camera Preview</p>
            <video ref={videoRef} className="w-full rounded-md bg-muted aspect-video" playsInline muted />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={takeSnapshot}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Take Snapshot
              </Button>
              <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
            </div>
          </div>
        )}

        <div className="grid gap-2">
          <p className="text-sm font-medium">Preview</p>
          <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
            {previewUrl ? (
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Selected or captured hand gesture preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                No image selected yet
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
