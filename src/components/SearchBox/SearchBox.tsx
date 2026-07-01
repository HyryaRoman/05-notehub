import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  onQueryUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ query, onQueryUpdate }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={onQueryUpdate}
    />
  );
}
