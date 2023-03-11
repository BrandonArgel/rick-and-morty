import * as React from "react";
import { useUser } from "context";
import { Controls, Favorites, Footer, Hero, Modal, Pagination, Loader } from "components";
import imgError from "assets/images/error.jpg";
import styles from "./Home.module.scss";

const Characters = React.lazy(() => import("components/Characters"));
const Particles = React.lazy(() => import("components/Particles"));

const Home = () => {
	const { error, loading } = useUser();

	return (
		<main>
			<Hero />
			<Controls />
			<Favorites />
			<React.Suspense fallback={<Loader />}>
				{!loading && error && (
					<div className={styles.error}>
						<img src={imgError} alt="Error" />
						<p aria-live="assertive">{error}</p>
					</div>
				)}
				<Particles />
				<Characters />
				<Pagination />
				<Footer />
				<Modal />
			</React.Suspense>
		</main>
	);
};

export default Home;
