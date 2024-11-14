import { Character, CharactersData } from '@/types/Character';
import { FilmsData } from '@/types/Film';
import { PlanetsData } from '@/types/Planet';
import { StarshipsData } from '@/types/Starship';

// eslint-disable-next-line operator-linebreak
// The base URL for the Star Wars API, used for all requests.
const API_URL = 'https://sw-api.starnavi.io';

//Fetches a list of characters from the Star Wars API, paginated by page number.
export function getCharacters(page: number): Promise<CharactersData> {
  return fetch(API_URL + `/people/?page=${page}`).then((response) =>
    response.json()
  );
}

//Fetches detailed information about a specific character by their ID.
export function getCharacter(id: number): Promise<Character> {
  return fetch(API_URL + `/people/${id}`).then((response) => response.json());
}

//Fetches the list of films that a specific character has appeared in, using the character's ID.
export function getFilmsByCharacterId(id: number): Promise<FilmsData> {
  return fetch(API_URL + `/films/?characters=${id}`).then((response) =>
    response.json()
  );
}

//Fetches a list of starships piloted by a specific character, using the character's ID.
export function getStarshipsByCharacterId(id: number): Promise<StarshipsData> {
  return fetch(API_URL + `/starships/?pilots=${id}`).then((response) =>
    response.json()
  );
}

//Fetches a planet where a specific character was born, using the character's ID.
export function getPlanetByCharacterId(id: number): Promise<PlanetsData> {
  return fetch(API_URL + `/planets/?residents=${id}`).then((response) =>
    response.json()
  );
}
