import React, { Fragment, useState, useEffect, useMemo } from "react";

import ParticlesBackground from "../components/ParticlesBackground.jsx";
import PageError from "./PageError.jsx";
import Hero from "../components/Hero.jsx";
import Search from "../components/Search.jsx";
import Characters from "../components/Characters.jsx";

const API = `https://rickandmortyapi.com/api/character/`

export default function MainPage() {
	const [characters, setCharacters] = useState([]);
	let [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [end, setEnd] = useState(false);
	const [error, setError] = useState(false);

	const useSearchCharacters = (characters) => {
		const [query, setQuery] = useState("");
		const [filterCharacters, setFilterCharacters] = useState(characters);
		const [results, setResults] = useState(true);

		useMemo(() => {
			setLoading(true);
			const result = characters.filter((character, index) => {
				// This is a filter that will match any character that contains the query and the index will return only the first match, so there is no more repeated characters
				return character.name.toLowerCase().includes(query.toLowerCase()) && characters.indexOf(character) === index;
			});
			if (result.length > 0) {
				setResults(true);
			} else {
				setResults(false);
			}

			setLoading(false);
			setFilterCharacters(result);
		}, [characters, query]);

		return { query, setQuery, filterCharacters, results };
	}

	// Function to get the characters
	const getCharacters = async () => {
		setLoading(true);
		try {
			const response = await fetchCharacters(page);
			setPage(page++);
			if (response.info.next === null) {
				setCharacters(prevCharacters => [...prevCharacters, ...response.results]);
				setEnd(true);
				document.removeEventListener("scroll", onScroll)
			} else if (!end) {
				setCharacters(prevCharacters => [...prevCharacters, ...response.results]);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	// Function to get the characters
	const fetchCharacters = async newPage => (await fetch(`${API}?page=${newPage}`)).json()

	const onScroll = () => {
		const scrollTop = parseInt(document.documentElement.scrollTop)
		const scrollHeight = parseInt(document.documentElement.scrollHeight)
		const clientHeight = parseInt(document.documentElement.clientHeight)
		// console.log(scrollTop + clientHeight, scrollHeight);
		// It Works!

		if (scrollTop >= scrollHeight - clientHeight - 50) {
			getCharacters();
		}
	}

	useEffect(() => {
		document.addEventListener("scroll", onScroll)
		getCharacters();
	}, []);

	const { query, setQuery, filterCharacters, results } = useSearchCharacters(characters);

	const handleSearch = (newQuery) => {
		setQuery(newQuery);
	}

	return (
		<Fragment>
			<ParticlesBackground />
			{error ? <PageError error={error} /> : (
				<Fragment>
					<Hero />
					<main className="main__container">
						<Search value={query} handleSearch={handleSearch} />
						<Characters characters={filterCharacters} loading={loading} results={results} end={end} />
					</main>
				</Fragment>
			)}

		</Fragment>
	);
}
