"use client";

import { useState } from "react";

interface Props {
  cafeId: string;
  userId: string;
  onSubmitted?: () => void;
}

export default function ReviewForm({ cafeId, userId, onSubmitted }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    try {
      await fetch(`/api/cafes/${cafeId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, userId }),
      });
      setComment("");
      onSubmitted?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-brew-100 p-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="rounded border border-brew-100 p-2 text-sm"
        placeholder="Share what you liked (or didn't)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <button
        onClick={submit}
        disabled={submitting}
        className="self-start rounded-full bg-brew-600 px-4 py-1.5 text-sm text-white disabled:opacity-50"
      >
        {submitting ? "Posting..." : "Post review"}
      </button>
    </div>
  );
}
