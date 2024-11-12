import { Loader } from '@/components/Loader/Loader';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Loader component', () => {
  it('should be in the document', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');

    expect(loader).toBeTruthy();
  });
});
