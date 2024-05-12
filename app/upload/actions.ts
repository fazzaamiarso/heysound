"use server";

import { getStore } from "@netlify/blobs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

const store = () => getStore("sounds");

export async function uploadAudio(formData: FormData) {
  const audio = formData.get("sound") as any; // this is so bad. fix later
  const category = formData.get("category");
  const description = formData.get("description");

  const key = `${category}:${nanoid()}`;

  // TODO: should do proper form validation
  if (!audio) return { error: "Audio not found" };

  await store().set(key, audio, {
    metadata: {
      category,
      description,
      type: audio.type,
      name: audio.name,
      createdAt: new Date().toISOString(),
    },
  });

  revalidatePath("/");
  redirect("/");
}
