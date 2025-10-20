import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "@/lib/types/note";
import deleteNoteAction from "@/actions/notes/delete-note";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditNoteDialog from "../dialogs/edit-note";
import ViewNoteDialog from "../dialogs/view-note";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    try {
      await deleteNoteAction(note.id);
      toast.success("Note deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <>
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 cursor-pointer">
        <CardHeader>
          <CardTitle className="line-clamp-1">{note.title}</CardTitle>
          <CardDescription>{formatDate(note.updatedAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {note.text}
          </p>
          <div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <ViewNoteDialog note={note} />
            <EditNoteDialog note={note} />
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="gap-2 text-destructive hover:text-destructive cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
