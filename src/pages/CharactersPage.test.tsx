import { render, screen, waitForElementToBeRemoved, act } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import { Root } from '@/Root';
import * as handlers from '@/api';
import { Gender } from '@/types/Character';

const renderOptions = { initialRoutes: ['/people'] };

describe('CharactersPage component', () => {
  beforeEach(() => {
    const characters = {
      count: 82,
      next: 'https://sw-api.starnavi.io/people/?page=2',
      previous: null,
      results: [
        {
          id: 10,
          name: 'Obi-Wan Kenobi',
          height: '182',
          mass: '77',
          hair_color: 'auburn, white',
          skin_color: 'fair',
          eye_color: 'blue-gray',
          birth_year: '57BBY',
          gender: Gender.Male,
          homeworld: 20,
          films: [1, 2, 3, 4, 5, 6],
          species: [1],
          vehicles: [38],
          starships: [48, 59, 64, 65, 74],
          created: '2014-12-10T16:16:29.192000Z' as unknown as Date,
          edited: '2014-12-20T21:17:50.325000Z' as unknown as Date,
          url: 'https://sw-api.starnavi.io/people/10/',
        },
        {
          id: 12,
          name: 'Wilhuff Tarkin',
          height: '180',
          mass: 'unknown',
          hair_color: 'auburn, grey',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '64BBY',
          gender: Gender.Male,
          homeworld: 21,
          films: [1, 6],
          species: [1],
          vehicles: [],
          starships: [],
          created: '2014-12-10T16:26:56.138000Z' as unknown as Date,
          edited: '2014-12-20T21:17:50.330000Z' as unknown as Date,
          url: 'https://sw-api.starnavi.io/people/12/',
        },
      ],
    };

    vi.spyOn(handlers, 'getCharacters').mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve(characters), 1000))
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should renders characters list', async () => {
    await act(async () => render(<Root />, renderOptions));

    expect(screen.getByTestId('characters-list')).toBeTruthy();
  });

  it('renders character cards for fetched data', async () => {
    await act(async () => render(<Root />, renderOptions));

    await waitForElementToBeRemoved(document.querySelector('span.loading'), {
      timeout: 1000,
    }).then(() => console.log('Loading was finished'));

    expect(screen.getByTestId('characters-list').children.length).toBe(2);
  });
});
