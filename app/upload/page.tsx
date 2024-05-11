import { getStore } from "@netlify/blobs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import AudioUploader from "./audio-uploader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

async function uploadAudio(formData: FormData) {
  "use server";

  const store = getStore("sounds");

  const id = String(+new Date());

  const audio = formData.get("sound");

  if (!audio) return { error: "Sound not found" };

  await store.set(id, audio, {
    metadata: {
      title: formData.get("title"),
      description: formData.get("description"),
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          BACK
        </Link>
      </Button>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Upload Your Sound</h2>
        <form action={uploadAudio} className="space-y-8">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={5} required />
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
