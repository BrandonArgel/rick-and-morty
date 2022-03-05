const API = `https://rickandmortyapi.com/api/character/`

const getCharacters = async (page) => {
  return await fetch(`${API}?page=${page}`).then(res => res.json());

};

export default getCharacters;