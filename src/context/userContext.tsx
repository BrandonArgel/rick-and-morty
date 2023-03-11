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
	info: {} as InfoModel,
	error: "",
	loading: false,
	lastFocus: "",
	modal: false,
	setModal: (v: boolean) => {},
	changeModalCharacter: (e: React.SyntheticEvent<EventTarget>) => {},
	suggestions: [] as CharacterSearchModel[],
	suggestionsError: "",
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
	const [lastFocus, setLastFocus] = useState("");
	const [suggestions, setSuggestions] = useState(
		Array(20).fill({ name: "", image: "" }) as CharacterSearchModel[]
	);
	const [suggestionsError, setSuggestionsError] = useState("");
	const [suggestionsLoading, setSuggestionsLoading] = useState(false);
	const [favorites, setFavorites] = useLocalStorage("favorite_characters", []);
	const { page, search, status, species, gender, setPage, newSearch, setNewSearch } =
		useContext(FiltersContext);

	const addFavorite = (character: CharacterModel) => {
		const fav = {
			...character,
			isFavorite: true,
		};
		setFavorites([...favorites, fav]);
		const newCharacters = characters.map((c: CharacterModel) => {
			if (c.id === character.id) {
				c.isFavorite = true;
			}
			return c;
		});
		setCharacters(newCharacters);
	};

	const removeFavorite = (character: CharacterModel) => {
		const newFavorites = favorites.filter((c: CharacterModel) => c.id !== character.id);
		setFavorites(newFavorites);
		const newCharacters = characters.map((c: CharacterModel) => {
			if (c.id === character.id) {
				c.isFavorite = false;
			}
			return c;
		});
		setCharacters(newCharacters);
	};

	const mapWithFavorites = (characters: CharacterModel[]): CharacterModel[] => {
		return characters.map((character: CharacterModel) => {
			const isFavorite = favorites.some((favorite: CharacterModel) => favorite.id === character.id);
			return { ...character, isFavorite };
		});
	};

	const handleGetCharacters = async () => {
		setCharacters(Array(20).fill(baseCharacter as CharacterModel));
		setLoading(true);
		setLastFocus("");

		const { info, results, error, p } = await getCharacters({
			page,
			search,
			status,
			species,
			gender,
		});
		if (results) {
			const mappedFavoriteCharacters = mapWithFavorites(results);
			setSuggestions(results.map((c: CharacterSearchModel) => ({ name: c.name, image: c.image })));

			setCharacters(mappedFavoriteCharacters);
		} else {
			setCharacters([]);
		}
		setError(error);
		setInfo(info);
		setPage(p || 1);
		setLoading(false);
	};

	const initialRequest = useCallback(async () => {
		await handleGetCharacters();
	}, [page, search, status, species, gender]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		initialRequest();
	}, [initialRequest]);

	const handleGetSuggestions = async () => {
		if (!newSearch && !suggestions.length) {
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
		const {
			id,
			image,
			location,
			name,
			originName,
			originUrl,
			status,
			species,
			gender,
			type,
			isFavorite,
			clickedFrom,
		} = e.target.dataset;
		setLastFocus(`${clickedFrom}-${id}`);
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
			isFavorite: isFavorite === "true",
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
				info: info,
				error: error,
				loading: loading,
				lastFocus: lastFocus,
				modal: modal,
				setModal: setModal,
				changeModalCharacter: changeModalCharacter,
				suggestions: suggestions,
				suggestionsError: suggestionsError,
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
