"use client";

import Link from "next/link";
import ListItem from "./_components/audio-item";
import { useEffect, useState } from "react";
import { getSoundsMetadata } from "./actions";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [sounds, setSounds] = useState<any[]>([]);

  useEffect(() => {
    getSoundsMetadata().then((data) => setSounds(data));
  }, []);

  return (
    <main className="space-y-8 py-4">
      <Button asChild>
        <Link
          href="/upload"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 py-3 text-center font-semibold text-white shadow-md transition-colors hover:bg-indigo-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          Upload sound
        </Link>
      </Button>

      <div>
        <ul className="space-y-4">
          {sounds.map((sound) => {
            return (
              <ListItem
                key={sound.key}
                soundKey={sound.key}
                title={sound?.metadata?.title as string}
                description={sound?.metadata?.description as string}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
}
