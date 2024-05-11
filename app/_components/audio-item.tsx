"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
    <li>
      <Card className="p-4 shadow-sm">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="col-span-1 col-start-1">
          <audio controls ref={audioRef}></audio>
        </div>
      </Card>
    </li>
  );
}
