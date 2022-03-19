import * as React from "react";
import { SearchIcon } from "assets/icons";
import styles from "./index.module.scss";

interface Props {
	setValue: (value: string) => void;
  placeholder?: string;
	value: string;
}

const Search = ({ value = "", placeholder, setValue }: Props) => {
  const [search, setSearch] = React.useState(value);

  return (
    <div className={styles.search}>
      <input
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setValue(search);
          }
        }}
      />
      <label htmlFor="search" onClick={() => setValue(search)}>
        <SearchIcon />
      </label>
    </div>
  );
}

export default Search;
