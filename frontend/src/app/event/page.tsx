'use client';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Event } from '@/types/event';

const Event = () => {
  const [event, setEvent] = useState<Event[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/event');
      const data = await response.json();

      setEvent(data);
    }
    fetchData();
  }, []);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {event?.map((event) => (
          <Card key={event.id} event={event} onClick={() => openModal(event)} />
        ))}
      </div>
    </main>
  );
};

export default Event;
