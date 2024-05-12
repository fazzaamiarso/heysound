import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

const store = () => getStore("sounds");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) throw new Error("Key not found!");

  const audioBlob = await store().get(key, {
    type: "stream",
    consistency: "strong",
  });

  return new NextResponse(audioBlob);
}
