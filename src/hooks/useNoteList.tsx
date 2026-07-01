import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchNotes, deleteNote } from "../services/noteService.ts";
import type { Note, NoteId } from "../types/note";

interface NoteList {
  notes: Note[];
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
}

export function useNoteList(query: string, page: number): NoteList {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: async () => {
      return await fetchNotes(query, page);
    },
    placeholderData: (previousData) => previousData,
  });

  return {
    notes: data?.notes || [],
    totalPages: data?.totalPages || 0,
    isLoading,
    isError,
  };
}

interface NoteDeleter {
  deleteNote: (noteId: NoteId) => void;
  isLoading: boolean;
  isError: boolean;
}

export function useNoteDeleter(): NoteDeleter {
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
