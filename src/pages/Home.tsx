import * as React from "react";
import { Button, Dropdown, Hero, Modal, Search } from "components";
import getCharacters from "utils/getCharacters";
import getDimension from "utils/getDimension";
import { Loader } from "assets/icons";
import styles from "./Home.module.scss";

const Home = () => {
	const [characters, setCharacters] = React.useState([]);
	const [character, setCharacter] = React.useState({} as any);
	const [info, setInfo] = React.useState({} as any);
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [modal, setModal] = React.useState(false);
	
	const [page, setPage] = React.useState(42);
	const [search, setSearch] = React.useState("");
	const [status, setStatus] = React.useState("");
	const [species, setSpecies] = React.useState("");
	const [gender, setGender] = React.useState("");
	

	const initialRequest = React.useCallback(async () => {
		setLoading(true);
		const { data, results, error, p } = await getCharacters({ page, search, status, species, gender });
	
		setCharacters(results);
		setInfo(data);
		setPage(p)
		setError(error);
	
		setLoading(false);
	}, [page, search, status, species, gender]);

	React.useEffect(() => {
		initialRequest();
	}, [page, search, status, species, gender, initialRequest]);

	const changeModal = async (char: any) => {
		setCharacter(char);
		if(char.origin.url) {
			const dimension = await getDimension({url: char.origin.url})
			// Add dimension to state 
			setCharacter((prevState: any) => ({ ...prevState, dimension }));
		} else {
			setCharacter((prevState: any) => ({ ...prevState, dimension: char.origin.name }));
		}
		setModal(true)
	}

	React.useEffect(() => {

	}, [character])

	return (
		<main>
			<Hero />
			<section className={styles.controls}>
				<Search placeholder="Search a character..." setValue={setSearch} value={search} />
				<Dropdown
					title="Status..."
					options={["alive", "dead", "unknown"]}
					setValue={setStatus}
					value={status}
				/>
				<Dropdown
					title="Especies..."
					options={["human", "humanoid", "alien", "unknown"]}
					setValue={setSpecies}
					value={species}
				/>
				<Dropdown
					title="Género..."
					options={["female", "male", "genderless", "unknown"]}
					setValue={setGender}
					value={gender}
				/>
			</section>
			{error && (
				<div className={styles.error}>
					<p aria-live="assertive">{error}</p>
				</div>
			)}
			{loading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : (
				<>
					<section className={styles.characters}>
						{characters &&
							characters.map((character:any) => (
								<div key={character.id} className={styles.character} onClick={() => changeModal(character)}>
									<img src={character.image} alt={character.name} />
									<p>{character.name}</p>
								</div>
							))}
					</section>
					<div className={styles.pagination}>
						<Button onClick={() => setPage(page - 1)} disabled={!info?.prev || loading}>
							Prev
						</Button>
						<span>{page} / {info?.pages || 0}</span>
						<Button onClick={() => setPage(page + 1)} disabled={!info?.next || loading}>
							Next
						</Button>
					</div>
				</>
			)}
			<Modal open={modal} setOpen={() => setModal(false)}>
				{character.id && (
					<>
						<img src={character.image} alt={character.name} />
						<div>
							<h2>{character?.name}</h2>
							<p><strong>Status:</strong> {character?.status} <span>{character?.status === "Alive" ? "🟢" : character?.status === "Dead" ? "🔴": "⚪"}</span></p>
							<p><strong>Species:</strong> {character?.species}</p>
							{character?.type && <p><strong>Type:</strong> {character?.type}</p>}
							<p><strong>Location:</strong> {character?.location?.name}</p>
							<p><strong>Origin:</strong> {character?.origin?.name}</p>
							<p><strong>Dimension:</strong> {character?.dimension}</p>
						</div>
					</>
				)}
			</Modal>
		</main>
	);
};

export default Home;
