"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";

export default function AudioUploader() {
  const [audioBlob, setAudioBlob] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioChangeHandler = (event: ChangeEvent) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const audio = new Audio();

      audio.src = e.target?.result as string;

      audio.onloadeddata = () => {
        const duration = audio.duration;
        const limit = 60; // Set your desired limit in seconds

        if (duration > limit) {
          setError(
            `Audio file exceeds the maximum duration of ${limit} seconds. Please select a shorter file.`,
          );
          event.target.value = null; // Clear file selection
          setAudioBlob(null);
          return;
        }
        setAudioBlob(audio?.src);
      };
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="space-y-8 rounded-md p-4 ring-1 ring-neutral-300">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="sound">Your Audio</Label>
        <Input
          type="file"
          id="sound"
          name="sound"
          accept="audio/*"
          required
          onChange={audioChangeHandler}
        />
      </div>
      <div>
        <audio controls>{audioBlob && <source src={audioBlob} />}</audio>
        <Label>*you can preview your audio here</Label>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
