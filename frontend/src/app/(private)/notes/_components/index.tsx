"use client";

import NoteCard from "./note-card";
import { Note } from "@/lib/types/note";
import AddNoteDialog from "./dialogs/add-note";
import { Subscription } from "@/lib/types/subscription";

interface Props {
  data: Note[];
  subscription: Subscription | null;
}

export default function Notes({ data, subscription }: Props) {
  const isActiveSubscription = subscription && subscription.status === "ACTIVE";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {!isActiveSubscription
              ? `Free plan - ${data.length}/10 notes`
              : `Pro plan - ${data.length} notes`}
          </p>
        </div>
        <AddNoteDialog disabled={!isActiveSubscription && data.length >= 10} />
      </div>
      <main className="container mx-auto px-4 py-8 pt-0">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              <svg
                className="h-16 w-16 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">No notes yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first note to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
