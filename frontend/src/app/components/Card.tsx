import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import slugify from 'slugify';
import { Event } from '@/types/event';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/Auth';
import toast from 'react-hot-toast';

interface CardProps {
  event: Event;
}

const Card = ({ event }: CardProps) => {
  const [isHover, setIsHover] = useState(false);
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const { id, name, description } = event;
  const slug =
    slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g }) + `-${id}`;

  const handleCardClick = () => {
    console.log('token', token);

    if (token) {
      router.push(`/event/${slug}`);
      return;
    }
    toast.error('You need to login first');
  };
  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
        <ArrowRightCircleIcon
          className={`w-5 h-5 bg-gray`}
          style={{
            transform: isHover ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.2s ease',
          }}
        />
      </div>
    </div>
  );
};

export default Card;
