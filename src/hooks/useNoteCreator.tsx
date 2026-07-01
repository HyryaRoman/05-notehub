import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "../services/noteService.ts";
import type { NewNote } from "../types/note";

interface NoteCreator {
  createNote: (newNote: NewNote) => void;
  isLoading: boolean;
  isError: boolean;
}

export default function useNoteCreator(): NoteCreator {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newNote: NewNote) => {
      return await createNote(newNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    createNote: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
}
