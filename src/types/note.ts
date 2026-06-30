export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
export type NoteId = string;

export interface Note {
  id: NoteId;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}
