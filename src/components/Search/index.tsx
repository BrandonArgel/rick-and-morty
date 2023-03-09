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
	const [display, setDisplay] = React.useState(false);
	const wrapperRef = React.useRef<HTMLDivElement>(null);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value.toLowerCase());
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case "Escape":
				setDisplay(false);
				break;
			case "Enter":
				setValue(search);
				setDisplay(false);
				break;
		}
	};

	React.useEffect(() => {
		setSearch(value);
	}, [value]); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClick = () => {
		if (display) return;
		setDisplay(true);
	};

	const handleClickOutside = (e: MouseEvent) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(e.target as Node)) {
			setDisplay(false);
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
				onFocus={handleClick}
				onClick={handleClick}
			/>
			<label htmlFor="search" onClick={() => setValue(search)}>
				<SearchIcon />
			</label>
			{display && (
				<div ref={wrapperRef} className={styles.suggestions}>
					{error ? (
						<p className={styles.error}>{error}</p>
					) : loading ? (
						<Loader />
					) : (
						names
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
