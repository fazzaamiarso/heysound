import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

const votesAction = {
  upvote: 1,
  downvote: -1,
  "upvote-from-down": +2,
  "upvote-from-up": -1,
  "downvote-from-up": -2,
  "downvote-from-down": +1,
} as const;

const store = () => getStore("votes");

const createVoteKeys = (key: string) => `${key}:votes`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) return NextResponse.json({ count: 0 });

  const count = await store().get(createVoteKeys(key), { type: "json" });

  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(request: Request) {
  const data = await request.json();

  const { key, action } = data;

  const count = await store().get(createVoteKeys(key), { type: "json" });

  const newCount = count + votesAction[action as keyof typeof votesAction];

  await store().setJSON(createVoteKeys(key), newCount);

  return NextResponse.json({ message: `Successfully update ${key} count!` });
}
