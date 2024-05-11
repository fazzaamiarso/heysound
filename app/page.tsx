"use client";

import Link from "next/link";
import ListItem from "./_components/audio-item";
import { useEffect, useState } from "react";
import { getSoundsMetadata } from "./actions";
import { Button } from "@/components/ui/button";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

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
          <ArrowUpOnSquareIcon className="h-5 w-5" />
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
                description={sound?.metadata?.description as string}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
}
