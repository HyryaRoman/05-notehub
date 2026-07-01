import { useDebouncedCallback } from "use-debounce";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  onQueryUpdate: (newQuery: string) => void;
}

export default function SearchBox({ query, onQueryUpdate }: SearchBoxProps) {
  const handleQueryChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onQueryUpdate(event.target.value),
    500,
  );
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={handleQueryChange}
    />
  );
}
