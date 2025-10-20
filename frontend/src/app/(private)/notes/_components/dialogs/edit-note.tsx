import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "lucide-react";
import { toast } from "sonner";
import updateNoteAction from "@/actions/notes/update-note";
import { Note } from "@/lib/types/note";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Text is required"),
});

type NoteForm = z.infer<typeof noteSchema>;

interface Props {
  note: Note;
}

export default function EditNoteDialog({ note }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: "", text: "" },
  });

  const onSubmit = async (data: NoteForm) => {
    try {
      await updateNoteAction(note.id, data);
      toast.success("Note updated successfully");

      setIsOpen(false);
      reset();
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
          <EditIcon className="h-3 w-3" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>Update your note below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Note title..."
                {...register("title")}
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <span className="text-sm text-destructive">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your note here..."
                rows={8}
                {...register("text")}
                aria-invalid={!!errors.text}
              />
              {errors.text && (
                <span className="text-sm text-destructive">
                  {errors.text.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              Update Note
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
