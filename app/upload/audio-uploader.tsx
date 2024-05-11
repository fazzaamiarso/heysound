"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useRef, useState } from "react";

export default function AudioUploader() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null);

  const audioChangeHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    const selectedFile = target.files && target.files[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const audio = audioRef.current;
      const result = e.target && e.target.result;
      if (!audio || !result) return;

      audio.src = result as string;
      setError("");

      audio.onloadeddata = () => {
        const duration = audio.duration;
        const durationLimit = 30; // Set your desired limit in seconds

        if (duration > durationLimit) {
          setError(
            `Audio file exceeds the maximum duration of ${durationLimit} seconds. Please select a shorter audio.`,
          );
          target.value = ""; // Clear file selection
          audio.src = "";
        }
      };
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="space-y-8 rounded-md p-6 ring-1 ring-neutral-400">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="sound">Insert audio</Label>
        <Input
          type="file"
          id="sound"
          name="sound"
          accept="audio/*"
          required
          onChange={audioChangeHandler}
        />
        {error && <span className="text-sm italic text-red-500">{error}</span>}
      </div>
      <div className="flex flex-col space-y-2">
        <Label>Preview</Label>
        <audio controls ref={audioRef} className="w-full"></audio>
      </div>
    </div>
  );
}
