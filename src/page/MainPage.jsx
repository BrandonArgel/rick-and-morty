import React, { Fragment, useState, useEffect, useMemo } from "react";

import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Hero from "../components/Hero.jsx";
import Search from "../components/Search.jsx";
import Characters from "../components/Characters.jsx";

const API = `https://rickandmortyapi.com/api/character/`

function useSearchCharacters(characters) {
	const [query, setQuery] = useState("");
	const [filterCharacters, setFilterCharacters] = useState(characters);

	useMemo(() => {
		const result = characters.filter((character) => {
			return character.name.toLowerCase().includes(query.toLowerCase());
		});

		setFilterCharacters(result);
	}, [characters, query]);

	return { query, setQuery, filterCharacters };
}

export default function MainPage() {
	const [characters, setCharacters] = useState([]);
	let [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [end, setEnd] = useState(false);

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
			console.error(error);
			setLoading(false);
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

		if (scrollTop >= scrollHeight - clientHeight) {
			getCharacters();
		}
	}

	useEffect(() => {
		document.addEventListener("scroll", onScroll)
		getCharacters();
	}, []);

	const { query, setQuery, filterCharacters } = useSearchCharacters(characters);

	const handleSearch = (newQuery) => {
		setQuery(newQuery);
	}

	return (
		<Fragment>
			<ParticlesBackground />
			<Hero />
			<main className="main__container">
				<Search value={query} handleSearch={handleSearch} />
				<Characters characters={filterCharacters} loading={loading} end={end} />
			</main>
		</Fragment>
	);
}
