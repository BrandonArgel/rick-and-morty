import React, { useState, useEffect, useMemo, Suspense } from "react";
import getCharacters from "../utils/getCharacters.js";

import Characters from "../components/Characters.jsx";
import Hero from "../components/Hero.jsx";
import Loader from '../components/Loader'
import Search from "../components/Search.jsx";
import PageError from "./PageError.jsx";
import ParticlesBackground from "../components/ParticlesBackground.jsx";

export default function MainPage() {
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [end, setEnd] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		getMoreCharacters(page);
	}, [page]);

	const getMoreCharacters = async () => {
		setLoading(true);
		try {
			const response = await getCharacters(page);
			setCharacters(prevCharacters => [...prevCharacters, ...response.results]);
			setEnd(response.info.next === null);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const useSearchCharacters = (characters) => {
		const [query, setQuery] = useState("");
		const [filterCharacters, setFilterCharacters] = useState(characters);

		useMemo(() => {
			setLoading(true);
			if(characters.length > 0) {
				const result = characters.filter((character) => {
					return character.name.toLowerCase().includes(query.toLowerCase())
				});
				setFilterCharacters(result);
			}

			setLoading(false);
		}, [characters, query]);

		return { query, setQuery, filterCharacters };
	}

	const { query, setQuery, filterCharacters } = useSearchCharacters(characters);

	return (
		<Suspense fallback={<Loader />}>
			<ParticlesBackground />
			{error ? <PageError error={error} /> : (
				<>
					<Hero />
					<main className="main__container">
						<Search value={query} setQuery={setQuery} />
						<Characters characters={filterCharacters} setPage={setPage} loading={loading} end={end} />
					</main>
				</>
			)}

		</Suspense>
	);
}