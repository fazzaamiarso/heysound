import { getStore } from "@netlify/blobs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import AudioUploader from "./audio-uploader";
import Link from "next/link";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

async function uploadAudio(formData: FormData) {
  "use server";

  const store = getStore("sounds");
  const audio = formData.get("sound") as any; // this is so bad. fix later
  const category = formData.get("category");

  const key = `${category}:${nanoid()}`;

  // TODO: should do proper form validation
  if (!audio) return { error: "Sound not found" };

  await store.set(key, audio, {
    metadata: {
      category,
      description: formData.get("description"),
      type: audio.type,
      name: audio.name,
    },
  });

  revalidatePath("/");
  redirect("/");
}

export default function Upload() {
  return (
    <main className="space-y-8 py-8">
      <Button asChild variant="ghost">
        <Link href="/" className="flex gap-1">
          <ArrowLeftIcon className="h-5 w-5" />
          BACK
        </Link>
      </Button>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Upload Your Sound</h2>
        <form action={uploadAudio} className="space-y-8">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={5} required />
          </div>
          <div className="flex flex-col space-y-2 pb-8">
            <Label>Category</Label>
            <Select name="category">
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="podcast">Podcast</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="bites">Bites</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AudioUploader />
          <Button className="w-full px-4 py-6 font-semibold">
            UPLOAD SOUND
          </Button>
        </form>
      </div>
    </main>
  );
}
