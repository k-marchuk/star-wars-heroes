import { useQuery } from 'react-query';
import { CharactersData } from '@/types/Character';
import { getCharacters } from '@/api';
import { Loader } from '@/components/Loader/Loader';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '@/components/Pagination/Pagination';
import { CharacterCard } from '@/components/CharacterCard/CharacterCard';
import { useEffect } from 'react';

export const RESULTS_PER_REQUEST = 10;

export const CharactersPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const page = Number(searchParams.get('page')) || 1;
  let pages = 0;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const {
    data: characters,
    isLoading,
    error,
  } = useQuery<CharactersData, Error>(
    ['characters', page], //creates a unique key for caching that depends on the page number.
    () => getCharacters(page),
    {
      keepPreviousData: true, //to save previous data while new data is being loaded.
    }
  );

  useEffect(() => {
    scrollToTop();
  }, [location.search]);

  if (characters) {
    pages = Math.ceil(characters.count / RESULTS_PER_REQUEST);
  }

  return (
    <div className="flex h-lvh flex-col items-center justify-around">
      <div
        data-testid="characters-list"
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-5 md:gap-6 md:gap-y-10 pt-20"
      >
        {isLoading && <Loader />}
        {error && <p className="has-text-danger">{error.message}</p>}
        {characters?.results &&
          characters.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
      <Pagination currentPage={page} totalPages={pages} />
    </div>
  );
};
