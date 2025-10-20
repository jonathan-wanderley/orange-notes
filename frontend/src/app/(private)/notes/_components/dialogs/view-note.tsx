import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Note } from "@/lib/types/note";
import { EyeIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  note: Note;
}

export default function ViewNoteDialog({ note }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!note) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
          <EyeIcon className="h-4 w-4" />
          <span className="hidden sm:inline">View Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{note.title}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Atualizado em {formatDate(note.updatedAt)}
          </p>
        </DialogHeader>
        <div className="py-4">
          <p className="whitespace-pre-wrap text-base leading-relaxed">
            {note.text}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
