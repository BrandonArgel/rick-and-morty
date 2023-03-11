import * as React from "react";
import { useFilters, useUser } from "context";
import { Button, Dropdown, Search } from "components";

import styles from "./index.module.scss";

const Controls = () => {
	const { suggestions, suggestionsError, suggestionsLoading } = useUser();
	const {
		status,
		species,
		gender,
		setSearch,
		setStatus,
		setSpecies,
		setGender,
		resetFilters,
		newSearch,
		setNewSearch,
	} = useFilters();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewSearch(e.target.value);
	};

	const handleSearch = (name: string) => {
		setSearch(name);
		setNewSearch(name);
	};

	return (
		<section className={styles.controls}>
			<Search
				suggestions={suggestions.map(({ name, image }) => ({ name, image }))}
				placeholder="Search a character..."
				value={newSearch}
				loading={suggestionsLoading}
				error={suggestionsError}
				onChange={handleSearchChange}
				onSearch={handleSearch}
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
			<Button type="button" onClick={resetFilters}>
				Reset filters
			</Button>
		</section>
	);
};

export default Controls;
