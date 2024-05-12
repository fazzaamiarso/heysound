"use client";

import { useEffect, useRef } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import VoteButton from "./vote-buttons";

import dayjs from "dayjs";
dayjs.extend(relativeTime);

export default function ListItem({
  blobKey,
  description,
  createdAt,
}: {
  blobKey: string;
  description: string;
  createdAt: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let audioUrl: string;

    const fetchAudio = async () => {
      const res = await fetch(`/audio?key=${blobKey}`, { cache: "no-store" });

      const blob = await res.blob();

      if (!audioRef.current) return;

      audioUrl = URL.createObjectURL(blob);
      audioRef.current.src = audioUrl;
    };

    fetchAudio();

    return () => {
      URL.revokeObjectURL(audioUrl);
    };
  }, [blobKey]);

  return (
    <li className="flex w-full divide-x-2 rounded-md bg-white p-4">
      <VoteButton blobKey={blobKey} />
      <div className="basis-full space-y-8 pl-8">
        <div className="flex justify-between">
          <p className="text-lg">{description}</p>
          <div className="text-sm text-neutral-400">
            {dayjs(createdAt).fromNow()}
          </div>
        </div>
        <div>
          <audio controls ref={audioRef} className="w-full"></audio>
        </div>
      </div>
    </li>
  );
}
