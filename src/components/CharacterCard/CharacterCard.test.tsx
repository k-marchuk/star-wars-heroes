import { render, screen } from '@/test-utils';
import { CharacterCard } from '@/components/CharacterCard/CharacterCard';
import { Gender } from '@/types/Character';
import userEvent from '@testing-library/user-event';

import { describe, it, expect } from 'vitest';

describe('CharacterCard component', () => {
  const mockCharacter = {
    id: 1,
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: Gender.Male,
    homeworld: 1,
    films: [1, 2, 3, 6],
    species: [1],
    vehicles: [14, 30],
    starships: [12, 22],
    created: '2014-12-09T13:50:51.644000Z' as unknown as Date,
    edited: '2014-12-20T21:17:56.891000Z' as unknown as Date,
    url: 'https://sw-api.starnavi.io/people/1/',
  };

  it('renders character card', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText(mockCharacter.name)).toBeTruthy();
  });

  it('should have heading with character name', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(
      screen.getByRole('heading', { name: mockCharacter.name })
    ).toBeTruthy();
  });

  it('should link to character details page', () => {
    render(<CharacterCard character={mockCharacter} />);

    const characterLink = screen.getByRole('link', { name: 'See Character' });
    expect(characterLink).toBeTruthy();

    userEvent.click(characterLink);
  });
});
