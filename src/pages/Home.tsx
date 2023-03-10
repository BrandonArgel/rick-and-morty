import * as React from "react";
import { UserContext, FiltersContext } from "context";
import { Controls, Footer, Hero, Modal, Pagination, Loader } from "components";
import imgError from "assets/images/error.jpg";
import styles from "./Home.module.scss";

const Characters = React.lazy(() => import("components/Characters"));
const Particles = React.lazy(() => import("components/Particles"));

const Home = () => {
	const {
		character,
		characters,
		info,
		error,
		loading,
		lastFocus,
		modal,
		setModal,
		changeModalCharacter,
	} = React.useContext(UserContext);
	const { page, setPage } = React.useContext(FiltersContext);

	return (
		<main>
			<Hero />
			<Controls />
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
