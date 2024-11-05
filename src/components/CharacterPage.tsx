import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import {
  getCharacter,
  getFilmsByCharacterId,
  getStarshipsByCharacterId,
} from '../api';
import { ReactFlow, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import { Edge } from '../types/Edge';
import { Loader } from './Loader';
import {
  createEdges,
  createFilmNodes,
  createStarshipNodes,
} from '../helpers/graph-nodes';

const nodeTypes = {
  custom: CustomNode,
};

export const CharacterPage = () => {
  const { characterId } = useParams();

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

  if (character && films && starships && !nodes.length) {
    const filmsNodes = createFilmNodes(films);
    const starshipsNodes = createStarshipNodes(starships);

    setNodes([
      {
        id: `c${character?.id}`,
        type: 'custom',
        data: {
          name: character.name,
          gender: character.gender,
          skin_color: character.skin_color,
        },
        position: { x: 250, y: 5 },
      },
      ...filmsNodes,
      ...starshipsNodes,
    ]);

    const edges = createEdges(character, films, starships);

    setEdges(edges);
  }

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="md:w-1/6 w-full pt-20">
        <Link className="btn bg-yellow rounded-none text-gray-800" to="/people">
          Choose another character
        </Link>
      </div>
      {isLoadingCharacter || isLoadingFilms || isLoadingStarships ? (
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
            ></ReactFlow>
          </div>
        </div>
      )}
    </div>
  );
};
