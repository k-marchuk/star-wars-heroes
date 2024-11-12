import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import {
  getCharacter,
  getFilmsByCharacterId,
  getPlanetByCharacterId,
  getStarshipsByCharacterId,
} from '@/api';
import { ReactFlow, Node, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '@/components/CustomNode';
import { Edge } from '@/types/Edge';
import { Loader } from '@/components/Loader/Loader';
import {
  createEdges,
  createFilmNodes,
  createStarshipNodes,
  DEFAULT_NODE_WIDTH,
} from '../helpers/graph-nodes';
import { DataType } from '../types/DataType';

const nodeTypes = {
  custom: CustomNode,
};

export const CharacterPage = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const { data: character, isLoading: isLoadingCharacter } = useQuery(
    ['character', characterId],
    () => getCharacter(Number(characterId))
  );

  const { data: films, isLoading: isLoadingFilms } = useQuery(
    ['films', characterId],
    () => getFilmsByCharacterId(Number(characterId))
  );

  const { data: starships, isLoading: isLoadingStarships } = useQuery(
    ['starships', characterId],
    () => getStarshipsByCharacterId(Number(characterId))
  );

  const { data: planet, isLoading: isLoadingPlanet } = useQuery(
    ['planet', characterId],
    () => getPlanetByCharacterId(Number(characterId))
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  if (character && films && starships && !nodes.length) {
    const filmsNodes = createFilmNodes(films);
    const starshipsNodes = createStarshipNodes(starships);

    console.log(planet?.results[0].name);

    setNodes([
      {
        id: `c${character?.id}`,
        type: 'custom',
        data: {
          type: DataType.Character,
          image: `https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`,
          name: character.name,
          gender: character.gender,
          homeland: planet?.results[0].name,
          height: character.height,
          skin_color: character.skin_color,
        },
        position: {
          x: (filmsNodes.length * DEFAULT_NODE_WIDTH) / 2 - 150,
          y: 5,
        },
      },
      ...filmsNodes,
      ...starshipsNodes,
    ]);

    console.log(filmsNodes);

    const edges = createEdges(character, films, starships);

    setEdges(edges);
  }

  return (
    <div data-testid="graph" className="flex gap-4 flex-col md:flex-row">
      <div className="md:w-1/6 w-full pt-20">
        <button
          className="btn bg-yellow rounded-none text-gray-800"
          onClick={handleBackClick}
        >
          Choose another character
        </button>
      </div>
      {isLoadingCharacter ||
      isLoadingFilms ||
      isLoadingStarships ||
      isLoadingPlanet ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div className="md:w-5/6 w-full mt-20">
          <div className="w-full flex-1 graph-flow-height md:h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
            </ReactFlow>
          </div>
        </div>
      )}
    </div>
  );
};
