import { describe, it, expect } from 'vitest';
import {
  createFilmNodes,
  createStarshipNodes,
  createEdges,
} from './graph-nodes';
import { Film, FilmsData } from '../types/Film';
import { Starship, StarshipsData } from '../types/Starship';
import { Character, Gender } from '../types/Character';
import { DataType } from '../types/DataType';

describe('createFilmNodes', () => {
  const filmsData: FilmsData = {
    count: 80,
    next: 'string',
    previous: null,
    results: [
      {
        id: 1,
        title: 'A New Hope',
        release_date: '1977-05-25',
        director: 'George Lucas',
      },
      {
        id: 2,
        title: 'The Empire Strikes Back',
        release_date: '1980-05-21',
        director: 'Irvin Kershner',
      },
    ] as Film[],
  };

  it('should create nodes for each film', () => {
    const nodes = createFilmNodes(filmsData);

    expect(nodes).toHaveLength(2);
    expect(nodes[0]).toEqual({
      id: 'f1',
      type: 'custom',
      data: {
        type: DataType.Film,
        name: 'A New Hope',
        emoji_calendar: '🗓️',
        release_date: '1977',
        emoji_director: '🎬',
        director: 'George Lucas',
      },
      position: { x: 100, y: 300 },
    });
    expect(nodes[1].id).toBe('f2');
    expect(nodes[1].data.name).toBe('The Empire Strikes Back');
  });
});

describe('createStarshipNodes', () => {
  const starshipsData: StarshipsData = {
    count: 20,
    next: 'string',
    previous: null,
    results: [
      {
        id: 1,
        name: 'Millennium Falcon',
        starship_class: 'Light Freighter',
        max_atmosphering_speed: '1050',
        hyperdrive_rating: '0.5',
        films: [1, 2],
      },
      {
        id: 2,
        name: 'X-Wing Starfighter',
        starship_class: 'Starfighter',
        max_atmosphering_speed: '1050',
        hyperdrive_rating: '1.0',
        films: [2],
      },
    ] as Starship[],
  };

  it('should create nodes for each starship', () => {
    const nodes = createStarshipNodes(starshipsData);

    expect(nodes).toHaveLength(2);
    expect(nodes[0].id).toBe('s1');
    expect(nodes[0].data.name).toBe('Millennium Falcon');
    expect(nodes[1].data.starship_class).toBe('Starfighter');
    expect(nodes[1].position.x).toBe(400);
  });
});

describe('create Edges', () => {
  const character: Character = {
    id: 1,
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: Gender.Male,
    homeworld: 12,
    films: [1, 2],
    starships: [1, 2],
    created: new Date('1977-12-02'),
    edited: new Date('1977-12-02'),
    species: [1],
    url: 'https://sw-api.starnavi.io/people/1/',
    vehicles: [14],
  };
  const filmsData: FilmsData = {
    count: 80,
    next: 'string',
    previous: null,
    results: [
      {
        id: 1,
        title: 'A New Hope',
        release_date: '1977-05-25',
        director: 'George Lucas',
      },
      {
        id: 2,
        title: 'The Empire Strikes Back',
        release_date: '1980-05-21',
        director: 'Irvin Kershner',
      },
    ] as Film[],
  };
  const starshipsData: StarshipsData = {
    count: 20,
    next: 'string',
    previous: null,
    results: [
      {
        id: 1,
        name: 'Millennium Falcon',
        starship_class: 'Light Freighter',
        max_atmosphering_speed: '1050',
        hyperdrive_rating: '0.5',
        films: [1, 2],
      },
      {
        id: 2,
        name: 'X-Wing Starfighter',
        starship_class: 'Starfighter',
        max_atmosphering_speed: '1050',
        hyperdrive_rating: '1.0',
        films: [2],
      },
    ] as Starship[],
  };

  it('should create edges for character and films', () => {
    const edges = createEdges(character, filmsData, starshipsData);

    expect(edges).toHaveLength(5);
    expect(edges[0]).toEqual({
      id: 'e1-1',
      source: 'c1',
      target: 'f1',
      label: 'featured in',
    });
    expect(edges[1].id).toBe('e1-2');
  });

  it('should create edges for films and starships', () => {
    const edges = createEdges(character, filmsData, starshipsData);

    expect(edges).toHaveLength(5);
    expect(edges[2]).toEqual({
      id: 'e1-1',
      source: 'f1',
      target: 's1',
      label: 'travelled',
    });
    expect(edges[3].source).toBe('f2');
    expect(edges[3].target).toBe('s1');
  });
});
