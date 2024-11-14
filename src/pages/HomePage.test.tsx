import '@testing-library/jest-dom';
import { describe, it } from 'vitest';

import { Root } from '@/Root';
import { render, screen } from '@/test-utils';

describe('HomePage', () => {
  it('renders the HomePage component', () => {
    render(<Root />);

    expect(screen.getByText(/May the Force be with you!/i)).toBeInTheDocument();
  });

  it('renders the Yoda image', () => {
    render(<Root />);

    const yodaImage = screen.getByAltText('Star wars yoda');
    expect(yodaImage).toBeInTheDocument();
  });

  it('should have link to CharactersPage', () => {
    render(<Root />);
    const link = screen.getByRole('link', { name: "Let's go!" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/people');
  });
});
