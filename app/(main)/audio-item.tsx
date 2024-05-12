"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import localForage from "localforage";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "votes_state";

const votesAction = {
  upvote: 1,
  downvote: -1,
  "upvote-from-down": +2,
  "upvote-from-up": -1,
  "downvote-from-up": -2,
  "downvote-from-down": +1,
} as const;

export default function ListItem({
  soundKey,
  description,
}: {
  soundKey: string;
  description: string;
}) {
  const [voteCount, setVoteCount] = useState(0);
  const [voteState, setVoteState] = useState<any>({
    upvotes: [],
    downvotes: [],
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  const hasUpvoted = voteState.upvotes.includes(soundKey);
  const hasDownvoted = voteState.downvotes.includes(soundKey);

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

  useEffect(() => {
    localForage.getItem(STORAGE_KEY).then((data) => {
      if (!data) return;

      setVoteState(data);
    });
  }, []);

  useEffect(() => {
    fetch(`/votes?key=${soundKey}`)
      .then((res) => res.json())
      .then((data) => setVoteCount(data.count));
  }, [soundKey]);

  const upvoteHandler = async () => {
    const newState = {
      downvotes: hasDownvoted
        ? voteState.downvotes.filter((key: string) => key !== soundKey)
        : voteState.downvotes,
      upvotes: hasUpvoted
        ? voteState.upvotes.filter((key: string) => key !== soundKey)
        : [...voteState?.upvotes, soundKey],
    };

    const action = hasUpvoted
      ? "upvote-from-up"
      : hasDownvoted
        ? "upvote-from-down"
        : "upvote";

    await fetch("/votes", {
      method: "POST",
      body: JSON.stringify({
        action,
        key: soundKey,
      }),
    });

    await localForage.setItem(STORAGE_KEY, newState);
    setVoteState(newState);
    setVoteCount((prev) => prev + votesAction[action]);
  };

  const downvoteHandler = async () => {
    const newState = {
      ...voteState,
      upvotes: hasUpvoted
        ? voteState.upvotes.filter((key: string) => key !== soundKey)
        : voteState.upvotes,
      downvotes: hasDownvoted
        ? voteState.downvotes.filter((key: string) => key !== soundKey)
        : [...voteState?.downvotes, soundKey],
    };

    const action = hasDownvoted
      ? "downvote-from-down"
      : hasUpvoted
        ? "downvote-from-up"
        : "downvote";
    await fetch("/votes", {
      method: "POST",
      body: JSON.stringify({
        action,
        key: soundKey,
      }),
    });

    await localForage.setItem(STORAGE_KEY, newState);
    setVoteState(newState);
    setVoteCount((prev) => prev + votesAction[action]);
  };

  return (
    <li className="flex w-full gap-8 rounded-md bg-white p-4">
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          className={cn("text-xl", hasUpvoted && "saturate-0")}
          onClick={upvoteHandler}
        >
          🔥
        </Button>
        <div>{voteCount}</div>
        <Button
          variant="ghost"
          className={cn("text-xl", hasDownvoted && "saturate-0")}
          onClick={downvoteHandler}
        >
          😓
        </Button>
      </div>
      <div className="basis-full space-y-4">
        <h3 className="">{description}</h3>
        <div>
          <audio controls ref={audioRef} className="w-full"></audio>
        </div>
      </div>
    </li>
  );
}
