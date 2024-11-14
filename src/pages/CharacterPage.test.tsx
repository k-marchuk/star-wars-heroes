import { Root } from '@/Root';
import { render, screen, waitForElementToBeRemoved, act } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import * as handlers from '@/api';
import { Gender } from '@/types/Character';
import { mockReactFlow } from '@/mock-react-flow';

const renderOptions = { initialRoutes: ['/people/21'] };

describe('CharacterPage component', () => {
  const character = {
    id: 21,
    name: 'Palpatine',
    height: '170',
    mass: '75',
    hair_color: 'grey',
    skin_color: 'pale',
    eye_color: 'yellow',
    birth_year: '82BBY',
    gender: Gender.Male,
    homeworld: 8,
    films: [2, 3, 4, 5, 6],
    species: [1],
    vehicles: [],
    starships: [],
    created: '2014-12-15T12:48:05.971000Z' as unknown as Date,
    edited: '2014-12-20T21:17:50.347000Z' as unknown as Date,
    url: 'https://sw-api.starnavi.io/people/21/',
  };

  const film = {
    count: 5,
    next: null,
    previous: null,
    results: [
      {
        id: 2,
        title: 'The Empire Strikes Back',
        episode_id: 5,
        opening_crawl:
          'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
        director: 'Irvin Kershner',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1980-05-17',
        characters: [10, 13, 14, 18, 20, 21, 22, 23, 24, 25, 26, 1, 2, 3, 4, 5],
        planets: [4, 5, 6, 27],
        starships: [3, 10, 11, 12, 15, 17, 21, 22, 23],
        vehicles: [8, 14, 16, 18, 19, 20],
        species: [1, 2, 3, 6, 7],
        created: '2014-12-12T11:26:24.656000Z' as unknown as Date,
        edited: '2014-12-15T13:07:53.386000Z' as unknown as Date,
        url: 'https://sw-api.starnavi.io/films/2/',
      },
    ],
  };

  beforeEach(() => {
    mockReactFlow();

    vi.spyOn(handlers, 'getCharacter').mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve(character), 1000))
    );

    vi.spyOn(handlers, 'getFilmsByCharacterId').mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve(film), 1000))
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should renders character component', async () => {
    await act(async () => render(<Root />, { initialRoutes: ['/people/21'] }));

    const graphComponent = screen.getByTestId('graph');
    expect(graphComponent).toBeTruthy();
  });

  it('renders character and film nodes for fetched data', async () => {
    await act(async () => render(<Root />, renderOptions));

    await waitForElementToBeRemoved(document.querySelector('span.loading'), {
      timeout: 1000,
    }).then(() => console.log('Loading was finished'));

    const characterNode = screen.getByTestId('rf__node-c21');
    expect(characterNode.textContent).toMatch(character.name);

    const filmNode = screen.getByTestId('rf__node-f2');
    expect(filmNode.textContent).toMatch(film.results[0].title);
  });
});
