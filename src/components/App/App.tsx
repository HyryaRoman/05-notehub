import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import useNoteList from "../../hooks/useNoteList";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setCurrentPage] = useState<number>(1);

  const { notes, totalPages, isLoading, isError } = useNoteList(query, page);

  const handleQueryUpdate = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setCurrentPage(1);
    },
    250,
  );

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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {notes.length > 0 && <NoteList notes={notes} />}
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
