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
}) => {
	const handleReset = () => {
		setSearch("");
		setStatus("");
		setSpecies("");
		setGender("");
	};

	return (
		<section className={styles.controls}>
			<Search placeholder="Search a character..." setValue={setSearch} value={search} />
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
			<Button onClick={handleReset}>Reset</Button>
		</section>
	);
};

export default Controls;
