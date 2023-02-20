
export interface CharacterModel {
  id: number;
  gender: string;
  name: string;
  species: string;
  status: string;
  image: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
    url: string;
  };
  type: string;
  dimension?: string;
  originName?: string;
}
