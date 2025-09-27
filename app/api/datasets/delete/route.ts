import { del } from "@vercel/blob"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 })
    }
    await del(url)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Blob delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
