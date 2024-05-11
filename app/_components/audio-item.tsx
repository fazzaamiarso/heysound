"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export default function ListItem({
  soundKey,
  description,
}: {
  soundKey: string;
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
      <Card className="shadow-sm">
        <CardHeader>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <audio controls ref={audioRef} className="w-full"></audio>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
