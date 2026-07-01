import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import useNotes from "../../hooks/useNotes";
import type { Note, NewNote } from "../../types/note";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setCurrentPage] = useState<number>(1);
  const { notes, totalPages, createNote, deleteNote } = useNotes(query, page);

  const handleQueryUpdate = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(event.target.value),
    500,
  );

  async function handleCreateNote(note: NewNote) {
    createNote(note);
    setModalOpen(false);
  }

  async function handleDeleteNote(note: Note) {
    deleteNote(note.id);
  }

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} onQueryUpdate={handleQueryUpdate} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      {notes.length > 0 && (
        <NoteList notes={notes} onNoteDelete={handleDeleteNote} />
      )}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm
            onCancel={() => setModalOpen(false)}
            onSubmit={handleCreateNote}
          />
        </Modal>
      )}
    </div>
  );
}
