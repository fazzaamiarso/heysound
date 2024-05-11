import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  const res = getStore("sounds");

  if (!key) throw new Error("Key not found!");

  const audioBlob = await res.get(key, { type: "stream" });

  return new NextResponse(audioBlob);
}
