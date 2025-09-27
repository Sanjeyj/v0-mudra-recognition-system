import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "datasets/" })
    // keep response small and stable
    const mapped = blobs.map((b) => ({
      url: b.url,
      pathname: b.pathname,
      contentType: (b as any).contentType, // type available at runtime
      size: (b as any).size,
      uploadedAt: (b as any).uploadedAt,
    }))
    return NextResponse.json({ blobs: mapped })
  } catch (error) {
    console.error("[v0] Blob list error:", error)
    return NextResponse.json({ error: "List failed" }, { status: 500 })
  }
}
