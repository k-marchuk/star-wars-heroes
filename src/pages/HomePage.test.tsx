import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from '@/pages/HomePage';
import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage', () => {
  it('renders the HomePage component', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/May the Force be with you!/i)).toBeInTheDocument();
    screen.debug();
  });

  it('renders the Yoda image', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const yodaImage = screen.getByAltText('Star wars yoda');
    expect(yodaImage).toBeInTheDocument();
  });

  it('should have link to CharactersPage', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: "Let's go!" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/people');
  });
});
