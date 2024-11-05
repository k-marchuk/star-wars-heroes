export interface CharactersData {
  count: number;
  next: string;
  previous: null;
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: number;
  films: number[];
  species: number[];
  vehicles: number[];
  starships: number[];
  created: Date;
  edited: Date;
  url: string;
}

export enum Gender {
  Hermaphrodite = 'hermaphrodite',
  Male = 'male',
}
