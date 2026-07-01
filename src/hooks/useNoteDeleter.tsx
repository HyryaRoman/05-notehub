import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNote } from "../services/noteService.ts";
import type { NoteId } from "../types/note";

interface NoteDeleter {
  deleteNote: (noteId: NoteId) => void;
  isLoading: boolean;
  isError: boolean;
}

export default function useNoteDeleter(): NoteDeleter {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (noteId: NoteId) => {
      return await deleteNote(noteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    deleteNote: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
}
