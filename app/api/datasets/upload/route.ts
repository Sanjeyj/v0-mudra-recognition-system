import { put } from "@vercel/blob"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    let files = form.getAll("files") as File[]

    // Fallback to single "file" field if provided
    if (!files.length) {
      const single = form.get("file")
      if (single instanceof File) files = [single]
    }

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const uploaded = []
    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      const pathname = `datasets/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`
      const blob = await put(pathname, file, { access: "public" })
      uploaded.push({
        url: blob.url,
        pathname: blob.pathname,
        size: file.size,
        type: file.type,
      })
    }

    return NextResponse.json({ uploaded })
  } catch (error) {
    console.error("[v0] Blob upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
