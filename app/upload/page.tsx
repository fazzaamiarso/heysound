import { getStore } from "@netlify/blobs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import AudioUploader from "./audio-uploader";

async function uploadAudio(formData: FormData) {
  "use server";

  const store = getStore("sounds");

  const id = String(+new Date());

  const audio = formData.get("sound");

  if (!audio) return { error: "Sound not found" };

  await store.set(id, new File([audio], Date.now().toString()), {
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
    <main className="mx-auto w-11/12 py-8">
      <h2 className="text-3xl font-bold">Upload Your Sound</h2>
      <form action={uploadAudio} className="space-y-8">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={5} required />
        </div>
        <AudioUploader />
        <button className="rounde-md px-4 py-2 ring-1">Submit</button>
      </form>
    </main>
  );
}
