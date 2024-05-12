"use client";
import localForage from "localforage";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const STORAGE_KEY = "votes_state";

const votesAction = {
  upvote: 1,
  downvote: -1,
  "upvote-from-down": +2,
  "upvote-from-up": -1,
  "downvote-from-up": -2,
  "downvote-from-down": +1,
} as const;

const postVotes = ({
  key,
  action,
}: {
  key: string;
  action: keyof typeof votesAction;
}) => {
  return fetch("/votes", {
    method: "POST",
    body: JSON.stringify({
      action,
      key,
    }),
  });
};

export default function VoteButton({ blobKey }: { blobKey: string }) {
  const [voteCount, setVoteCount] = useState(0);
  const [voteState, setVoteState] = useState({
    upvotes: [] as string[],
    downvotes: [] as string[],
  });

  const hasUpvoted = voteState.upvotes.includes(blobKey);
  const hasDownvoted = voteState.downvotes.includes(blobKey);

  useEffect(() => {
    localForage.getItem(STORAGE_KEY).then((data) => {
      if (!data) return;
      setVoteState(data as any);
    });
  }, []);

  useEffect(() => {
    fetch(`/votes?key=${blobKey}`)
      .then((res) => res.json())
      .then((data) => setVoteCount(data.count));
  }, [blobKey]);

  const upvoteHandler = async () => {
    const newState = {
      downvotes: hasDownvoted
        ? voteState.downvotes.filter((key: string) => key !== blobKey)
        : voteState.downvotes,
      upvotes: hasUpvoted
        ? voteState.upvotes.filter((key: string) => key !== blobKey)
        : [...voteState?.upvotes, blobKey],
    };

    const action = hasUpvoted
      ? "upvote-from-up"
      : hasDownvoted
        ? "upvote-from-down"
        : "upvote";

    await postVotes({ key: blobKey, action });

    await localForage.setItem(STORAGE_KEY, newState);

    setVoteState(newState);
    setVoteCount((prev) => prev + votesAction[action]);
  };

  const downvoteHandler = async () => {
    const newState = {
      upvotes: hasUpvoted
        ? voteState.upvotes.filter((key: string) => key !== blobKey)
        : voteState.upvotes,
      downvotes: hasDownvoted
        ? voteState.downvotes.filter((key: string) => key !== blobKey)
        : [...voteState?.downvotes, blobKey],
    };

    const action = hasDownvoted
      ? "downvote-from-down"
      : hasUpvoted
        ? "downvote-from-up"
        : "downvote";

    await postVotes({ key: blobKey, action });

    await localForage.setItem(STORAGE_KEY, newState);

    setVoteState(newState);
    setVoteCount((prev) => prev + votesAction[action]);
  };
  return (
    <div className="flex flex-col items-center pr-6">
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
  );
}
