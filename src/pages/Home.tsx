import * as React from "react";
import { Controls, Hero, Modal, Pagination } from "components";
import getCharacters from "utils/getCharacters";
import getDimension from "utils/getDimension";
import { Loader } from "assets/icons";
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
	const [page, setPage] = React.useState(1);
	const [search, setSearch] = React.useState("");
	const [status, setStatus] = React.useState("");
	const [species, setSpecies] = React.useState("");
	const [gender, setGender] = React.useState("");

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
		setPage(p);
		setError(error);
		setLoading(false);
	}, [page, search, status, species, gender]);

	React.useEffect(() => {
		initialRequest();
	}, [page, search, status, species, gender, initialRequest]);

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
			/>
			<React.Suspense fallback={<Loader />}>
				{error && (
					<div className={styles.error}>
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
