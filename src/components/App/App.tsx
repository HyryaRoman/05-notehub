import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { useNoteList, useNoteDeleter } from "../../hooks/useNoteList";
import type { Note } from "../../types/note";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setCurrentPage] = useState<number>(1);

  const noteList = useNoteList(query, page);
  const noteDeleter = useNoteDeleter();

  const handleQueryUpdate = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(event.target.value),
    250,
  );

  async function handleDeleteNote(note: Note) {
    noteDeleter.deleteNote(note.id);
  }

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} onQueryUpdate={handleQueryUpdate} />
        {noteList.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={noteList.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      {(noteList.isLoading || noteDeleter.isLoading) && <Loader />}
      {(noteList.isError || noteDeleter.isError) && <ErrorMessage />}
      {noteList.notes.length > 0 && (
        <NoteList notes={noteList.notes} onNoteDelete={handleDeleteNote} />
      )}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm
            onCancel={() => setModalOpen(false)}
            onSuccess={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
