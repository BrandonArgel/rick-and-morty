import * as React from "react";
import { getNames } from "utils";
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
	characters: any[];
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
	const [names, setNames] = React.useState(Array(20).fill(""));
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [s, setS] = React.useState(search);

	const getCharacterNames = React.useCallback(async () => {
		if (!s) setNames(characters.map((c: any) => c.name));
		setLoading(true);
		const { names, error } = await getNames(s);
		setNames(names);
		setError(error);
		setLoading(false);
	}, [s]); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		getCharacterNames();
	}, [getCharacterNames]);

	return (
		<section className={styles.controls}>
			<Search
				names={names}
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
			<Button onClick={reset}>Reset</Button>
		</section>
	);
};

export default Controls;
