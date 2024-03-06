import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import slugify from 'slugify';
import { Event } from '@/types/post';

interface CardProps {
  event: Event;
  onClick: () => void;
}

const Card = ({ event, onClick }: CardProps) => {
  const { id, name, description } = event;
  const slug =
    slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g }) + `-${id}`;

  return (
    <div
      onClick={(e) => {
        onClick();
      }}
      className="cursor-pointer relative w-full px-6 pt-6 pb-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {name}
      </h5>
      <p className="font-normal text-gray-700 line-clamp-3 pb-1">
        {description}
      </p>
      <div className="absolute bottom-4 left-6 flex flex-row gap-1 items-center">
        <p>View Details...</p>
        <ArrowRightCircleIcon className="w-5 h-5 bg-gray-50 transition ease-in duration-300 hover:translate-x-1" />
      </div>
    </div>
  );
};

export default Card;
