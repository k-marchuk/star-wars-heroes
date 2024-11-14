import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  currentPage: number;
  totalPages: number;
};

export const Pagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  // Get the current URL query parameters.
  const [searchParams] = useSearchParams();

  // Get the page number from the URL query parameters.
  const page = Number(searchParams.get('page')) || 1;
  const pageNumbers = [];

  // Function to update the search parameters when a page link is clicked.
  const updateSearchParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));

    return params.toString();
  };

  for (let paginationPage = 1; paginationPage <= totalPages; paginationPage++) {
    pageNumbers.push(
      <Link
        className={classNames({
          'pointer-events-none':
            paginationPage === page || paginationPage === 0,
        })}
        key={`${paginationPage}`}
        to={{
          search: updateSearchParams(Number(paginationPage)),
        }}
      >
        <button
          className={classNames('join-item btn md:btn btn-sm pagination-btn', {
            'md:btn-active': paginationPage === Number(currentPage),
            'btn-active': paginationPage === Number(currentPage),
            'pointer-events-none': !paginationPage,
          })}
        >
          {paginationPage || '...'}
        </button>
      </Link>
    );
  }

  return (
    <div data-testid="pagination-component" className="join py-10 flex">
      {pageNumbers}
    </div>
  );
};
