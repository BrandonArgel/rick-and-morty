const API = 'https://rickandmortyapi.com/api/character/';

interface Props {
  page: number;
  search?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export const getCharacters = async ({ search, page = 1, status, species, gender }: Props): Promise<any> => {
  const query = `page=${page}&name=${search}&status=${status}&species=${species}&gender=${gender}`
  const { info, results, error } = await fetch(`${API}?${query}`).then(res => res.json()).catch((e) => console.error(`Back to page 1: ${e}`))
  if (error && page !== 1) {
    const { info, results, error } = await getCharacters({ page: 1, search, status, species, gender });

    return { data: info, results: results, error: error, page: 1 }
  }
  return { data: info, results: results, error: error, p: page }
}