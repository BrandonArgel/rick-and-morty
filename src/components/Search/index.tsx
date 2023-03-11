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

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleOnSearch(value);
	};

	const handleOnSearch = (name: string) => {
		setDisplay(false);
		onSearch(name);
	};

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleOnSearch(value);
		}
	};

	const onBlurItems = (e: React.FocusEvent<HTMLDivElement>) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(e.relatedTarget as Node)) {
			setDisplay(false);
		}
	};

	return (
		<form className={styles.search} onSubmit={onSubmit}>
			<input
				autoComplete="off"
				className={styles.search__input}
				onChange={handleChange}
				onFocus={handleDisplaySuggestions}
				onClick={handleDisplaySuggestions}
				onKeyDown={handleOnKeyDown}
				placeholder={placeholder}
				type="search"
				value={value}
			/>
			{value && (
				<button
					title="reset"
					type="reset"
					onClick={() => handleOnSearch("")}
					className={styles.search__reset}
				>
					<Close />
				</button>
			)}
			<button title="search" type="submit" tabIndex={0} className={styles.search__button}>
				<SearchIcon />
			</button>
			{display && (
				<div ref={wrapperRef} className={styles.suggestions} onBlur={onBlurItems}>
					{loading ? (
						<Loader />
					) : error ? (
						<p className={styles.error}>{error}</p>
					) : (
						suggestions
							.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))
							.map(({ name, image }, i) => (
								<button key={i} onClick={() => handleOnSearch(name)}>
									<p>{name}</p>
									<img src={image} alt={name} />
								</button>
							))
					)}
				</div>
			)}
		</form>
	);
};

export default Search;
