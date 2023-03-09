import * as React from "react";
import { Loader } from "components";
import { SearchIcon } from "assets/icons";
import styles from "./index.module.scss";

interface Props {
	setValue: (value: string) => void;
	value: string;
	search: string;
	setSearch: (value: string) => void;
	placeholder?: string;
	names: string[];
	loading: boolean;
	error?: string;
}

const Search = ({
	value = "",
	placeholder,
	setValue,
	search,
	setSearch,
	names,
	loading,
	error,
}: Props) => {
	const [focus, setFocus] = React.useState(false);

	React.useEffect(() => {
		setSearch(value);
	}, [value]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value.toLowerCase());
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setValue(search);
			setFocus(false);
		}
	};

	const handleFocus = () => {
		setFocus(true);
	};

	const handleBlur = () => {
		setTimeout(() => {
			setFocus(false);
		}, 200);
	};

	return (
		<div className={styles.search}>
			<input
				autoComplete="off"
				type="text"
				placeholder={placeholder}
				value={search}
				onBlur={handleBlur}
				onChange={handleSearch}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
			/>
			<label htmlFor="search" onClick={() => setValue(search)}>
				<SearchIcon />
			</label>
			{focus && (
				<div className={styles.suggestions}>
					{error ? (
						<p className={styles.error}>{error}</p>
					) : loading ? (
						<Loader />
					) : (
						Array.from(new Set(names))
							.filter((name) => {
								return name.toLowerCase().includes(search);
							})
							.map((name, i) => (
								<button
									key={i}
									onClick={() => {
										setValue(name);
										setSearch(name);
									}}
								>
									{name}
								</button>
							))
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
