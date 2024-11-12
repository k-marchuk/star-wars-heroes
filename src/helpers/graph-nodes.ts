import { Character } from '@/types/Character';
import { DataType } from '@/types/DataType';
import { Edge } from '@/types/Edge';
import { Film, FilmsData } from '@/types/Film';
import { Starship, StarshipsData } from '@/types/Starship';

export const DEFAULT_NODE_WIDTH = 300;

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
