import { useQuery } from 'react-query';
import { CharactersData } from '../types/Character';
import { getCharacters, RESULTS_PER_REQUEST } from '../api';
import { Loader } from './Loader';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from './Pagination';
import { CharacterCard } from './CharacterCard';
import { useEffect } from 'react';

export const CharactersPage = () => {
  let [searchParams] = useSearchParams();
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
    <div className="flex full-height flex-col items-center justify-between">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 gap-y-5 md:gap-6 md:gap-y-10 pt-20">
        {isLoading && <Loader />}
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error.message}
          </p>
        )}
        {characters?.results &&
          characters.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
      {characters?.results && (
        <Pagination characters={characters} currentPage={page} pages={pages} />
      )}
    </div>
  );
};
