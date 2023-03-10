import { createContext, useState } from "react";
import { useLocalStorage } from "hooks";

const FiltersContext = createContext({
	page: 1,
	search: "",
	newSearch: "",
	status: "",
	species: "",
	gender: "",
	setPage: (value: number) => {},
	setSearch: (value: string) => {},
	setNewSearch: (value: string) => {},
	setStatus: (value: string) => {},
	setSpecies: (value: string) => {},
	setGender: (value: string) => {},
	resetFilters: () => {},
});

const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
	const [page, setPage] = useLocalStorage("page", 1);
	const [search, setSearch] = useLocalStorage("search", "");
	const [status, setStatus] = useLocalStorage("status", "");
	const [species, setSpecies] = useLocalStorage("species", "");
	const [gender, setGender] = useLocalStorage("gender", "");
	const [newSearch, setNewSearch] = useState(search);

	const resetFilters = () => {
		setPage(1);
		setSearch("");
		setStatus("");
		setSpecies("");
		setGender("");
		setNewSearch("");
	};

	return (
		<FiltersContext.Provider
			value={{
				page,
				search,
				newSearch,
				status,
				species,
				gender,
				setPage,
				setSearch,
				setNewSearch,
				setStatus,
				setSpecies,
				setGender,
				resetFilters,
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
};

export { FiltersContext, FiltersProvider };
