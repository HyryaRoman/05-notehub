import axios from "axios";

import type { Note, NewNote, NoteId } from "../types/note.ts";

const NOTEHUB_API = axios.create({
  baseURL: "https://notehub-public.goit.study/api/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NODEHUB_TOKEN}`,
  },
  params: {
    perPage: 12,
  },
});

interface NotehubFetchResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number,
): Promise<NotehubFetchResponse> {
  const res = await NOTEHUB_API.get<NotehubFetchResponse>("/notes", {
    params: { query, page },
  });
  return res.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const res = await NOTEHUB_API.post("/notes", newNote);
  return res.data;
}

export async function deleteNode(noteId: NoteId) {
  await NOTEHUB_API.delete(`/notes/${noteId}`);
}
