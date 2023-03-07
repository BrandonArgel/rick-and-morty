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

	React.useEffect(() => {
		setSearch(value);
	}, [value]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value) {
			setValue("");
		}
		setSearch(e.target.value.toLowerCase());
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setValue(search);
		}
	};

	return (
		<div className={styles.search}>
			<input
				autoComplete="off"
				type="text"
				placeholder={placeholder}
				value={search}
				onChange={handleSearch}
				onKeyDown={handleKeyDown}
				autoFocus
			/>
			<label htmlFor="search" onClick={() => setValue(search)}>
				<SearchIcon />
			</label>
		</div>
	);
};

export default Search;
