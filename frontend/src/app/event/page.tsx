'use client';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Event } from '@/types/event';

const Event = () => {
  const [event, setEvent] = useState<Event[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/event');
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50">
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : event?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
          {event.map((event) => (
            <Card key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center">No events found.</p>
      )}
    </main>
  );
};

export default Event;
