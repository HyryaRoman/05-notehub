import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchNotes, createNote, deleteNote } from "../services/noteService.ts";
import type { Note, NewNote, NoteId } from "../types/note";

interface NoteList {
  notes: Note[];
  totalPages: number;
  createNote: (note: NewNote) => void;
  deleteNote: (noteId: NoteId) => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export default function useNotes(query: string, page: number): NoteList {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: async () => {
      return await fetchNotes(query, page);
    },
    placeholderData: (previousData) => previousData,
  });

  const createNoteMutation = useMutation({
    mutationFn: async (newNote: NewNote) => {
      return await createNote(newNote);
    },
    onSuccess: () => {
      console.log("Note added");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId: NoteId) => {
      return await deleteNote(noteId);
    },
    onSuccess: () => {
      console.log("Note deleted");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    notes: data?.notes || [],
    totalPages: data?.totalPages || 0,
    createNote: createNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    isLoading,
    isError,
    isSuccess,
  };
}
