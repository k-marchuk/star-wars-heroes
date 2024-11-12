import { render, screen } from '@testing-library/react';
import { CharactersPage } from '@/pages/CharactersPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { describe, it, expect } from 'vitest';
import * as service from '@/api';

describe('CharactersPage component', () => {
  const queryClient = new QueryClient();

  it('should renders characters list', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CharactersPage />
        </Router>
      </QueryClientProvider>
    );

    const charactersList = screen.getByTestId('characters-list');
    expect(charactersList).toBeTruthy();
  });

  it('renders character cards for fetched data', async () => {
    const characters = {
      count: 10,
      results: [
        { id: 1, name: 'Luke Skywalker' },
        { id: 2, name: 'Darth Vader' },
      ],
    };

    const mockFetchCharacters = vi.spyOn(service, 'getCharacters');
    mockFetchCharacters.mockReturnValue(new Promise(() => characters.results));

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CharactersPage />{' '}
        </Router>
      </QueryClientProvider>
    );

    expect(getByTestId('characters-list').children.length).toBe(1);
  });
});
