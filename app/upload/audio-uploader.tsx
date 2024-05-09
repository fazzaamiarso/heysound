"use client";

import { ChangeEvent, ChangeEventHandler, useState } from "react";

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
        console.log(audio.duration);
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
    <>
      <div className="flex flex-col">
        <label htmlFor="sound">Your Audio</label>
        <input
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
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
