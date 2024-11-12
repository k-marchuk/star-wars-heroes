import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CharacterPage } from '@/pages/CharacterPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { describe, it, expect } from 'vitest';

describe('CharacterPage component', () => {
  const queryClient = new QueryClient();

  it('should renders character component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CharacterPage />
        </Router>
      </QueryClientProvider>
    );

    const graphComponent = screen.getByTestId('graph');
    expect(graphComponent).toBeTruthy();
  });
});
