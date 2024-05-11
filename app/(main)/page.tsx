"use client";

import Link from "next/link";
import ListItem from "./audio-item";
import { Suspense, useEffect, useState } from "react";
import { getSoundsMetadata } from "./actions";
import { Button } from "@/components/ui/button";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import {
  BoltIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
  {
    text: "Podcast",
    value: "podcast",
    Icon: MicrophoneIcon,
  },
  {
    text: "Music",
    value: "music",
    Icon: MusicalNoteIcon,
  },
  {
    text: "Bites",
    value: "bite",
    Icon: BoltIcon,
  },
];

export default function Home() {
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
      <Suspense>
        <MainContent />
      </Suspense>
    </main>
  );
}

function MainContent() {
  const searchParams = useSearchParams();
  const [sounds, setSounds] = useState<any[]>([]);

  const categoryFilter = searchParams.get("category") ?? "podcast";

  useEffect(() => {
    getSoundsMetadata(categoryFilter).then((data) => setSounds(data));
  }, [categoryFilter]);

  return (
    <section>
      <ul className="mb-4 grid grid-cols-3  text-center">
        {categories.map((category) => {
          return (
            <li key={category.value}>
              <Link
                href={`?category=${category.value}`}
                className={cn(
                  "flex items-center justify-center gap-2",
                  "border-b-2 border-neutral-400 py-4 text-lg font-semibold text-neutral-400",
                  category.value === categoryFilter &&
                    "border-neutral-700 text-neutral-700",
                )}
              >
                <category.Icon className="h-5 w-5" />
                {category.text}
              </Link>
            </li>
          );
        })}
      </ul>
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
    </section>
  );
}
