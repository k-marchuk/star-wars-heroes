import { Character, CharactersData } from '@/types/Character';
import { FilmsData } from '@/types/Film';
import { PlanetsData } from '@/types/Planet';
import { StarshipsData } from '@/types/Starship';

// eslint-disable-next-line operator-linebreak
const API_URL = 'https://sw-api.starnavi.io';

export function getCharacters(page: number): Promise<CharactersData> {
  return fetch(API_URL + `/people/?page=${page}`).then((response) =>
    response.json()
  );
}

export function getCharacter(id: number): Promise<Character> {
  return fetch(API_URL + `/people/${id}`).then((response) => response.json());
}

export function getFilmsByCharacterId(id: number): Promise<FilmsData> {
  return fetch(API_URL + `/films/?characters=${id}`).then((response) =>
    response.json()
  );
}

export function getStarshipsByCharacterId(id: number): Promise<StarshipsData> {
  return fetch(API_URL + `/starships/?pilots=${id}`).then((response) =>
    response.json()
  );
}

export function getPlanetByCharacterId(id: number): Promise<PlanetsData> {
  return fetch(API_URL + `/planets/?residents=${id}`).then((response) =>
    response.json()
  );
}
