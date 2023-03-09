import * as React from "react";
import { Controls, Hero, Modal, Pagination, Loader } from "components";
import { useLocalStorage } from "hooks";
import { getDimension, getCharacters } from "utils";
import imgError from "assets/images/error.jpg";
import styles from "./Home.module.scss";

const Characters = React.lazy(() => import("components/Characters"));
const Particles = React.lazy(() => import("components/Particles"));

const Home = () => {
	const [characters, setCharacters] = React.useState(Array(20).fill({}));
	const [character, setCharacter] = React.useState({} as any);
	const [info, setInfo] = React.useState({} as any);
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
		setCharacters(Array(20).fill({}));
		setLoading(true);
		setLastFocus(-1);

		const { data, results, error, p } = await getCharacters({
			page,
			search,
			status,
			species,
			gender,
		});

		setCharacters(results);
		setInfo(data);
		setPage(p || 1);
		setError(error);
		setLoading(false);
	}, [page, search, status, species, gender]); // eslint-disable-line react-hooks/exhaustive-deps


	React.useEffect(() => {
		initialRequest();
	}, [initialRequest]);

	const getCharacterDimension = async (url: string) => {
		const dimension = await getDimension({ url });
		setCharacter((prevState: any) => ({ ...prevState, dimension }));
	};

	const changeModalCharacter = (e: React.SyntheticEvent<EventTarget>) => {
		if (!(e.target instanceof HTMLButtonElement)) {
			return;
		}
		const { id, image, location, name, originName, originUrl, status, species } = e.target.dataset;
		setLastFocus(Number(id));
		setCharacter({
			id,
			image,
			location,
			name,
			originName,
			status,
			species,
		});
		if (!originUrl) {
			setCharacter((prevState: any) => ({ ...prevState, dimension: originName }));
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
				{error && (
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
				<Modal open={modal} close={() => setModal(false)} character={character} />
			</React.Suspense>
		</main>
	);
};

export default Home;
