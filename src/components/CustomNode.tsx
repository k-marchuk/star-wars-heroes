import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import classNames from 'classnames';
import { DataType } from '@/types/DataType';

function CustomNode({ data }: { data: { [key: string]: string } }) {
  return (
    <div
      className={classNames(
        'px-4 py-2 shadow-md rounded-md border-2 border-yellow',
        {
          'bg-white': data.type === DataType.Character,
          'bg-amber': data.type === DataType.Film,
          'bg-blue': data.type === DataType.Starship,
        }
      )}
    >
      <div className="flex place-items-center">
        {data.image && data.type === DataType.Character && (
          <img
            src={data.image}
            alt={data.name}
            className="w-20 h-20 rounded-md object-cover mr-4"
          />
        )}
        <div className="ml-2 flex flex-col">
          <div className="text-lg font-bold self-center">{data.name}</div>
          {data.gender && (
            <div className="text-gray-700">Gender: {data.gender}</div>
          )}
          {data.homeland && (
            <div className="text-gray-700">Homeland: {data.homeland}</div>
          )}
          {data.height && (
            <div className="text-gray-700">Height: {data.height}</div>
          )}
          {data.skin_color && (
            <div className="text-gray-700">Skin-color: {data.skin_color}</div>
          )}
          {data.release_date && (
            <div className="flex place-items-center">
              <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                {data.emoji_calendar}
              </div>
              <div className="text-gray-700">
                Release date: {data.release_date}
              </div>
            </div>
          )}
          {data.director && (
            <div className="flex place-items-center">
              <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                {data.emoji_director}
              </div>
              <div className="text-gray-700">Director: {data.director}</div>
            </div>
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
