import { CharacterModel, InfoModel } from "models";

const API = 'https://rickandmortyapi.com/api/character';

interface Props {
  page: number;
  search?: string;
  status?: string;
  species?: string;
  gender?: string;
}

interface getCharactersInterface {
  info: InfoModel;
  results: CharacterModel[];
  error: string;
  page: number;
}

export const getCharacters = async ({ search, page = 1, status, species, gender }: Props): Promise<getCharactersInterface> => {
  const query = `page=${page}&name=${search}&status=${status}&species=${species}&gender=${gender}`
  const { info, results, error } = await fetch(`${API}?${query}`).then(res => res.json()).catch((e) => console.error(`Back to page 1: ${e}`))
  return { info: info, results: results, error: error, page: error ? 1 : page }
}

interface getSuggestionsInterface {
  suggestions: CharacterModel[];
  error: string;
}

export const getSuggestions = async (search: string): Promise<getSuggestionsInterface> => {
  const { results, error } = await fetch(`${API}?name=${search}`).then(res => res.json().catch((e) => console.error(`Error: ${e}`)))

  return { suggestions: results ? results : [], error }
}
