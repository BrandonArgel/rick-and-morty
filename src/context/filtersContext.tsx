import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "hooks";

type FiltersState = {
	page: number;
	search: string;
	newSearch?: string;
	status: string;
	species: string;
	gender: string;
};

type FilterActions =
	| "INITIALIZE"
	| "SET_PAGE"
	| "SET_SEARCH"
	| "SET_NEW_SEARCH"
	| "SET_STATUS"
	| "SET_SPECIES"
	| "SET_GENDER"
	| "RESET_FILTERS";

interface FiltersAction {
	type: FilterActions;
	payload?: any;
}

const initialState: FiltersState = {
	page: 1,
	search: "",
	newSearch: "",
	status: "",
	species: "",
	gender: "",
};

const filterMethods = {
	setPage: (page: number) => {},
	setSearch: (search: string) => {},
	setNewSearch: (newSearch: string) => {},
	setStatus: (status: string) => {},
	setSpecies: (species: string) => {},
	setGender: (gender: string) => {},
	resetFilters: () => {},
};

const filtersReducer = (state: FiltersState, action: FiltersAction) => {
	const { type, payload } = action;

	switch (type) {
		case "INITIALIZE":
			return { ...state, ...payload };
		case "SET_PAGE":
			return { ...state, page: payload };
		case "SET_SEARCH":
			return { ...state, search: payload };
		case "SET_NEW_SEARCH":
			return { ...state, newSearch: payload };
		case "SET_STATUS":
			return { ...state, status: payload };
		case "SET_SPECIES":
			return { ...state, species: payload };
		case "SET_GENDER":
			return { ...state, gender: payload };
		case "RESET_FILTERS":
			return { ...initialState };
		default:
			return state;
	}
};

const FiltersContext = createContext({
	...initialState,
	...filterMethods,
});

const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(filtersReducer, initialState);
	const [filters, setFilters] = useLocalStorage("filters", {
		page: state.page,
		search: state.search,
		status: state.status,
		species: state.species,
		gender: state.gender,
	});

	const initialize = (filters: FiltersState) => {
		dispatch({ type: "INITIALIZE", payload: { ...filters, newSearch: filters.search } });
	};

	const setPage = (page: number) => {
		dispatch({ type: "SET_PAGE", payload: page });
		setFilters({ ...filters, page });
	};

	const setSearch = (search: string) => {
		dispatch({ type: "SET_SEARCH", payload: search });
		setFilters({ ...filters, search });
	};

	const setNewSearch = (newSearch: string) => {
		dispatch({ type: "SET_NEW_SEARCH", payload: newSearch });
	};

	const setStatus = (status: string) => {
		dispatch({ type: "SET_STATUS", payload: status });
		setFilters({ ...filters, status });
	};

	const setSpecies = (species: string) => {
		dispatch({ type: "SET_SPECIES", payload: species });
		setFilters({ ...filters, species });
	};

	const setGender = (gender: string) => {
		dispatch({ type: "SET_GENDER", payload: gender });
		setFilters({ ...filters, gender });
	};

	const resetFilters = () => {
		dispatch({ type: "RESET_FILTERS" });
		const newFilters = { ...initialState };
		// remove the newSearch property
		delete newFilters.newSearch;
		setFilters(newFilters);
	};

	useEffect(() => {
		initialize(filters);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const value = {
		...state,
		setPage,
		setSearch,
		setNewSearch,
		setStatus,
		setSpecies,
		setGender,
		resetFilters,
	};

	return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

const useFilters = () => {
	const context = useContext(FiltersContext);

	if (context === undefined) {
		throw new Error("useFilters must be used within FiltersContext");
	}

	return context;
};

export { useFilters, FiltersProvider };
