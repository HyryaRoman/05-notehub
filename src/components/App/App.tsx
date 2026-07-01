import { useState } from "react";

import NoteList from "../NoteList/NoteList";
import useNotes from "../../hooks/useNotes";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const { notes } = useNotes(query, 1);

  return (
    <div className={css.app}>
      <header className={css.toolbar}></header>
      {notes.length > 0 && (
        <NoteList notes={notes} onNoteDelete={console.log} />
      )}
    </div>
  );
}
