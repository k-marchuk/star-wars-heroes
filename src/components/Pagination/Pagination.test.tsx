import { render, screen } from '@testing-library/react';
import { Pagination } from '@/components/Pagination/Pagination';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('Pagination component', () => {
  const currentPage = 2;
  const pages = 5;

  it('renders Pagination component', () => {
    render(
      <Router>
        <Pagination currentPage={currentPage} totalPages={pages} />
      </Router>
    );

    expect(screen.getByTestId('pagination-component')).toBeTruthy();
  });
});
