import { Link } from 'react-router-dom';
import { Character } from '@/types/Character';

type Props = {
  character: Character;
};

export const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <div
      role="article"
      aria-label="character-card"
      key={character.id}
      className="card hover:scale-125 transition duration-700 ease-in-out rounded-none bg-yellow-200/75 shadow-xl w-50 h-80 md:w-60 md:h-100"
    >
      <figure className="px-8 pt-8">
        <Link to={`${character.id}`}>
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
            alt={character.name}
            className="hover:scale-100 rounded-none"
          />
        </Link>
      </figure>
      <div className="card-body flex justify-between items-center text-center p-4 md:p-5">
        <h2 className="card-title text-yellow">{character.name}</h2>
        <div className="card-actions">
          <Link
            to={`${character.id}`}
            className="btn bg-yellow rounded-none text-gray-800"
          >
            See Character
          </Link>
        </div>
      </div>
    </div>
  );
};
