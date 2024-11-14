import { render, screen } from '@/test-utils';
import { Pagination } from '@/components/Pagination/Pagination';
import { describe, it, expect } from 'vitest';

describe('Pagination component', () => {
  const currentPage = 2;
  const pages = 5;

  it('renders Pagination component', () => {
    render(<Pagination currentPage={currentPage} totalPages={pages} />);

    expect(screen.getByTestId('pagination-component')).toBeTruthy();
  });
});
