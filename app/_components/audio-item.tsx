"use client";

import { useEffect, useRef } from "react";

export default function ListItem({
  soundKey,
  title,
  description,
}: {
  soundKey: string;
  title: string;
  description: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let audioUrl: any;

    const fetchAudio = async () => {
      const res = await fetch(`/audio?key=${soundKey}`, { cache: "no-store" });

      const blob = await res.blob();

      if (!audioRef.current) return;

      audioUrl = URL.createObjectURL(blob);
      audioRef.current.src = audioUrl;
    };

    fetchAudio();

    return () => {
      URL.revokeObjectURL(audioUrl);
    };
  }, [soundKey]);

  return (
    <li className="grid grid-cols-3 p-4 ring-1">
      <div className="col-span-1 col-start-1">
        <audio controls ref={audioRef}></audio>
      </div>
      <div className="col-span-2 col-start-3">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
}
