import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

const store = () => getStore("votes");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  const count = await store().get(`${key}:votes`, { type: "json" });

  return NextResponse.json({ count: count ?? 0 });
}

const votesAction = {
  upvote: 1,
  downvote: -1,
  "upvote-from-down": +2,
  "upvote-from-up": -1,
  "downvote-from-up": -2,
  "downvote-from-down": +1,
} as const;

export async function POST(request: Request) {
  const json = await request.json();

  const { key, action } = json;

  const count = await store().get(`${key}:votes`, { type: "json" });

  const newCount = count + votesAction[action as keyof typeof votesAction];

  await store().setJSON(`${key}:votes`, newCount);

  return NextResponse.json({ message: "Success" });
}
