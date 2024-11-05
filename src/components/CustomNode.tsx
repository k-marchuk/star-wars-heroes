import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function CustomNode({ data }: { data: { [key: string]: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-yellow">
      <div className="flex">
        <div className="ml-2 flex flex-col">
          <div className="text-lg font-bold self-center">{data.name}</div>
          {data.gender && (
            <div className="text-gray-700">Gender: {data.gender}</div>
          )}
          {data.skin_color && (
            <div className="text-gray-700">Skin-color: {data.skin_color}</div>
          )}
          {data.release_date && (
            <div className="text-gray-700">
              Release date: {data.release_date}
            </div>
          )}
          {data.director && (
            <div className="text-gray-700">Director: {data.director}</div>
          )}
          {data.starship_class && (
            <div className="text-gray-700">
              Starship class: {data.starship_class}
            </div>
          )}
          {data.max_atmosphering_speed && (
            <div className="text-gray-700">
              Max atmosphere speed: {data.max_atmosphering_speed}
            </div>
          )}
          {data.hyperdrive_rating && (
            <div className="text-gray-700">
              Hyperdrive rate: {data.hyperdrive_rating}
            </div>
          )}
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="w-8" />
      <Handle type="source" position={Position.Bottom} className="w-8" />
    </div>
  );
}

export default memo(CustomNode);
