import { Dropdown, Search } from "components";
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
	return (
		<section className={styles.controls}>
			<Search placeholder="Search a character..." setValue={setSearch} value={search} />
			<Dropdown
				title="Status..."
				options={["Alive", "Dead", "Unknown"]}
				setValue={setStatus}
				value={status}
			/>
			<Dropdown
				title="Species..."
				options={["Human", "Humanoid", "Alien", "Unknown"]}
				setValue={setSpecies}
				value={species}
			/>
			<Dropdown
				title="Gender..."
				options={["Female", "Male", "Genderless", "Unknown"]}
				setValue={setGender}
				value={gender}
			/>
		</section>
	);
};

export default Controls;
