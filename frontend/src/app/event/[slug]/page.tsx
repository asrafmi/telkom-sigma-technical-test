'use client';
import { AuthContext } from '@/context/Auth';
import { Event } from '@/types/event';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { use, useContext, useEffect, useState } from 'react';

const EventDetail = () => {
  const [event, setEvent] = useState<Event>();
  const [tokenLocal, setTokenLocal] = useState<string>();
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const pathName = usePathname();

  let id = pathName?.split('-') as any;
  id = id[id.length - 1];

  useEffect(() => {
    setTokenLocal(token as any);
  }, [token]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/event/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenLocal }),
      });
      const data = await response.json();
      setEvent(data.data);
    }
    fetchData();
  }, [tokenLocal, id]);

  const parseDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {event?.name}
        </h1>
        <p className="text-sm text-gray-900">{event?.description}</p>
        <p className="text-sm text-gray-900">
          <b>Location:</b> {event?.location}
        </p>
        <p className="text-sm text-gray-900">
          <b>Date:</b> {parseDate(event?.date as any)}
        </p>
      </div>
    </main>
  );
};

export default EventDetail;
