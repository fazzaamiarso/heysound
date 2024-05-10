import { getStore } from "@netlify/blobs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  console.log(key);
  const res = getStore("sounds");

  if (!key) throw new Error("Key not found!");

  const audioBlob = await res.get(key, { type: "stream" });

  return new Response(audioBlob);
}
