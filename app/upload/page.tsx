"use client";

import AudioUploader from "./audio-uploader";
import Link from "next/link";

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
import { useFormStatus } from "react-dom";
import { uploadAudio } from "./actions";

export default function Upload() {
  const { pending } = useFormStatus();

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
          <Button
            className="w-full px-4 py-6 font-semibold disabled:bg-neutral-600"
            disabled={pending}
          >
            {pending ? "UPLOADING..." : "UPLOAD SOUND"}
          </Button>
        </form>
      </div>
    </main>
  );
}
