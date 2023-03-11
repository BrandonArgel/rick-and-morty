import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useFilters } from "context";
import { useLocalStorage } from "hooks";
import { getCharacters, getDimension, getSuggestions } from "utils";
import { CharacterModel, InfoModel } from "models";

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

type UserState = {
	favorites: CharacterModel[];
	characters: CharacterModel[];
	character: CharacterModel;
	info: InfoModel;
	error: string;
	loading: boolean;
	lastFocus: string;
	modal: boolean;
	suggestions: CharacterModel[];
	suggestionsError: string;
	suggestionsLoading: boolean;
};

type UserActions =
	| "INITIALIZE"
	| "SET_FAVORITE"
	| "REMOVE_FAVORITE"
	| "SET_CHARACTER"
	| "SET_CHARACTERS"
	| "SET_INFO"
	| "SET_ERROR"
	| "SET_LOADING"
	| "SET_LAST_FOCUS"
	| "SET_MODAL"
	| "CHANGE_MODAL_CHARACTER"
	| "SET_SUGGESTIONS"
	| "SET_SUGGESTIONS_ERROR"
	| "SET_SUGGESTIONS_LOADING"
	| "HANDLE_GET_SUGGESTIONS";

interface UsersAction {
	type: UserActions;
	payload?: any;
}

const initialState: UserState = {
	favorites: [],
	characters: Array(20)
		.fill(baseCharacter)
		.map((character, i) => ({ ...character, id: i + 1 })),
	character: baseCharacter,
	info: {
		count: 0,
		pages: 0,
		next: "",
		prev: "",
	},
	error: "",
	loading: false,
	lastFocus: "",
	modal: false,
	suggestions: [],
	suggestionsError: "",
	suggestionsLoading: false,
};

const userMethods = {
	setFavorite: (v: CharacterModel) => {},
	removeFavorite: (v: CharacterModel) => {},
	setCharacter: (v: CharacterModel) => {},
	setCharacters: (v: CharacterModel[]) => {},
	setInfo: (v: InfoModel) => {},
	setError: (v: string) => {},
	setLoading: (v: boolean) => {},
	setLastFocus: (v: string) => {},
	setModal: (v: boolean) => {},
	changeModalCharacter: (e: React.SyntheticEvent<EventTarget>) => {},
	handleGetSuggestions: () => {},
	setSuggestions: () => {},
};

const userReducer = (state: UserState, action: UsersAction) => {
	const { type, payload } = action;

	switch (type) {
		case "INITIALIZE":
			return { ...state, ...payload };
		case "SET_FAVORITE":
			return { ...state, favorites: [...state.favorites, payload] };
		case "REMOVE_FAVORITE":
			return {
				...state,
				characters: state.characters.map((v) => {
					if (v.id === payload.id) {
						v.isFavorite = false;
					}
					return v;
				}),
				favorites: state.favorites.filter((v) => v.id !== payload.id),
			};
		case "SET_CHARACTER":
			return { ...state, character: payload };
		case "SET_CHARACTERS":
			return { ...state, characters: payload };
		case "SET_INFO":
			return { ...state, info: payload };
		case "SET_ERROR":
			return { ...state, error: payload };
		case "SET_LOADING":
			return { ...state, loading: payload };
		case "SET_LAST_FOCUS":
			return { ...state, lastFocus: payload };
		case "SET_MODAL":
			return { ...state, modal: payload };
		case "CHANGE_MODAL_CHARACTER":
			return {
				...state,
				character: state.characters.find(
					(v) => v.id === Number((payload as HTMLButtonElement).value)
				),
			};
		case "SET_SUGGESTIONS":
			return { ...state, suggestions: payload };
		case "SET_SUGGESTIONS_ERROR":
			return { ...state, suggestionsError: payload };
		case "SET_SUGGESTIONS_LOADING":
			return { ...state, suggestionsLoading: payload };
		default:
			return state;
	}
};

const UserContext = createContext({ ...initialState, ...userMethods });

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);
	const [favorites, setFavorites] = useLocalStorage("favorite_characters", []);
	const { page, search, status, species, gender, setPage, newSearch } = useFilters();

	const mapWithFavorites = (characters: CharacterModel[]): CharacterModel[] => {
		return characters.map((character: CharacterModel) => {
			const isFavorite = favorites.some((favorite: CharacterModel) => favorite.id === character.id);
			return { ...character, isFavorite };
		});
	};

	const initialize = useCallback(async () => {
		console.log("initialize", { page, search, status, species, gender, setPage, newSearch });
		const initialCharacters = initialState.characters;
		dispatch({
			type: "INITIALIZE",
			payload: {
				characters: initialCharacters,
				favorites,
				loading: true,
				lastFocus: "",
			},
		});

		const {
			info,
			results,
			error,
			page: p,
		} = await getCharacters({
			page,
			search,
			status,
			species,
			gender,
		});
		const mappedFavoriteCharacters = results ? mapWithFavorites(results) : [];
		dispatch({
			type: "INITIALIZE",
			payload: {
				characters: mappedFavoriteCharacters,
				info,
				error,
				loading: false,
				page: p || 1,
				suggestions: mappedFavoriteCharacters,
			},
		});

		setPage(p || 1);
	}, [page, search, status, species, gender]); // eslint-disable-line react-hooks/exhaustive-deps

	const setFavorite = (character: CharacterModel) => {
		dispatch({ type: "SET_FAVORITE", payload: character });
		dispatch({
			type: "SET_CHARACTERS",
			payload: state.characters.map((v: CharacterModel) => {
				if (v.id === character.id) {
					v.isFavorite = true;
				}
				return v;
			}),
		});
		setFavorites([...favorites, character]);
	};

	const removeFavorite = (character: CharacterModel) => {
		dispatch({ type: "REMOVE_FAVORITE", payload: character });
		dispatch({
			type: "SET_CHARACTERS",
			payload: state.characters.map((v: CharacterModel) => {
				if (v.id === character.id) {
					v.isFavorite = false;
				}
				return v;
			}),
		});
		setFavorites(favorites.filter((v: CharacterModel) => v.id !== character.id));
	};

	const setCharacter = (character: CharacterModel) => {
		dispatch({ type: "SET_CHARACTER", payload: character });
	};

	useEffect(() => {
		initialize();
	}, [initialize]);

	const setSuggestionsLoading = (v: boolean) => {
		dispatch({ type: "SET_SUGGESTIONS_LOADING", payload: v });
	};

	const setSuggestionsError = (v: string) => {
		dispatch({ type: "SET_SUGGESTIONS_ERROR", payload: v });
	};

	const handleGetSuggestions = async () => {
		if (!newSearch && !state.suggestions.length) {
			setSuggestionsLoading(false);
			return;
		}
		const { suggestions: s, error: e } = await getSuggestions(newSearch || "");
		dispatch({ type: "SET_SUGGESTIONS", payload: s });
		setSuggestionsError(e);
		setSuggestionsLoading(false);
	};

	const setSuggestions = () => {
		dispatch({ type: "SET_SUGGESTIONS", payload: state.characters });
	};

	const getCharacterDimension = async (url: string) => {
		const dimension = await getDimension({ url });
		dispatch({ type: "SET_CHARACTER", payload: { ...state.character, dimension } });
	};

	useEffect(() => {
		if (state.suggestions.some((s: CharacterModel) => s.name === newSearch)) {
			return;
		}
		dispatch({ type: "SET_SUGGESTIONS_LOADING", payload: true });

		const timeoutId = setTimeout(() => {
			handleGetSuggestions();
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [newSearch]); // eslint-disable-line react-hooks/exhaustive-deps

	const setModal = (modal: boolean) => {
		dispatch({ type: "SET_MODAL", payload: modal });
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
		dispatch({ type: "SET_LAST_FOCUS", payload: `${clickedFrom}-${id}` });
		dispatch({ type: "SET_CHARACTER", payload: c });
		if (!originUrl) {
			dispatch({ type: "SET_CHARACTER", payload: { ...c, dimension: originName } });
		} else {
			getCharacterDimension(originUrl);

			dispatch({ type: "SET_MODAL", payload: true });
		}
	};

	const value = {
		...state,
		setFavorite,
		removeFavorite,
		setCharacter,
		changeModalCharacter,
		setModal,
		setSuggestions,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error("useFilters must be used within FiltersContext");
	}

	return context;
};

export { useUser, UserProvider };
