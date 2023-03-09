import * as React from "react";
import { getSuggestions } from "utils";
import { CharacterModel, CharacterSearchModel } from "models";
import { Button, Dropdown, Search } from "components";

import styles from "./index.module.scss";

interface Props {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	species: string;
	setSpecies: React.Dispatch<React.SetStateAction<string>>;
	gender: string;
	setGender: React.Dispatch<React.SetStateAction<string>>;
	characters: CharacterModel[];
	reset: () => void;
}

const Controls: React.FC<Props> = ({
	search,
	setSearch,
	status,
	setStatus,
	species,
	setSpecies,
	gender,
	setGender,
	characters,
	reset,
}) => {
	const [suggestions, setSuggestions] = React.useState(Array(20).fill({ name: "", image: "" }));
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [s, setS] = React.useState(search);

	const getCharacterNames = React.useCallback(async () => {
		if (!s) setSuggestions(characters.map((c: CharacterSearchModel) => ({ name: c.name, image: c.image })));
		const { suggestions, error } = await getSuggestions(s);
		setLoading(false);
		setSuggestions(suggestions);
		setError(error);
	}, [s]); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		setLoading(true);
		const timeoutId = setTimeout(() => {
			getCharacterNames();
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [getCharacterNames]);

	return (
		<section className={styles.controls}>
			<Search
				suggestions={suggestions}
				placeholder="Search a character..."
				setValue={setSearch}
				value={search}
				search={s}
				setSearch={setS}
				loading={loading}
				error={error}
			/>
			<Dropdown
				title="Status..."
				options={["alive", "dead", "unknown"]}
				setValue={setStatus}
				value={status}
			/>
			<Dropdown
				title="Species..."
				options={["human", "humanoid", "alien", "unknown"]}
				setValue={setSpecies}
				value={species}
			/>
			<Dropdown
				title="Gender..."
				options={["female", "male", "genderless", "unknown"]}
				setValue={setGender}
				value={gender}
			/>
			<Button type="button" onClick={reset}>
				Reset
			</Button>
		</section>
	);
};

export default Controls;
