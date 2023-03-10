import * as React from "react";
import { Loader } from "components";
import { SearchIcon, Close } from "assets/icons";
import { CharacterSearchModel } from "models";
import styles from "./index.module.scss";

interface Props {
	value?: string;
	placeholder?: string;
	suggestions: CharacterSearchModel[];
	loading: boolean;
	error: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSearch: (name: string) => void;
}

const Search = ({
	value = "",
	placeholder,
	suggestions,
	loading,
	error,
	onChange,
	onSearch,
}: Props) => {
	const [display, setDisplay] = React.useState(false);
	const wrapperRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [suggestions]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleDisplaySuggestions = () => {
		setDisplay(true);
	};

	const handleClickOutside = (e: MouseEvent) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(e.target as Node)) {
			setDisplay(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!display) setDisplay(true);
		onChange(e);
	};

	const handleOnSearch = (name: string) => {
		setDisplay(false);
		onSearch(name);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleOnSearch(value);
		}
	};

	return (
		<div className={styles.search}>
			<input
				autoComplete="off"
				type="search"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				onFocus={handleDisplaySuggestions}
				onClick={handleDisplaySuggestions}
				onKeyDown={onKeyDown}
			/>
			{value && (
				<button onClick={() => handleOnSearch("")} className={styles.reset}>
					<Close />
				</button>
			)}
			<label htmlFor="search" onClick={() => handleOnSearch(value)}>
				<SearchIcon />
			</label>
			{display && suggestions.length && (
				<div ref={wrapperRef} className={styles.suggestions}>
					{error ? (
						<p className={styles.error}>{error}</p>
					) : loading ? (
						<Loader />
					) : (
						suggestions
							.filter(({ name }) => {
								return name.toLowerCase().includes(value.toLowerCase());
							})
							.map(({ name, image }, i) => (
								<button key={i} onClick={() => handleOnSearch(name)}>
									<p>{name}</p>
									<img src={image} alt={name} />
								</button>
							))
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
