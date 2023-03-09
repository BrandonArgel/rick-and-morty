import * as React from "react";
import { Controls, Footer, Hero, Modal, Pagination, Loader } from "components";
import { useLocalStorage } from "hooks";
import { getDimension, getCharacters } from "utils";
import { CharacterModel, InfoModel } from "models";
import imgError from "assets/images/error.jpg";
import styles from "./Home.module.scss";

const Characters = React.lazy(() => import("components/Characters"));
const Particles = React.lazy(() => import("components/Particles"));

const baseCharacter: CharacterModel = {
	id: 1,
	gender: "",
	name: "",
	species: "",
	status: "",
	image: "",
	location: {
		name: "",
	},
	origin: {
		name: "",
		url: "",
	},
	type: "",
};

const Home = () => {
	const [characters, setCharacters] = React.useState(
		Array(20).fill(baseCharacter as CharacterModel)
	);
	const [character, setCharacter] = React.useState(baseCharacter as CharacterModel);
	const [info, setInfo] = React.useState({} as InfoModel);
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [modal, setModal] = React.useState(false);
	const [lastFocus, setLastFocus] = React.useState(-1);

	// Save items in LocalStorage
	const [page, setPage] = useLocalStorage("page", 1);
	const [search, setSearch] = useLocalStorage("search", "");
	const [status, setStatus] = useLocalStorage("status", "");
	const [species, setSpecies] = useLocalStorage("species", "");
	const [gender, setGender] = useLocalStorage("gender", "");

	const initialRequest = React.useCallback(async () => {
		setCharacters(Array(20).fill(baseCharacter as CharacterModel));
		setLoading(true);
		setLastFocus(-1);

		const { info, results, error, p } = await getCharacters({
			page: page,
			search,
			status,
			species,
			gender,
		});

		setCharacters(results);
		setInfo(info);
		setPage(p || 1);
		setError(error);
		setLoading(false);
	}, [page, search, status, species, gender]); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		initialRequest();
	}, [initialRequest]);

	const getCharacterDimension = async (url: string) => {
		const dimension = await getDimension({ url });
		setCharacter((prevState: CharacterModel) => ({ ...prevState, dimension }));
	};

	const changeModalCharacter = (e: React.SyntheticEvent<EventTarget>) => {
		if (!(e.target instanceof HTMLButtonElement)) {
			return;
		}
		const { id, image, location, name, originName, originUrl, status, species, gender, type } =
			e.target.dataset;
		setLastFocus(Number(id));
		const c: CharacterModel = {
			id: Number(id),
			image: image || "",
			location: {
				name: location || "",
			},
			name: name || "",
			originName: originName || "",
			status: status || "",
			species: species || "",
			gender: gender || "",
			type: type || "",
		};
		setCharacter(c);
		if (!originUrl) {
			setCharacter((prevState: CharacterModel) => ({ ...prevState, dimension: originName }));
		} else {
			getCharacterDimension(originUrl);
		}
		setModal(true);
	};

	const handleReset = () => {
		setSearch("");
		setStatus("");
		setSpecies("");
		setGender("");
		setPage(1);
	};

	return (
		<main>
			<Hero />
			<Controls
				search={search}
				setSearch={setSearch}
				status={status}
				setStatus={setStatus}
				species={species}
				setSpecies={setSpecies}
				gender={gender}
				setGender={setGender}
				characters={characters}
				reset={handleReset}
			/>
			<React.Suspense fallback={<Loader />}>
				{!loading && error && (
					<div className={styles.error}>
						<img src={imgError} alt="Error" />
						<p aria-live="assertive">{error}</p>
					</div>
				)}
				<Particles />
				<Characters
					characters={characters}
					changeModalCharacter={changeModalCharacter}
					lastFocus={lastFocus}
					modal={modal}
					loading={loading}
				/>
				<Pagination loading={loading} info={info} page={page} setPage={setPage} />
				<Footer />
				<Modal open={modal} close={() => setModal(false)} character={character} />
			</React.Suspense>
		</main>
	);
};

export default Home;
