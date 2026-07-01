import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "../services/noteService.ts";
import type { Note } from "../types/note";

interface NoteList {
  notes: Note[];
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
}

export default function useNoteList(query: string, page: number): NoteList {
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
