import { render, screen } from '@testing-library/react';
import { CharacterCard } from '@/components/CharacterCard/CharacterCard';
import { Gender } from '@/types/Character';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { describe, it, expect } from 'vitest';

describe('CharacterCard component', () => {
  const mockCharacter = {
    id: 1,
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'Blond',
    skin_color: 'Fair',
    eye_color: 'Blue',
    birth_year: '19 BBY',
    gender: Gender.Male,
    homeworld: 1,
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: new Date('1977-12-02'),
    edited: new Date('1977-12-02'),
    url: 'https://sw-api.starnavi.io/people/1/',
  };

  it('renders character card', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockCharacter.name)).toBeTruthy();
  });

  it('should have character name', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockCharacter.name)).toBeTruthy();
  });

  it('should link to character details page', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    const characterLink = screen.getByRole('link', { name: 'See Character' });
    expect(characterLink).toBeTruthy();

    userEvent.click(characterLink);
  });
});
