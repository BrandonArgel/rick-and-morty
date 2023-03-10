import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { FiltersContext } from "context";
import { useLocalStorage } from "hooks";
import { getCharacters, getDimension, getSuggestions } from "utils";
import { CharacterModel, CharacterSearchModel, InfoModel } from "models";

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

const UserContext = createContext({
	favorites: [] as CharacterModel[],
	setFavorite: (v: CharacterModel) => {},
	removeFavorite: (v: CharacterModel) => {},
	character: baseCharacter as CharacterModel,
	setCharacter: (v: CharacterModel) => {},
	characters: [] as CharacterModel[],
	setCharacters: (v: CharacterModel[]) => {},
	info: {} as InfoModel,
	error: "",
	loading: false,
	lastFocus: -1,
	setLastFocus: (v: number) => {},
	modal: false,
	setModal: (v: boolean) => {},
	changeModalCharacter: (e: React.SyntheticEvent<EventTarget>) => {},
	suggestions: [] as CharacterSearchModel[],
	setSuggestions: (v: CharacterSearchModel[]) => {},
	suggestionsError: "",
	setSuggestionsError: (v: string) => {},
	suggestionsLoading: false,
	setSuggestionsLoading: (v: boolean) => {},
	handleGetSuggestions: () => {},
	newSearch: "",
	setNewSearch: (v: string) => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [characters, setCharacters] = useState(Array(20).fill(baseCharacter as CharacterModel));
	const [character, setCharacter] = useState(baseCharacter as CharacterModel);
	const [info, setInfo] = useState({} as InfoModel);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [lastFocus, setLastFocus] = useState(0);
	const [suggestions, setSuggestions] = useState(
		Array(20).fill({ name: "", image: "" }) as CharacterSearchModel[]
	);
	const [suggestionsError, setSuggestionsError] = useState("");
	const [suggestionsLoading, setSuggestionsLoading] = useState(false);
	const [favorites, setFavorites] = useLocalStorage("favorite_characters", []);
	const { page, search, status, species, gender, setPage, newSearch, setNewSearch } = useContext(FiltersContext);

	const addFavorite = (character: CharacterModel) => {
		setFavorites([...favorites, character]);
	};

	const removeFavorite = (character: CharacterModel) => {
		setFavorites(favorites.filter((favorite: CharacterModel) => favorite.id !== character.id));
	};

	const handleGetCharacters = async () => {
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

		setSuggestions(results.map((c: CharacterSearchModel) => ({ name: c.name, image: c.image })));

		setCharacters(results);
		setInfo(info);
		setPage(p || 1);
		setError(error);
		setLoading(false);
	};

	const initialRequest = useCallback(async () => {
		await handleGetCharacters();
	}, [page, search, status, species, gender]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		initialRequest();
	}, [initialRequest]);

	const handleGetSuggestions = async () => {
		if (!search && !suggestions.length) {
			return;
		}
		const { suggestions: s, error: e } = await getSuggestions(newSearch);
		setSuggestions(s);
		setSuggestionsError(e);
		setSuggestionsLoading(false);
	};

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

	return (
		<UserContext.Provider
			value={{
				favorites: favorites,
				setFavorite: addFavorite,
				removeFavorite: removeFavorite,
				character: character,
				setCharacter: setCharacter,
				characters: characters,
				setCharacters: setCharacters,
				info: info,
				error: error,
				loading: loading,
				lastFocus: lastFocus,
				setLastFocus: setLastFocus,
				modal: modal,
				setModal: setModal,
				changeModalCharacter: changeModalCharacter,
				suggestions: suggestions,
				setSuggestions: setSuggestions,
				suggestionsError: suggestionsError,
				setSuggestionsError: setSuggestionsError,
				suggestionsLoading: suggestionsLoading,
				setSuggestionsLoading: setSuggestionsLoading,
				handleGetSuggestions: handleGetSuggestions,
				newSearch: newSearch,
				setNewSearch: setNewSearch,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
