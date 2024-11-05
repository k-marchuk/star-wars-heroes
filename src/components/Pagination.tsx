import classNames from 'classnames';
import { generatePagerElements } from '../helpers/pagination';
import { Link, useSearchParams } from 'react-router-dom';
import { CharactersData } from '../types/Character';

type Props = {
  characters: CharactersData;
  currentPage: number;
  pages: number;
};

export const Pagination: React.FC<Props> = ({
  characters,
  currentPage,
  pages,
}) => {
  let [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const updateSearchParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));

    return params.toString();
  };

  return (
    <div className="join py-10 mt-20 md:py-10 flex">
      <Link
        className={classNames({
          'pointer-events-none': !characters.previous,
        })}
        to={{ search: updateSearchParams(page - 1) }}
      >
        <button
          className={classNames('join-item btn md:btn btn-sm', {
            'pointer-events-none': !characters.previous,
          })}
        >
          {'<'}
        </button>
      </Link>
      {generatePagerElements(currentPage, pages).map((paginationPage, i) => (
        <Link
          className={classNames({
            'pointer-events-none':
              paginationPage === page || paginationPage === 0,
          })}
          key={`${paginationPage}${i}`}
          to={{
            search: updateSearchParams(Number(paginationPage)),
          }}
        >
          <button
            className={classNames('join-item btn md:btn btn-sm', {
              'btn-active': paginationPage === Number(currentPage),
              'pointer-events-none': !paginationPage,
            })}
          >
            {paginationPage || '...'}
          </button>
        </Link>
      ))}
      <Link
        className={classNames({
          'pointer-events-none': !characters.next,
        })}
        to={{ search: updateSearchParams(page + 1) }}
      >
        <button
          className={classNames('join-item btn md:btn btn-sm', {
            'pointer-events-none': !characters.next,
          })}
        >
          {'>'}
        </button>
      </Link>
    </div>
  );
};
