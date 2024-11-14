import { Character } from '@/types/Character';
import { DataType } from '@/types/DataType';
import { Edge } from '@/types/Edge';
import { Film, FilmsData } from '@/types/Film';
import { Starship, StarshipsData } from '@/types/Starship';

export const DEFAULT_NODE_WIDTH = 300;

/**
 *Creates an array of nodes representing films.
 *
 * @param {FilmsData} films - The list of films to create nodes for.
 * @returns {Array<Object>} - An array of node objects with information about each film.
 */
export const createFilmNodes = (films: FilmsData) => {
  return films.results.map((film, index) => ({
    id: `f${film.id}`,
    type: 'custom',
    data: {
      type: DataType.Film,
      name: film.title,
      emoji_calendar: '🗓️',
      release_date: film.release_date.split('-')[0],
      emoji_director: '🎬',
      director: film.director,
    },
    position: { x: 100 + index * DEFAULT_NODE_WIDTH, y: 300 },
  }));
};

/**
 * Creates an array of nodes representing starships.
 *
 * @param {StarshipsData} starships - The list of starships to create nodes for.
 * @returns  {Array<Object>} - An array of node objects with information about each starship.
 */
export const createStarshipNodes = (starships: StarshipsData) => {
  return starships.results.map((starship, index) => ({
    id: `s${starship.id}`,
    type: 'custom',
    data: {
      type: DataType.Starship,
      name: starship.name,
      starship_class: starship.starship_class,
      max_atmosphering_speed: starship.max_atmosphering_speed,
      hyperdrive_rating: starship.hyperdrive_rating,
    },
    position: { x: 100 + index * DEFAULT_NODE_WIDTH, y: 600 },
  }));
};

/**
 * Creates an array of edges connecting characters to films, and films to starships.
 *
 * @param {Character} character - The character to connect to films and starships.
 * @param {FilmsData} films - The list of films that the character has appeared in.
 * @param {StarshipsData} starships - A list of starships that the hero traveled on and appeared in the movies.
 * @returns {Array<Edge>}
 */
export const createEdges = (
  character: Character,
  films: FilmsData,
  starships: StarshipsData
) => {
  const filmsEdges = films.results.map((film: Film) => ({
    id: `e${character.id}-${film.id}`,
    source: `c${character.id}`,
    target: `f${film.id}`,
    label: 'featured in',
  }));

  const starshipsEdges: Edge[] = [];

  films.results.forEach((film: Film) => {
    (starships.results || []).forEach((starship: Starship) => {
      if (starship.films.includes(film.id)) {
        starshipsEdges.push({
          id: `e${film.id}-${starship.id}`,
          source: `f${film.id}`,
          target: `s${starship.id}`,
          label: 'travelled',
        });
      }
    });
  });

  return [...filmsEdges, ...starshipsEdges];
};
