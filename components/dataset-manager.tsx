"use client"

import type React from "react"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type BlobItem = {
  url: string
  pathname: string
  contentType?: string
  size?: number
  uploadedAt?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function DatasetManager() {
  const { data, isLoading, mutate } = useSWR<{ blobs: BlobItem[] }>("/api/datasets/list", fetcher)

  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const blobs = useMemo(() => data?.blobs ?? [], [data])

  async function onUploadChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setIsUploading(true)
    setError(null)
    try {
      const form = new FormData()
      for (const f of files) form.append("files", f)
      const res = await fetch("/api/datasets/upload", { method: "POST", body: form })
      if (!res.ok) throw new Error("Upload failed")
      await mutate()
    } catch (err: any) {
      setError(err?.message || "Upload failed")
    } finally {
      setIsUploading(false)
      // reset input value to allow re-uploading same filenames
      e.currentTarget.value = ""
    }
  }

  async function onDelete(url: string) {
    setError(null)
    try {
      const res = await fetch("/api/datasets/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) throw new Error("Delete failed")
      await mutate()
    } catch (err: any) {
      setError(err?.message || "Delete failed")
    }
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-balance">Dataset Manager</CardTitle>
        <CardDescription>Upload, preview, and manage your dataset files stored on Vercel Blob.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="dataset-files" className="text-sm font-medium">
            Upload Files (images, zips, csv, etc.)
          </label>
          <input
            id="dataset-files"
            type="file"
            multiple
            onChange={onUploadChange}
            className="rounded-md border p-2 text-sm bg-background"
            aria-label="Upload dataset files"
          />
          {isUploading && <p className="text-sm text-muted-foreground">Uploading…</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="grid gap-3">
          <h3 className="text-sm font-medium">Files</h3>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading files…</p>
          ) : blobs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {blobs.map((b) => {
                const isImage = (b.contentType || "").startsWith("image/")
                return (
                  <li key={b.url} className="rounded-md border p-3 bg-card">
                    <div className="grid gap-3">
                      <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
                        {isImage ? (
                          <img
                            src={b.url || "/placeholder.svg"}
                            alt="Dataset file preview"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                            {"No preview available"}
                          </div>
                        )}
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium text-pretty break-words">{b.pathname}</p>
                        <p className="text-xs text-muted-foreground">
                          {(b.size ?? 0) > 0 ? `${(b.size! / 1024).toFixed(1)} KB` : "Unknown size"} •{" "}
                          {b.contentType || "unknown/type"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                          Open
                        </a>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => navigator.clipboard.writeText(b.url)}
                          className="h-8 px-3"
                        >
                          Copy URL
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => onDelete(b.url)}
                          className="h-8 px-3"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
